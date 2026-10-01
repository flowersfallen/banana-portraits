const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME;
const publicDomain = process.env.R2_PUBLIC_DOMAIN;

function getS3Client() {
  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error(
      'Missing Cloudflare R2 credentials. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET_NAME in .env.local or environment variables.'
    );
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

async function uploadFileToR2(filePath, customKey) {
  const s3 = getS3Client();
  const fileContent = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase() || '.png';
  const fileName = customKey || `characters/${Date.now()}-${path.basename(filePath)}`;
  
  let contentType = 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
  else if (ext === '.webp') contentType = 'image/webp';
  else if (ext === '.gif') contentType = 'image/gif';

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
    ContentType: contentType,
  });

  await s3.send(command);

  const domain = (publicDomain || '').replace(/\/+$/, '');
  const publicUrl = domain ? `${domain}/${fileName}` : `https://${bucketName}.${accountId}.r2.cloudflarestorage.com/${fileName}`;
  return { key: fileName, url: publicUrl };
}

module.exports = { uploadFileToR2 };

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node scripts/upload-r2.js <image-path> [optional-r2-key]');
    process.exit(1);
  }

  const filePath = path.resolve(args[0]);
  const customKey = args[1];

  uploadFileToR2(filePath, customKey)
    .then((result) => {
      console.log('Upload success:');
      console.log('Key:', result.key);
      console.log('Public URL:', result.url);
    })
    .catch((err) => {
      console.error('Upload failed:', err.message);
      process.exit(1);
    });
}

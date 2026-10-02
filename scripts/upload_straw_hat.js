const { uploadFileToR2 } = require('./upload-r2');
const path = require('path');
const https = require('https');

const dir = 'C:/Users/wangyun/Downloads/111';
const files = [
  'Person_taking_selfie_in_shop_2K_20261002144611.jpg',
  'Person_taking_selfie_in_shop_2K_20261002144636.jpg',
  'Person_taking_selfie_in_shop_2K_20261002145344.jpg',
  'Person_taking_selfie_with_hat_2K_20261002144653.jpg'
];

console.log('Files to upload in order:', files);

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => {
      resolve(e.message);
    });
  });
}

async function run() {
  const uploadedUrls = [];
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dir, files[i]);
    const num = String(i + 1).padStart(2, '0');
    const r2Key = `characters/straw-hat-shop-selfie-${num}.jpg`;
    console.log(`Uploading ${files[i]} -> ${r2Key}...`);
    const res = await uploadFileToR2(filePath, r2Key);
    console.log(`Uploaded to: ${res.url}`);
    uploadedUrls.push(res.url);

    // Verify accessibility
    const status = await checkUrl(res.url);
    console.log(`CDN Check [${res.url}]: HTTP ${status}`);
  }

  console.log('\nAll done! Uploaded URLs:');
  console.log(JSON.stringify(uploadedUrls, null, 2));
}

run().catch(console.error);

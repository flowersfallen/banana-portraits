const { uploadFileToR2 } = require('./upload-r2');
const path = require('path');
const https = require('https');

const dir = 'C:/Users/wangyun/Downloads/111';
const files = [
  'Woman_sitting_on_coin_ride_2K_20261002014412.jpg',
  'Woman_sitting_on_ride_2K_20261002014409.jpg',
  'Woman_sitting_on_unicorn_ride_2K_20261002014417.jpg',
  'Woman_sitting_on_ride_2K_20261002014408.jpg'
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
    const r2Key = `characters/goth-unicorn-ride-${num}.jpg`;
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

const { uploadFileToR2 } = require('./upload-r2');
const path = require('path');
const fs = require('fs');

/**
 * Reusable Add-Case automation script
 * Usage:
 *   1. Write input to scripts/case_input.json
 *   2. Run: node scripts/add-case.js
 */

async function main() {
  const inputPath = path.resolve(__dirname, 'case_input.json');
  if (!fs.existsSync(inputPath)) {
    console.error('Error: scripts/case_input.json not found.');
    console.log('Please create scripts/case_input.json with fields: id, title, dir, prompt, tags, dimensions, flow_tip, aspect_ratio');
    process.exit(1);
  }

  const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const {
    id,
    title,
    dir = 'C:/Users/wangyun/Downloads/111',
    prompt,
    tags = [],
    dimensions = {},
    flow_tip = '',
    aspect_ratio = '9:16',
    source_model = 'Nano Banana Pro',
    target_model = 'Nano Banana Pro',
    source_url = 'https://banana.iceotter.com/'
  } = input;

  if (!id || !title || !prompt) {
    console.error('Error: Missing required fields (id, title, prompt) in case_input.json');
    process.exit(1);
  }

  if (!fs.existsSync(dir)) {
    console.error(`Error: Directory not found: ${dir}`);
    process.exit(1);
  }

  // 1. Scan images
  const allFiles = fs.readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort();

  if (allFiles.length === 0) {
    console.error(`Error: No images found in ${dir}`);
    process.exit(1);
  }

  const files = allFiles.slice(0, 4);
  console.log(`Found ${files.length} images to upload:`, files);

  // 2. Upload to Cloudflare R2 (NEVER ping CDN before upload!)
  const uploadedUrls = [];
  const keyPrefix = id.replace(/-portrait$/, '');

  for (let i = 0; i < files.length; i++) {
    const num = String(i + 1).padStart(2, '0');
    const ext = path.extname(files[i]).toLowerCase() || '.jpg';
    const r2Key = `characters/${keyPrefix}-${num}${ext}`;
    const filePath = path.join(dir, files[i]);

    console.log(`[${i + 1}/${files.length}] Uploading ${files[i]} -> ${r2Key}...`);
    const res = await uploadFileToR2(filePath, r2Key);
    uploadedUrls.push(res.url);
    console.log(`  Uploaded: ${res.url}`);
  }

  // 3. Update characters.json
  const jsonPath = path.resolve(__dirname, '../src/data/characters.json');
  const chars = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const promptString = typeof prompt === 'string' ? prompt : JSON.stringify(prompt, null, 2);

  const characterItem = {
    id,
    title,
    aspect_ratio,
    source_model,
    target_model,
    source_url,
    preview_image: uploadedUrls[0],
    verified_image: uploadedUrls[0],
    dimensions,
    tags,
    prompt: promptString,
    flow_usage_tip: flow_tip,
    gallery_images: uploadedUrls
  };

  const existingIdx = chars.findIndex(c => c.id === id);
  if (existingIdx >= 0) {
    chars[existingIdx] = characterItem;
    console.log(`Updated existing case "${id}" at position ${existingIdx + 1}`);
  } else {
    chars.push(characterItem);
    console.log(`Appended new case "${id}" (Total: ${chars.length})`);
  }

  fs.writeFileSync(jsonPath, JSON.stringify(chars, null, 2) + '\n', 'utf8');

  // 4. Update README.md count badges
  const readmePath = path.resolve(__dirname, '../README.md');
  if (fs.existsSync(readmePath)) {
    const count = chars.length;
    let readme = fs.readFileSync(readmePath, 'utf8');
    readme = readme.replace(/Cases-\d+-/g, `Cases-${count}-`);
    readme = readme.replace(/\d+ 组/g, `${count} 组`);
    fs.writeFileSync(readmePath, readme, 'utf8');
    console.log(`Updated README.md to ${count} cases!`);
  }

  console.log('\nCase addition completed successfully in one shot!');
}

main().catch(err => {
  console.error('Fatal error adding case:', err);
  process.exit(1);
});

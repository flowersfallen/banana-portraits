const fs = require('fs');
const filePath = 'd:/website1/src/data/characters.json';
const chars = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const id = 'straw-hat-shop-selfie-portrait';

// Check if already added
if (chars.some(c => c.id === id)) {
  console.log('Character already exists in characters.json');
  process.exit(0);
}

const promptText = `A woman with wavy brown hair and a wide-brimmed straw hat takes a selfie in a hat shop, holding her phone with a spotted case while making a subtle pout. Documentary Style, Human Portrait, Close Up, Natural Light.`;

const newCharacter = {
  id: id,
  title: 'Woman in Straw Hat Takes Selfie Inside a Hat Shop',
  category: 'character',
  status: 'verified',
  source_model: 'GPT Image 2',
  target_model: 'Nano Banana Pro',
  aspect_ratio: '9:16',
  author: '@DaniaSafvi',
  source_url: 'https://x.com/DaniaSafvi/status/2104449544046133546',
  preview_image: 'https://img.iceotter.com/characters/straw-hat-shop-selfie-01.jpg',
  verified_image: 'https://img.iceotter.com/characters/straw-hat-shop-selfie-01.jpg',
  dimensions: {
    country: '欧美',
    gender: '女性',
    scene: '帽子精品店',
    outfit: '鼠尾草绿休闲短袖与宽檐草帽'
  },
  tags: [
    '草帽专卖店',
    '镜面自拍',
    '宽檐草帽',
    '鼠尾草绿',
    '波点手机壳',
    '自然光人像'
  ],
  prompt: promptText,
  flow_usage_tip: '在 Google Flow 中使用 Nano Banana Pro 生成后，点击右上角【设为角色】锁定资产，在后续分镜中可保持棕色波浪卷发、鼠尾草绿休闲短袖穿搭、带皮质系带的宽檐草帽与帽子店镜面自拍构图的一致性。',
  gallery_images: [
    'https://img.iceotter.com/characters/straw-hat-shop-selfie-01.jpg',
    'https://img.iceotter.com/characters/straw-hat-shop-selfie-02.jpg',
    'https://img.iceotter.com/characters/straw-hat-shop-selfie-03.jpg',
    'https://img.iceotter.com/characters/straw-hat-shop-selfie-04.jpg'
  ]
};

chars.push(newCharacter);
fs.writeFileSync(filePath, JSON.stringify(chars, null, 2), 'utf8');
console.log('Successfully updated characters.json! Total characters now:', chars.length);

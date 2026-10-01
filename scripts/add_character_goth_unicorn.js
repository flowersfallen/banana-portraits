const fs = require('fs');
const filePath = 'd:/website1/src/data/characters.json';
const chars = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const id = 'goth-unicorn-coin-ride-portrait';

// Check if already added
if (chars.some(c => c.id === id)) {
  console.log('Character already exists in characters.json');
  process.exit(0);
}

const promptText = `A candid, realistic photograph of a young goth woman with pale skin, long straight black hair with bangs, heavy black eyeliner, and black lipstick. She has a deadpan expression, looking directly at the camera while sitting on a children's coin-operated unicorn ride. She is wearing a black lace-trimmed tank top, black arm warmers, layered necklaces including a choker, black lace tights, and chunky black platform boots with buckles. A large black shoulder bag hangs from her arm. The ride is a white unicorn with a pink mane, gold horn, and purple hooves, mounted on a purple base with a small sticker reading "50¢ PER RIDE". The setting is outside a store with a tan cinderblock wall. To the left is a glass door reflecting a person, a brown trash can, and a white sign with red text reading "NO PARKING FIRE LANE". To the right is a blue vending machine. Overcast, natural daylight.`;

const newCharacter = {
  id: id,
  title: '写实摄影：哥特少女与独角兽摇摇车',
  category: 'character',
  status: 'verified',
  source_model: 'GPT Image 2',
  target_model: 'Nano Banana Pro',
  aspect_ratio: '9:16',
  author: '@danieldmai (via freestylefly/awesome-gpt-image-2)',
  source_url: 'https://x.com/danieldmai',
  github_url: 'https://github.com/freestylefly/awesome-gpt-image-2/blob/main/docs/gallery-part-1.md#case-56',
  preview_image: 'https://img.iceotter.com/characters/goth-unicorn-ride-01.jpg',
  verified_image: 'https://img.iceotter.com/characters/goth-unicorn-ride-01.jpg',
  dimensions: {
    country: '欧美',
    gender: '女性',
    scene: '超市外墙 / 街头',
    outfit: '哥特风吊带背心与网袜'
  },
  tags: [
    '写实摄影',
    '哥特少女',
    '独角兽摇摇车',
    '反差美学',
    '阴天自然光',
    '厚底马丁靴'
  ],
  prompt: promptText,
  flow_usage_tip: '在 Google Flow 中使用 Nano Banana 生成后，点击右上角【设为角色】锁定资产，在后续分镜中可保持黑发齐刘海、暗黑哥特风妆造、冷漠神情与极具视觉反差的儿童独角兽摇摇车拍摄场景的一致性。',
  gallery_images: [
    'https://img.iceotter.com/characters/goth-unicorn-ride-01.jpg',
    'https://img.iceotter.com/characters/goth-unicorn-ride-02.jpg',
    'https://img.iceotter.com/characters/goth-unicorn-ride-03.jpg',
    'https://img.iceotter.com/characters/goth-unicorn-ride-04.jpg'
  ]
};

chars.push(newCharacter);
fs.writeFileSync(filePath, JSON.stringify(chars, null, 2), 'utf8');
console.log('Successfully updated characters.json! Total characters now:', chars.length);

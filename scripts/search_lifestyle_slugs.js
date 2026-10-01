const fs = require('fs');

const content = fs.readFileSync('C:/Users/wangyun/.gemini/antigravity/brain/86388622-aced-4b44-96c8-28eabd9590e4/scratch/awesome_prompts_utf8.md', 'utf8');

const regex = /https:\/\/awesomeprompts\.xyz\/prompt\/portraits\/([a-zA-Z0-9_-]+)/g;
let m;
const slugs = [];
while ((m = regex.exec(content)) !== null) {
  slugs.push(m[1]);
}

const keywords = ['coffee', 'cafe', 'night', 'subway', 'train', 'snow', 'rain', 'street', 'winter', 'autumn', 'spring', 'summer', 'sunset', 'morning'];

const filtered = slugs.filter(s => keywords.some(k => s.toLowerCase().includes(k)));
console.log('Filtered slugs count:', filtered.length);
console.log(filtered.slice(0, 30));

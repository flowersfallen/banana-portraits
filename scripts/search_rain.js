const fs = require('fs');

const content = fs.readFileSync('C:/Users/wangyun/.gemini/antigravity/brain/86388622-aced-4b44-96c8-28eabd9590e4/scratch/awesome_prompts_utf8.md', 'utf8');

const regex = /https:\/\/awesomeprompts\.xyz\/prompt\/portraits\/([a-zA-Z0-9_-]+)/g;
let m;
const slugs = [];
while ((m = regex.exec(content)) !== null) {
  if (m[1].toLowerCase().includes('umbrella') || m[1].toLowerCase().includes('rain')) {
    slugs.push(m[1]);
  }
}
console.log('Rain/umbrella portrait slugs:', slugs);

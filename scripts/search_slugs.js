const fs = require('fs');

const content = fs.readFileSync('C:/Users/wangyun/.gemini/antigravity/brain/86388622-aced-4b44-96c8-28eabd9590e4/scratch/awesome_prompts_utf8.md', 'utf8');

const regex = /https:\/\/awesomeprompts\.xyz\/prompt\/portraits\/([a-zA-Z0-9_-]+)/g;
let m;
const slugs = [];
while ((m = regex.exec(content)) !== null) {
  slugs.push(m[1]);
}
console.log('Total portrait slugs:', slugs.length);

// Let's filter slugs by keywords
const interestingKeywords = ['film', 'camera', 'vintage', '35mm', 'retro', 'street', 'tokyo', 'seoul', 'candid', 'natural', 'korean', 'japanese', 'flash'];

const matches = slugs.filter(s => {
  const l = s.toLowerCase();
  return interestingKeywords.some(kw => l.includes(kw));
});

console.log('Slugs matching keywords:', matches.length);
console.log(matches);

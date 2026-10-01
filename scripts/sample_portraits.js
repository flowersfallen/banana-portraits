const fs = require('fs');

const content = fs.readFileSync('C:/Users/wangyun/.gemini/antigravity/brain/86388622-aced-4b44-96c8-28eabd9590e4/scratch/awesome_prompts_utf8.md', 'utf8');

const sections = content.split(/\r?\n---\r?\n/);
let count = 0;
sections.forEach(sec => {
  if (sec.includes('/prompt/portraits/') && count < 5) {
    count++;
    console.log(`=== Sample ${count} ===\n${sec}\n`);
  }
});

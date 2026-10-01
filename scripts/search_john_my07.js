const fs = require('fs');

const content = fs.readFileSync('C:/Users/wangyun/.gemini/antigravity/brain/86388622-aced-4b44-96c8-28eabd9590e4/scratch/awesome_prompts_utf8.md', 'utf8');

const sections = content.split(/\r?\n---\r?\n/);

sections.forEach(sec => {
  if (sec.toLowerCase().includes('john_my07')) {
    const titleMatch = sec.match(/####?\s+([^\r\n]+)/);
    const linkMatch = sec.match(/https:\/\/awesomeprompts\.xyz\/prompt\/([^\/]+)\/([a-zA-Z0-9_-]+)/);
    if (titleMatch && linkMatch) {
      console.log(`Title: ${titleMatch[1]} | ${linkMatch[1]}/${linkMatch[2]}`);
    }
  }
});

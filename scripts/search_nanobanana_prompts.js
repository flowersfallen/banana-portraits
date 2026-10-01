const fs = require('fs');

const content = fs.readFileSync('C:/Users/wangyun/.gemini/antigravity/brain/86388622-aced-4b44-96c8-28eabd9590e4/scratch/awesome_prompts_utf8.md', 'utf8');

const sections = content.split(/\r?\n---\r?\n/);

const matches = [];

sections.forEach(sec => {
  if (sec.toLowerCase().includes('kingofdairyque') || sec.toLowerCase().includes('nanobanana-pro') || sec.toLowerCase().includes('nano banana pro')) {
    const titleMatch = sec.match(/####?\s+([^\r\n]+)/);
    const linkMatch = sec.match(/https:\/\/awesomeprompts\.xyz\/prompt\/([^\/]+)\/([a-zA-Z0-9_-]+)/);
    if (titleMatch && linkMatch) {
      matches.push({
        title: titleMatch[1].trim(),
        category: linkMatch[1],
        slug: linkMatch[2],
        sec
      });
    }
  }
});

console.log('Total matches for kingofdairyque / nanobanana:', matches.length);
matches.forEach((m, i) => {
  console.log(`[${i+1}] ${m.title} (${m.category}/${m.slug})`);
});

const fs = require('fs');

const content = fs.readFileSync('C:/Users/wangyun/.gemini/antigravity/brain/86388622-aced-4b44-96c8-28eabd9590e4/scratch/awesome_prompts_utf8.md', 'utf8');

const sections = content.split(/\r?\n---\r?\n/);

const items = [];

sections.forEach(sec => {
  if (!sec.includes('/prompt/portraits/')) return;
  const titleMatch = sec.match(/####\s+([^\r\n]+)/);
  const linkMatch = sec.match(/https:\/\/awesomeprompts\.xyz\/prompt\/portraits\/([a-zA-Z0-9_-]+)/);
  const tagMatch = sec.match(/\*\*Tags:\*\*\s+([^\r\n]+)/);
  
  if (titleMatch && linkMatch) {
    const lines = sec.split('\n');
    let blurb = '';
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('**[→ View full prompt]')) break;
      if (!lines[i].startsWith('#') && !lines[i].startsWith('**Tags:**') && lines[i].trim()) {
        blurb += lines[i].trim() + ' ';
      }
    }

    items.push({
      title: titleMatch[1].trim(),
      slug: linkMatch[1].trim(),
      tags: tagMatch ? tagMatch[1].trim() : '',
      blurb: blurb.trim()
    });
  }
});

console.log('Total portrait items:', items.length);

// Look for realistic photography blurbs
const photoKeywords = ['candid', 'film', 'camera', 'photo', 'sunlight', 'cafe', 'street', 'natural', 'soft light', 'vintage', '35mm'];

const realistic = items.filter(it => {
  const l = (it.title + ' ' + it.blurb + ' ' + it.tags).toLowerCase();
  if (l.includes('anime') || l.includes('illustration') || l.includes('cyberpunk') || l.includes('3d') || l.includes('fantasy')) return false;
  return photoKeywords.some(kw => l.includes(kw));
});

console.log('Filtered realistic portrait items:', realistic.length);
realistic.slice(0, 35).forEach((it, idx) => {
  console.log(`[${idx+1}] ${it.title}`);
  console.log(`Slug: ${it.slug}`);
  console.log(`Tags: ${it.tags}`);
  console.log(`Blurb: ${it.blurb.slice(0, 150)}...`);
  console.log('---');
});

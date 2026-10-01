const fs = require('fs');

const content = fs.readFileSync('C:/Users/wangyun/.gemini/antigravity/brain/86388622-aced-4b44-96c8-28eabd9590e4/scratch/awesome_prompts_utf8.md', 'utf8');

// Handle Windows and Unix line endings
const sections = content.split(/\r?\n---\r?\n/);
console.log('Total sections in awesome_prompts_utf8:', sections.length);

const results = [];

sections.forEach(sec => {
  const lower = sec.toLowerCase();
  const isPortrait = lower.includes('/prompt/portraits/');
  if (!isPortrait) return;

  const isAsian = lower.includes('korean') || lower.includes('japanese') || lower.includes('asian') || lower.includes('tokyo') || lower.includes('seoul');
  const isCandid = lower.includes('candid') || lower.includes('film') || lower.includes('35mm') || lower.includes('street') || lower.includes('cafe') || lower.includes('kodak') || lower.includes('fuji') || lower.includes('flash');
  
  if (isAsian && isCandid) {
    const titleMatch = sec.match(/###\s+([^\r\n]+)/) || sec.match(/####\s+([^\r\n]+)/);
    const linkMatch = sec.match(/https:\/\/awesomeprompts\.xyz\/prompt\/portraits\/([a-zA-Z0-9_-]+)/);
    const tagMatch = sec.match(/\*\*Tags:\*\*\s+([^\r\n]+)/);
    results.push({
      title: titleMatch ? titleMatch[1].trim() : 'Unknown',
      slug: linkMatch ? linkMatch[1].trim() : 'unknown',
      tags: tagMatch ? tagMatch[1].trim() : '',
      previewText: sec.slice(0, 300)
    });
  }
});

console.log('Found matching East Asian candid portraits in awesome_prompts:', results.length);
results.forEach((r, i) => {
  console.log(`[${i+1}] ${r.title} | ${r.slug} | Tags: ${r.tags}`);
});

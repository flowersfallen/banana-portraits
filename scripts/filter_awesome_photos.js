const fs = require('fs');

const content = fs.readFileSync('C:/Users/wangyun/.gemini/antigravity/brain/86388622-aced-4b44-96c8-28eabd9590e4/scratch/awesome_prompts_utf8.md', 'utf8');

const sections = content.split(/\r?\n---\r?\n/);

const candidates = [];

sections.forEach(sec => {
  if (!sec.includes('/prompt/portraits/')) return;

  const titleMatch = sec.match(/####\s+([^\r\n]+)/);
  const linkMatch = sec.match(/https:\/\/awesomeprompts\.xyz\/prompt\/portraits\/([a-zA-Z0-9_-]+)/);
  const tagMatch = sec.match(/\*\*Tags:\*\*\s+([^\r\n]+)/);

  const title = titleMatch ? titleMatch[1].trim() : '';
  const slug = linkMatch ? linkMatch[1].trim() : '';
  const tags = tagMatch ? tagMatch[1].trim() : '';

  const lower = sec.toLowerCase();
  // We want realistic / photography / portrait
  if (lower.includes('illustration') || lower.includes('3d render') || lower.includes('anime') || lower.includes('cartoon') || lower.includes('watercolor') || lower.includes('bear')) {
    return;
  }

  if (lower.includes('portrait') || lower.includes('photo') || lower.includes('camera') || lower.includes('candid') || lower.includes('film')) {
    candidates.push({ title, slug, tags, sec });
  }
});

console.log('Total photo portrait candidates:', candidates.length);
candidates.slice(0, 25).forEach((c, i) => {
  console.log(`[${i+1}] ${c.title} (${c.slug})`);
  console.log(`Tags: ${c.tags}`);
  console.log('---');
});

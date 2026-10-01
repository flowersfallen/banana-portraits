const fs = require('fs');

// Check magiccreator.md
const mcText = fs.readFileSync('scripts/magiccreator.md', 'utf8');
const mcSections = mcText.split(/\n##\s+/);
console.log('--- Scanning magiccreator.md ---');
mcSections.forEach((sec, idx) => {
  const title = sec.split('\n')[0].trim();
  const lower = sec.toLowerCase();
  if ((lower.includes('portrait') || lower.includes('photo') || lower.includes('woman') || lower.includes('girl')) &&
      (lower.includes('35mm') || lower.includes('candid') || lower.includes('film') || lower.includes('street') || lower.includes('studio') || lower.includes('flash') || lower.includes('cafe'))) {
    const authorMatch = sec.match(/Shared by\s+\[@([^\]]+)\]\((https:\/\/x\.com\/[^\)]+)\)/);
    const imgMatch = sec.match(/<img[^>]*src="([^"]+)"/);
    console.log(`[MC-${idx}] ${title} | Author: @${authorMatch ? authorMatch[1] : 'unknown'}`);
    console.log(`URL: ${authorMatch ? authorMatch[2] : ''}`);
    console.log(`Img: ${imgMatch ? imgMatch[1] : ''}`);
  }
});

// Check catalog_wangrunlin.json
const wrlData = JSON.parse(fs.readFileSync('scripts/catalog_wangrunlin.json', 'utf8'));
console.log('\n--- Scanning catalog_wangrunlin.json ---');
wrlData.entries.forEach((e, idx) => {
  const p = e.prompt?.original_steps?.[0] || '';
  const lower = p.toLowerCase();
  if (lower.includes('portrait') || lower.includes('photo') || lower.includes('woman') || lower.includes('girl')) {
    console.log(`[WRL-${idx}] ID: ${e.id} | Title: ${e.title?.['zh-CN'] || e.title?.en} | Author: @${e.source?.author}`);
    console.log(`URL: ${e.source?.url}`);
  }
});

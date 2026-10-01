const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scripts/catalog_wangrunlin.json', 'utf8'));
console.log('Total entries:', data.entries.length);

const portraits = data.entries.filter(e => {
  const cats = (e.categories || []).join(' ').toLowerCase();
  const tags = (e.tags || []).join(' ').toLowerCase();
  const title = ((e.title && e.title.en) || '').toLowerCase();
  const p = ((e.prompt && e.prompt.text) || '').toLowerCase();
  return cats.includes('portrait') || cats.includes('photo') || cats.includes('character') ||
         tags.includes('portrait') || tags.includes('photo') || tags.includes('woman') ||
         title.includes('portrait') || title.includes('photo') || title.includes('woman') ||
         p.includes('portrait') || p.includes('woman') || p.includes('film');
});

console.log('Portrait/photo entries:', portraits.length);
portraits.forEach((p, i) => {
  console.log(`\n[${i+1}] ID: ${p.id} | Title: ${p.title ? (p.title['zh-CN'] || p.title.en) : 'No title'}`);
  console.log('Author:', p.source ? p.source.author : 'unknown', '| URL:', p.source ? p.source.url : '');
  console.log('Categories:', p.categories, '| Tags:', p.tags);
  console.log('Prompt:', ((p.prompt && p.prompt.text) || '').slice(0, 200));
});

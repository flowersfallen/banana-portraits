const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scripts/catalog_wangrunlin.json', 'utf8'));

data.entries.forEach(e => {
  const text = (e.title?.['zh-CN'] || e.title?.en || '') + ' ' + (e.prompt?.original_steps?.[0] || '');
  const lower = text.toLowerCase();
  if (lower.includes('woman') || lower.includes('portrait') || lower.includes('girl') || lower.includes('photo') || lower.includes('travel')) {
    console.log(`ID: ${e.id} | Title: ${e.title?.['zh-CN'] || e.title?.en}`);
    console.log(`Author: ${e.source?.author} | URL: ${e.source?.url}`);
    console.log(`Preview: ${(e.prompt?.original_steps?.[0] || '').slice(0, 180)}...`);
    console.log('----------------------------------------');
  }
});

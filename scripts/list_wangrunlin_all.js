const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/catalog_wangrunlin.json', 'utf8'));

data.entries.forEach((e, i) => {
  const step = e.prompt?.original_steps?.[0] || '';
  const title = e.title?.['zh-CN'] || e.title?.en;
  console.log(`[${i+1}] ${e.id} | ${title} | Author: ${e.source?.author}`);
  console.log(`URL: ${e.source?.url}`);
  console.log(`Step preview: ${step.slice(0, 100)}...`);
  console.log('---');
});

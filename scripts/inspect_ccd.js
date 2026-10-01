const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/catalog_wangrunlin.json', 'utf8'));
const item1 = data.entries.find(e => e.id === 'nineties-japanese-ccd-photo');
console.log('original_language:', item1.prompt.original_language);
console.log('original_steps:', JSON.stringify(item1.prompt.original_steps, null, 2));

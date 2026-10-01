const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/catalog_wangrunlin.json', 'utf8'));

const item52 = data.entries.find(e => e.id === 'coastal-abbey-travel-portrait');
console.log('=== coastal-abbey-travel-portrait ===');
console.log('Title:', item52?.title);
console.log('Source:', item52?.source);
console.log('Preview:', item52?.previews);
console.log('Original steps:\n', item52?.prompt?.original_steps?.[0]);

console.log('\n=== Withheld entries ===');
console.log(data.withheld);

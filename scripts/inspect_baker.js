const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/catalog_wangrunlin.json', 'utf8'));

const item = data.entries.find(e => e.id === 'vintage-baker-portraits');
console.log('=== vintage-baker-portraits ===');
console.log('Title:', item?.title);
console.log('Source:', item?.source);
console.log('Preview:', item?.previews);
console.log('Original steps:\n', item?.prompt?.original_steps?.[0]);

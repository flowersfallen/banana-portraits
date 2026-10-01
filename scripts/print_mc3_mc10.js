const fs = require('fs');
const text = fs.readFileSync('scripts/magiccreator.md', 'utf8');
const sections = text.split(/\n##\s+/);

const sec3 = sections.find(s => s.startsWith('Realistic Portrait: Detailed Flash Photography'));
const sec10 = sections.find(s => s.startsWith('Analog Editorial Portrait With Direct Flash'));

console.log('=== MC-3 ===\n', sec3);
console.log('\n=== MC-10 ===\n', sec10);

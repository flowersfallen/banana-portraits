const fs = require('fs');
const text = fs.readFileSync('scripts/magiccreator.md', 'utf8');
const sections = text.split(/\n##\s+/);

const sec40 = sections.find(s => s.startsWith('Everyday Lifestyle Realism'));
console.log(sec40);

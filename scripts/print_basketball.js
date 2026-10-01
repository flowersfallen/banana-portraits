const fs = require('fs');

const text = fs.readFileSync('scripts/magiccreator.md', 'utf8');
const sections = text.split(/\n##\s+/);

const sec = sections.find(s => s.startsWith('Basketball Court Flash Portrait'));
if (sec) {
  console.log(sec);
}

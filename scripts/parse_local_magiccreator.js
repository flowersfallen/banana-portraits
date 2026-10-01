const fs = require('fs');

const text = fs.readFileSync('scripts/magiccreator.md', 'utf8');
const sections = text.split(/\n##\s+/);

const targets = [
  'White Studio Tennis Portrait',
  'Basketball Court Flash Portrait',
  'Onsen Ryokan Film Portrait',
  'Late-Night Convenience Store Portrait',
  'Realistic Portrait: Detailed Flash Photography',
  'Analog Editorial Portrait With Direct Flash'
];

sections.forEach(sec => {
  const title = sec.split('\n')[0].trim();
  if (targets.includes(title)) {
    console.log(`=== ${title} ===`);
    console.log(sec.trim());
    console.log('\n==========================================\n');
  }
});

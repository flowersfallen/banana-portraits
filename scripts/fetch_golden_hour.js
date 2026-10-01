const { execSync } = require('child_process');

const targets = [
  'pg-1994144048198893714-golden-hour-charm-a-vintage-escape',
  'pg-1996570588148810137-golden-hour-glamour-on-cobblestone-streets'
];

targets.forEach(slug => {
  const url = `https://raw.githubusercontent.com/samuxbuilds/awesome-prompts/main/prompts/portraits/${slug}.md`;
  try {
    const out = execSync(`curl.exe -s --max-time 10 "${url}"`, { encoding: 'utf8' });
    console.log(`=== ${slug} ===\n` + out.slice(0, 600));
    console.log('\n----------------------------------------\n');
  } catch (err) {
    console.error(`Failed to fetch ${slug}:`, err.message);
  }
});

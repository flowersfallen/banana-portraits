const { execSync } = require('child_process');

const targets = [
  'pg-1995061728128745526-tokyo-nights-glamour-in-a-tipsy-glow',
  'pg-1996773318914199846-candid-charm-a-flashback-through-the-lens',
  'pg-1996825681280307472-candid-moments-captured-a-glimpse-of-nostalgia',
  'pg-1994028996816982182-retro-reverie-a-90s-winter-portrait'
];

targets.forEach(slug => {
  const url = `https://raw.githubusercontent.com/samuxbuilds/awesome-prompts/main/prompts/portraits/${slug}.md`;
  try {
    const out = execSync(`curl.exe -s --max-time 10 "${url}"`, { encoding: 'utf8' });
    console.log(`=== ${slug} ===\n` + out.slice(0, 700));
    console.log('\n----------------------------------------\n');
  } catch (err) {
    console.error(`Failed to fetch ${slug}:`, err.message);
  }
});

const { execSync } = require('child_process');

const targets = [
  'pg-1996751012934082673-cozy-kawaii-bliss-a-winter-portrait-of-comfort',
  'pg-1993237966643466406-cozy-glow-winter-vibes-in-pastel-hues',
  'pg-1994168239442510308-autumn-aesthetics-cozy-layers-nature-s-palette'
];

targets.forEach(slug => {
  const url = `https://raw.githubusercontent.com/samuxbuilds/awesome-prompts/main/prompts/portraits/${slug}.md`;
  try {
    const out = execSync(`curl.exe -s --max-time 10 "${url}"`, { encoding: 'utf8' });
    console.log(`=== ${slug} ===\n` + out);
    console.log('\n----------------------------------------\n');
  } catch (err) {
    console.error(`Failed to fetch ${slug}:`, err.message);
  }
});

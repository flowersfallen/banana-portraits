const { execSync } = require('child_process');

const targets = [
  'pg-1994342814646153476-chasing-light-a-cozy-moment-with-gemini-nano-banana-3-0',
  'pg-1996186327491162275-caf-vibes-parisian-mornings-captured',
  'pg-1996421081381605493-chic-in-the-city-a-modern-muse'
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

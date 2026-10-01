const { execSync } = require('child_process');

const targets = [
  'pg-1994380091241922920-sunlit-elegance-the-art-of-minimalist-skincare',
  'pg-1991730551531925570-unlocking-the-art-of-photography-with-nano-banana-pro',
  'pg-1994216072426475887-chic-confidence-the-gemini-nano-banana-pro-look',
  'pg-1993980595244761517-elegance-in-focus-the-nano-banana-pro-unleashed'
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

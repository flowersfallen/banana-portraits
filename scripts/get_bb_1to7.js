const fs = require('fs');

const content = fs.readFileSync('C:/Users/wangyun/.gemini/antigravity/brain/86388622-aced-4b44-96c8-28eabd9590e4/.system_generated/steps/178/content.md', 'utf8');

const regex = /<a[^>]*href="(\/prompts\/[^"]+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"[\s\S]*?<p[^>]*class="[^"]*line-clamp[^"]*">([\s\S]*?)<\/p>[\s\S]*?<span>([^<]+)<\/span>/g;

let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  const author = match[5].trim();
  if (author.toLowerCase().includes('bubblebrain')) {
    count++;
    if (count <= 7) {
      console.log(`\n=== Item ${count}: ${match[3]} (${match[1]}) ===`);
      console.log('Image:', match[2]);
      console.log('Prompt:\n' + match[4].replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, '&').trim());
    }
  }
}

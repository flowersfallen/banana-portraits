const fs = require('fs');

const content = fs.readFileSync('C:/Users/wangyun/.gemini/antigravity/brain/86388622-aced-4b44-96c8-28eabd9590e4/.system_generated/steps/178/content.md', 'utf8');

const regex = /<a[^>]*href="(\/prompts\/[^"]+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"[\s\S]*?<p[^>]*class="[^"]*line-clamp[^"]*">([\s\S]*?)<\/p>[\s\S]*?<span>([^<]+)<\/span>/g;

let match;
const bbItems = [];
while ((match = regex.exec(content)) !== null) {
  const author = match[5].trim();
  if (author.toLowerCase().includes('bubblebrain')) {
    bbItems.push({
      id: match[1].replace('/prompts/', ''),
      title: match[3],
      preview_image: match[2],
      prompt: match[4].replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, '&').trim()
    });
  }
}

console.log('Total BubbleBrain items:', bbItems.length);
bbItems.forEach((it, i) => {
  console.log(`\n=== [${i+1}] ${it.title} (${it.id}) ===`);
  console.log('Image:', it.preview_image);
  console.log('Prompt:\n' + it.prompt);
});

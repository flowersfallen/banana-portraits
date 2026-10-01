const fs = require('fs');

const content = fs.readFileSync('C:/Users/wangyun/.gemini/antigravity/brain/86388622-aced-4b44-96c8-28eabd9590e4/.system_generated/steps/178/content.md', 'utf8');

const regex = /<a[^>]*href="(\/prompts\/[^"]+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"[\s\S]*?<p[^>]*class="[^"]*line-clamp[^"]*">([\s\S]*?)<\/p>[\s\S]*?<span>([^<]+)<\/span>/g;

let match;
const authors = {};
const items = [];

while ((match = regex.exec(content)) !== null) {
  const urlPath = match[1];
  const preview_image = match[2];
  const title = match[3];
  let prompt = match[4].replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, '&').trim();
  const author = match[5].trim();
  
  authors[author] = (authors[author] || 0) + 1;
  items.push({ urlPath, preview_image, title, prompt, author });
}

console.log('Total items in step 178:', items.length);
console.log('Authors distribution:', JSON.stringify(authors, null, 2));

// Filter high potential items
const candidItems = items.filter(it => {
  const t = (it.title + " " + it.prompt).toLowerCase();
  const isPerson = t.includes('woman') || t.includes('girl') || t.includes('portrait') || t.includes('idol') || t.includes('female');
  const isEastAsian = t.includes('korean') || t.includes('japanese') || t.includes('asian') || t.includes('tokyo') || t.includes('seoul') || t.includes('fuji');
  const isCandid = t.includes('candid') || t.includes('film') || t.includes('35mm') || t.includes('portra') || t.includes('flash') || t.includes('natural');
  return isPerson && isEastAsian && isCandid;
});

console.log('Found filtered East Asian candid portrait candidates:', candidItems.length);
candidItems.forEach((it, i) => {
  console.log(`\n--- [${i+1}] ${it.title} (${it.author}) ---`);
  console.log(`URL: https://gptimage2prompt.net${it.urlPath}`);
  console.log(`Image: ${it.preview_image}`);
  console.log(`Prompt: ${it.prompt.slice(0, 200)}...`);
});

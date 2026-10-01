const fs = require('fs');

const content = fs.readFileSync('C:/Users/wangyun/.gemini/antigravity/brain/86388622-aced-4b44-96c8-28eabd9590e4/.system_generated/steps/178/content.md', 'utf8');

const regex = /<a[^>]*href="(\/prompts\/[^"]+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"[\s\S]*?<p[^>]*class="[^"]*line-clamp[^"]*">([\s\S]*?)<\/p>[\s\S]*?<span>([^<]+)<\/span>/g;

const targets = [
  'fujifilm-strawberry-school-portrait',
  'soft-airy-35mm-portrait',
  'ccd-camera-flash-korean-idol',
  'cozy-academia'
];

let match;
while ((match = regex.exec(content)) !== null) {
  const urlPath = match[1];
  const id = urlPath.replace('/prompts/', '');
  if (targets.includes(id)) {
    console.log('=== ID:', id, '===');
    console.log('Title:', match[3]);
    console.log('Author:', match[5]);
    console.log('Image:', match[2]);
    console.log('Prompt:\n' + match[4].replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, '&'));
    console.log('============================================\n');
  }
}

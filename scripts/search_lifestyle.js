const fs = require('fs');

const text = fs.readFileSync('scripts/magiccreator.md', 'utf8');
const sections = text.split(/\n##\s+/);

sections.forEach((sec, i) => {
  const title = sec.split('\n')[0].trim();
  const lower = sec.toLowerCase();
  if (lower.includes('candid') || lower.includes('street') || lower.includes('cafe') || lower.includes('outdoor')) {
    const authorMatch = sec.match(/Shared by\s+\[@([^\]]+)\]\((https:\/\/x\.com\/[^\)]+)\)/);
    console.log(`[${i}] ${title}`);
    if (authorMatch) console.log(`Author: @${authorMatch[1]} | ${authorMatch[2]}`);
    const promptMatch = sec.match(/```(?:text)?\s*([\s\S]*?)```/);
    if (promptMatch) {
      console.log(`Prompt preview: ${promptMatch[1].trim().slice(0, 150)}...`);
    }
    console.log('---');
  }
});

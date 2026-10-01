const fs = require('fs');

async function main() {
  const res = await fetch('https://raw.githubusercontent.com/magiccreator-ai/awesome-gpt-image-2-prompts/main/README.md');
  const text = await res.text();
  
  const sections = text.split(/\n##\s+/);
  console.log('Total sections in magiccreator-ai:', sections.length);

  sections.forEach((sec, i) => {
    const lines = sec.split('\n');
    const title = lines[0].trim();
    const lower = sec.toLowerCase();
    
    // Look for portrait / photo
    if (lower.includes('portrait') || lower.includes('photo') || lower.includes('korean') || lower.includes('fashion') || lower.includes('candid')) {
      const authorMatch = sec.match(/Shared by\s+\[@([^\]]+)\]\((https:\/\/x\.com\/[^\)]+)\)/);
      const promptMatch = sec.match(/```(?:text)?\s*([\s\S]*?)```/);
      const imgMatch = sec.match(/<img[^>]*src="([^"]+)"/);

      console.log(`\n[${i}] Title: ${title}`);
      if (authorMatch) console.log(`Author: @${authorMatch[1]} | URL: ${authorMatch[2]}`);
      if (imgMatch) console.log(`Image: ${imgMatch[1]}`);
      if (promptMatch) {
        console.log(`Prompt: ${promptMatch[1].trim().slice(0, 150)}...`);
      }
    }
  });
}

main().catch(console.error);

async function main() {
  const res = await fetch('https://raw.githubusercontent.com/Anil-matcha/Awesome-GPT-Image-2-API-Prompts/main/README.md');
  const text = await res.text();
  
  const sections = text.split(/\n###\s+/);
  console.log('Total sections in Anil-matcha:', sections.length);

  sections.forEach((sec, i) => {
    const lines = sec.split('\n');
    const title = lines[0].trim();
    const lower = sec.toLowerCase();
    
    if (lower.includes('portrait') || lower.includes('photo') || lower.includes('korean') || lower.includes('candid') || lower.includes('woman')) {
      const promptMatch = sec.match(/```(?:text)?\s*([\s\S]*?)```/);
      const sourceMatch = sec.match(/\*\*Source:\*\*\s+([^\n]+)/);

      console.log(`\n[${i}] Title: ${title}`);
      if (sourceMatch) console.log(`Source: ${sourceMatch[1]}`);
      if (promptMatch) {
        console.log(`Prompt: ${promptMatch[1].trim().slice(0, 200)}...`);
      }
    }
  });
}

main().catch(console.error);

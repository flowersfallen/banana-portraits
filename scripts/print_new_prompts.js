async function main() {
  const res = await fetch('https://raw.githubusercontent.com/Anil-matcha/Awesome-GPT-Image-2-API-Prompts/main/README.md');
  const text = await res.text();
  
  const sections = text.split(/\n###\s+/);

  const targets = [
    'Japanese Onsen Ryokan Portrait',
    'Mirror Selfie Bedroom Portrait'
  ];

  sections.forEach(sec => {
    const lines = sec.split('\n');
    const title = lines[0].trim();
    if (targets.includes(title)) {
      console.log(`=== ${title} ===`);
      console.log(sec);
      console.log('-------------------------------------\n');
    }
  });

  const res2 = await fetch('https://raw.githubusercontent.com/magiccreator-ai/awesome-gpt-image-2-prompts/main/README.md');
  const text2 = await res2.text();
  const sections2 = text2.split(/\n##\s+/);
  const targets2 = [
    'White Studio Tennis Portrait',
    'Basketball Court Flash Portrait',
    'Onsen Ryokan Film Portrait'
  ];
  sections2.forEach(sec => {
    const lines = sec.split('\n');
    const title = lines[0].trim();
    if (targets2.includes(title)) {
      console.log(`=== ${title} (from magiccreator) ===`);
      console.log(sec);
      console.log('-------------------------------------\n');
    }
  });
}

main().catch(console.error);

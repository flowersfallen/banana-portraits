const fs = require('fs');
const path = require('path');

const filePath = 'C:/Users/wangyun/.gemini/antigravity/brain/86388622-aced-4b44-96c8-28eabd9590e4/.system_generated/steps/178/content.md';
const content = fs.readFileSync(filePath, 'utf8');

// Regex to capture cards:
// <a ... href="(/prompts/[^"]+)" ...>
// <img ... src="([^"]+)" alt="([^"]+)" ...>
// <p ... class="[^"]*line-clamp[^"]*">([\s\S]*?)</p>
// <span>(author)</span>

const regex = /<a[^>]*href="(\/prompts\/[^"]+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"[\s\S]*?<p[^>]*class="[^"]*line-clamp[^"]*">([\s\S]*?)<\/p>[\s\S]*?<span>([^<]+)<\/span>/g;

let match;
const items = [];
const seenIds = new Set();

// Helper to determine dimensions
function inferDimensions(title, prompt) {
  const text = (title + " " + prompt).toLowerCase();
  
  // Country / Region
  let country = "东亚";
  if (text.includes("korean") || text.includes("korea") || text.includes("韩国") || text.includes("韩系") || text.includes("seoul")) {
    country = "韩国";
  } else if (text.includes("japanese") || text.includes("japan") || text.includes("日本") || text.includes("日系") || text.includes("tokyo") || text.includes("和服") || text.includes("shinjuku")) {
    country = "日本";
  } else if (text.includes("chinese") || text.includes("china") || text.includes("中国") || text.includes("国风") || text.includes("旗袍") || text.includes("水墨")) {
    country = "中国";
  } else if (text.includes("caucasian") || text.includes("western") || text.includes("blonde") || text.includes("paris") || text.includes("欧美") || text.includes("欧洲") || text.includes("russian") || text.includes("black woman")) {
    country = "欧美";
  }

  // Gender
  let gender = "女性";
  if (text.includes(" man") || text.includes(" guy") || text.includes(" male") || text.includes("男士") || text.includes("男人") || text.includes("男模") || text.includes("老者") || text.includes("老爷爷") || text.includes("boy")) {
    gender = "男性";
  }

  // Scene
  let scene = "生活日常";
  if (text.includes("convenience store") || text.includes("便利店")) {
    scene = "便利店";
  } else if (text.includes("concert") || text.includes("stage") || text.includes("舞台") || text.includes("打歌")) {
    scene = "演唱会舞台";
  } else if (text.includes("cafe") || text.includes("coffee") || text.includes("咖啡")) {
    scene = "咖啡馆";
  } else if (text.includes("track") || text.includes("跑道") || text.includes("court") || text.includes("球场") || text.includes("sports")) {
    scene = "运动跑道";
  } else if (text.includes("beach") || text.includes("海滩") || text.includes("sunset") || text.includes("日落") || text.includes("海滨")) {
    scene = "海滩日落";
  } else if (text.includes("street") || text.includes("night") || text.includes("街头") || text.includes("夜景") || text.includes("夜市")) {
    scene = "街头夜景";
  } else if (text.includes("mecha") || text.includes("cyber") || text.includes("机甲") || text.includes("赛博") || text.includes("sci-fi")) {
    scene = "赛博机甲";
  } else if (text.includes("bedroom") || text.includes("indoor") || text.includes("室内") || text.includes("卧室") || text.includes("晨间")) {
    scene = "室内生活";
  } else if (text.includes("flower") || text.includes("spring") || text.includes("花田") || text.includes("秋叶") || text.includes("花园")) {
    scene = "自然风光";
  }

  // Outfit
  let outfit = "休闲日常";
  if (text.includes("hoodie") || text.includes("卫衣")) {
    outfit = "连帽卫衣 (Hoodie)";
  } else if (text.includes("stage") || text.includes("idol") || text.includes("偶像装") || text.includes("演出服")) {
    outfit = "舞台偶像装";
  } else if (text.includes("suit") || text.includes("西装") || text.includes("blazer")) {
    outfit = "西装正装";
  } else if (text.includes("dress") || text.includes("skirt") || text.includes("连身裙") || text.includes("一字肩") || text.includes("短裙")) {
    outfit = "优雅裙装";
  } else if (text.includes("bomber") || text.includes("jacket") || text.includes("夹克") || text.includes("风衣") || text.includes("工装")) {
    outfit = "夹克/风衣";
  } else if (text.includes("mecha") || text.includes("armor") || text.includes("战衣") || text.includes("装甲")) {
    outfit = "战术机甲";
  } else if (text.includes("qipao") || text.includes("kimono") || text.includes("旗袍") || text.includes("和服") || text.includes("汉服")) {
    outfit = "传统服饰";
  } else if (text.includes("sport") || text.includes("tracksuit") || text.includes("运动")) {
    outfit = "运动风";
  } else if (text.includes("y2k")) {
    outfit = "Y2K";
  } else if (text.includes("sweater") || text.includes("毛衣")) {
    outfit = "复古毛衣";
  }

  return { country, gender, scene, outfit };
}

while ((match = regex.exec(content)) !== null) {
  const urlPath = match[1];
  const preview_image = match[2];
  const title = match[3];
  let prompt = match[4].replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, '&').trim();
  const author = match[5].trim();

  const id = urlPath.replace('/prompts/', '');
  if (seenIds.has(id)) continue;
  seenIds.add(id);

  const dimensions = inferDimensions(title, prompt);
  
  items.push({
    id,
    title,
    category: "character",
    status: "unverified",
    source_model: "GPT Image 2",
    target_model: "Nano Banana (Google Flow)",
    author,
    source_url: `https://gptimage2prompt.net${urlPath}`,
    preview_image,
    verified_image: null,
    dimensions,
    tags: [dimensions.country, dimensions.gender, dimensions.scene, dimensions.outfit],
    prompt,
    negative_prompt: "watermark, logo, text, extra fingers, deformed hands, distorted face, wrong identity, blurry face, plastic skin, low resolution",
    flow_usage_tip: `在 Google Flow 中使用 Nano Banana 生成此「${title}」后，点击图片右上角【设为角色】锁定资产，即可在分镜中以 @角色名 持续调用。`
  });
}

console.log(`Successfully extracted ${items.length} items.`);

// Merge with existing items, ensuring unique IDs
const existingPath = path.join(__dirname, '../src/data/characters.json');
let existing = [];
if (fs.existsSync(existingPath)) {
  existing = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
}

const existingMap = new Map();
existing.forEach(item => existingMap.set(item.id, item));

items.forEach(item => {
  if (!existingMap.has(item.id)) {
    existingMap.set(item.id, item);
  }
});

const merged = Array.from(existingMap.values());
fs.writeFileSync(existingPath, JSON.stringify(merged, null, 2), 'utf8');
console.log(`Total saved in characters.json: ${merged.length}`);

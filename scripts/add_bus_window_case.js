const { uploadFileToR2 } = require('./upload-r2');
const path = require('path');
const fs = require('fs');
const https = require('https');

const dir = 'C:/Users/wangyun/Downloads/111';
const files = [
  'Woman_sitting_by_bus_window_2K_20261002155810.jpg',
  'Woman_sitting_on_bus_window_2K_20261002155834.jpg',
  'Woman_looking_out_bus_window_2K_20261002155907.jpg',
  'Woman_sitting_by_bus_window_2K_20261002160005.jpg'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => {
      resolve(e.message);
    });
  });
}

const promptText = `主題：
バス窓の白い午後

主体：
画面中央から右、日本の路線バスの窓側席に座る白い服の女性が主役。

人物・表情：
小さな卵形の顔、濃茶の大きな瞳、細い眉、整った鼻、艶のある淡桃色の唇。顔を左へ向け、視線を窓の外へ流した静かな横顔。濃茶の長いストレート髪を下ろし、薄い前髪と耳元の毛束を残す。

服装・ポーズ：
白い透け感のある細肩紐トップと白いボトム、下に茶色のブラトップ。青い座席へ腰掛け、背を窓側へ預け、両手を腿付近へ置く。

背景・光：
青い布張り座席、手すり、案内表示を持つ日本のバス車内、窓外に街並み。画面左の大窓から強い午後の直射日光が顔と白布を照らす。

構図・カメラ：
4:5の縦構図、通路側からの目線高さの斜めカメラで頭頂から腿までの三分身を収めるポートレート。人物を右寄りへ大きく配置。座席と腿を下端で裁切し、横顔と透ける白い衣装にピント、背景は軽くぼかす。

質感・スタイル：
フォトリアルな実写写真。自然な肌と髪、衣装の素材、周囲の小物を高精細にし、白、青、茶、日差しの金色を保つ。

ネガティブ：
車内を別空間へ変更；窓を見る横顔変更`;

async function run() {
  console.log('1. Uploading images to Cloudflare R2...');
  const uploadedUrls = [];
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dir, files[i]);
    const num = String(i + 1).padStart(2, '0');
    const r2Key = `characters/bus-window-afternoon-white-${num}.jpg`;
    console.log(`Uploading ${files[i]} -> ${r2Key}...`);
    const res = await uploadFileToR2(filePath, r2Key);
    uploadedUrls.push(res.url);

    const status = await checkUrl(res.url);
    console.log(`CDN Check [${res.url}]: HTTP ${status}`);
  }

  console.log('2. Updating characters.json...');
  const jsonPath = 'd:/website1/src/data/characters.json';
  const chars = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const id = 'bus-window-afternoon-white-portrait';
  if (chars.some(c => c.id === id)) {
    console.log('Character already exists in characters.json');
    return;
  }

  const newCharacter = {
    id: id,
    title: 'Woman in white gazes from bus window in afternoon light',
    category: 'character',
    status: 'verified',
    source_model: 'GPT Image 2',
    target_model: 'Nano Banana Pro',
    aspect_ratio: '4:5',
    author: '@CyberTotal2026',
    source_url: 'https://x.com/CyberTotal2026/status/2104169430393532694',
    preview_image: uploadedUrls[0],
    verified_image: uploadedUrls[0],
    dimensions: {
      country: '日本',
      gender: '女性',
      scene: '路线巴士车内',
      outfit: '白色透感细吊带上衣'
    },
    tags: [
      '巴士车窗',
      '午后斜阳',
      '静谧侧颜',
      '透光白衣',
      '日系纪实',
      '4:5构图'
    ],
    prompt: promptText,
    flow_usage_tip: '在 Google Flow 中使用 Nano Banana Pro 生成后，点击右上角【设为角色】锁定资产，在后续分镜中可保持日本巴士车窗斜阳照射、静谧侧颜流转眼神、白色透感细吊带与蓝色布艺座椅配色的连贯性。',
    gallery_images: uploadedUrls
  };

  chars.push(newCharacter);
  fs.writeFileSync(jsonPath, JSON.stringify(chars, null, 2), 'utf8');
  console.log('Successfully updated characters.json! Total characters now:', chars.length);
}

run().catch(console.error);

# 新增画廊案例标准操作流程（SOP & 避坑指南）

> **目标**：收到用户的新案例输入后，在 **≤ 30 秒（单步完成）** 内完成“图片直传 R2 ➔ 本地写入 characters.json”，localhost 立即生效预览！绝不自动执行 Git 提交与推送。

---

## 🚫 绝对避坑铁律（必须牢记）

1. 🔴 **严禁上传前探测 CDN（最致命 Bug！）**：
   * **原因**：如果向 `https://img.iceotter.com/...` 提前发起 GET 请求，Cloudflare 边缘节点会立刻把 `404 Not Found` 强行缓存数分钟（Negative Cache）。
   * **后果**：即使随后图片顺利上传至 R2，CDN 依然会持续返回 404，导致误判上传失败并引发长达半小时的无效排查。
   * **正确做法**：**只管上传，上传成功后直接使用，或者使用带时间戳参数（`?t=Date.now()`）绕过缓存验证。**

2. 🔴 **严禁逐张打开预览大图**：
   * 用户提供的 2K 图片动辄 3MB+，逐张调用 `view_file` 会浪费 8~10 分钟的模型往返时间，毫无意义。
   * **正确做法**：直接读取目录文件列表，按文件名/修改时间排序后批量上传。

3. 🔴 **严禁碎片化多轮调用**：
   * 严禁“查一次目录跑一次命令、写一次文件调一次工具、查一次状态等一次消息”。
   * **正确做法**：使用一体化脚本（One-Shot Execution），一次执行把“扫描图片 ➔ 上传 R2 ➔ 更新 characters.json ➔ 更新 README ➔ Git 提交推送”全部跑通。

4. 🔴 **严禁每次自动 Git 提交与远程推送（核心提速铁律！）**：
   * 每次添加案例**只需完成本地更新**（上传 R2 ➔ 追加写入 `characters.json`），让 `http://localhost:3000` 能够即时刷新看到效果即可！
   * **绝对不要**每次都跑 `git status`、`git add`、`git commit`、`git push`！这一连串 Git 操作会产生 5 次大模型往返，硬生生白白增加 7~10 分钟等待时间！
   * **只有当用户明确下达“提交”、“推送”或“更新线上”指令时**，才集中执行一次 Git 提交与推送。

5. 🔴 **分支管理铁律**：
   * 日常调试与添加案例：**一律在 `dev` 分支操作**；
   * **只有当用户明确下达“更新线上”指令时**，才切换到 `main` 分支进行合并与推送。

---

## 📥 用户标准输入格式

用户通常按以下格式发送：
```text
标题：你想个标题（或具体指定标题）
来源：https://banana.iceotter.com/
图片：C:\Users\wangyun\Downloads\111
提示词：
{
  ...
}
```

---

## ⚡ 极速标准化处理流程（标准 SOP）

### 第一步：准备案例基本信息
1. **ID 生成**：英文短横线命名，例如 `sultry-streamer-black-mockneck-portrait`。
2. **CDN 存储键**：`characters/<slug>-01.jpg` ~ `04.jpg`。
3. **标签与维度提取**：根据提示词中的人物、服装、场景自动提炼 4~6 个中文标签与 `dimensions` 信息。
4. **画幅比**：默认 `9:16`（或依据提示词相机参数设定）。

### 第二步：编写或执行一键入库脚本
脚本核心逻辑：
1. 读取 `C:\Users\wangyun\Downloads\111` 下的图片；
2. 批量并发调用 `uploadFileToR2` 上传到 Cloudflare R2；
3. 追加新对象到 `src/data/characters.json`；
4. 同步更新 `README.md` 的案例统计徽章（`Cases-XX-`）和说明文本；
5. 立即在 http://localhost:3000 生效预览（仅本地更新，不执行 Git 提交与远程推送，等待用户进一步指示）。

---

## 🛠️ 通用入库脚本模板参考

可直接基于 `scripts/add-case.js` 快速执行：

```javascript
const { uploadFileToR2 } = require('./upload-r2');
const path = require('path');
const fs = require('fs');

async function addCase({ dir, id, title, prompt, tags, dimensions, flow_tip }) {
  // 1. 获取图片列表
  const files = fs.readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .slice(0, 4);

  // 2. 批量上传 R2（严禁上传前探测 CDN）
  const uploadedUrls = [];
  for (let i = 0; i < files.length; i++) {
    const num = String(i + 1).padStart(2, '0');
    const r2Key = `characters/${id.replace('-portrait', '')}-${num}.jpg`;
    const res = await uploadFileToR2(path.join(dir, files[i]), r2Key);
    uploadedUrls.push(res.url);
  }

  // 3. 更新 characters.json
  const jsonPath = path.resolve(__dirname, '../src/data/characters.json');
  const chars = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  chars.push({
    id,
    title,
    aspect_ratio: '9:16',
    source_model: 'Nano Banana Pro',
    target_model: 'Nano Banana Pro',
    source_url: 'https://banana.iceotter.com/',
    preview_image: uploadedUrls[0],
    verified_image: uploadedUrls[0],
    dimensions,
    tags,
    prompt: typeof prompt === 'string' ? prompt : JSON.stringify(prompt, null, 2),
    flow_usage_tip: flow_tip,
    gallery_images: uploadedUrls
  });
  fs.writeFileSync(jsonPath, JSON.stringify(chars, null, 2) + '\n', 'utf8');

  // 4. 更新 README 案例计数
  const readmePath = path.resolve(__dirname, '../README.md');
  const count = chars.length;
  let readme = fs.readFileSync(readmePath, 'utf8');
  readme = readme.replace(/Cases-\d+-/g, `Cases-${count}-`);
  readme = readme.replace(/\d+ 组/g, `${count} 组`);
  fs.writeFileSync(readmePath, readme, 'utf8');

  console.log(`Successfully added case! Total cases now: ${count}`);
}
```

---

## ⏱️ 耗时基准线
* 完整执行期望耗时：**≤ 20~30 秒**
* 工具调用次数：**仅 1 次**（单步完成图片上传与本地更新，localhost 即刻热更新呈现）
* 响应策略：**不跑任何 Git 命令**，直接告知用户已在 `http://localhost:3000` 生效预览！

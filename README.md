<div align="center">

# 🍌 Banana Portraits

**Nano Banana 超写实人像提示词灵感画廊 (Google Flow 实测)**

[![Website](https://img.shields.io/badge/Website-banana--portraits.pages.dev-orange?style=flat-square&logo=cloudflare)](https://banana-portraits.pages.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Cases](https://img.shields.io/badge/Cases-40+-emerald?style=flat-square)](https://banana-portraits.pages.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[🌐 访问在线画廊](https://banana-portraits.pages.dev/) • [📖 使用指南](#-使用指南) • [🚀 快速开始](#-本地开发) • [💡 提示词工程](#-提示词工程设计)

</div>

---

## 📖 About / 关于项目

> 🔗 **在线体验地址**：**[https://banana-portraits.pages.dev/](https://banana-portraits.pages.dev/)**

**Banana Portraits** 是专为 **Google Nano Banana (Nano Banana Pro / Gemini Nano Banana 3.0)** 与 **Google Flow** 打造的超写实人像提示词灵感展示库与分镜连续性实战画廊。

与传统单纯堆砌随机关键词不同，画廊中的每个案例均经过 **Google Flow 真实多视角生成验证**，保留了纯正的摄影级光影、原生相机直出质感（如 35mm 胶片、奥林巴斯 μ2、iPhone 16 Pro Max 直闪、佳能 IXUS）、自然真实的皮肤毛孔与生活细节。

无论你是 AI 摄影师、数字分镜创作者还是 Prompt 工程师，都可以在这里一键获取结构化 Prompt、学习参数工程，并在 Google Flow 中实现同一角色的跨场景连续创作。

---

## ✨ 核心特性

- **🎯 100% Google Flow 实测出图**：拒绝概念图，全量收录 40 组可直接在 Flow 中高保真复现的写实人像案例。
- **🧩 结构化 Prompt-as-Code**：完整保留摄影机位、光线氛围、主体容貌特征、服装配饰与环境道具等结构化 JSON / 英文提示词。
- **🎬 分镜连续性（设为角色）指导**：每个案例均配备针对 Google Flow「设为角色」资产锁定的使用心得与多机位连贯技巧。
- **📱 极致响应式与移动端交互**：针对手机竖屏（9:16）进行专门优化，包含轻量化卡片浏览、全屏沉浸式灯箱预览与双击手势。
- **🌐 中英双语即时切换**：内置中英文本地化翻译，方便海内外创作者无缝探索。
- **⚡ 极速全网分发**：全量高清 2K 资产托管于 Cloudflare R2，搭配全球边缘缓存加速，首屏秒开。

---

## 📸 涵盖人像风格与场景

| 类别 | 风格特性 | 代表案例 |
| :--- | :--- | :--- |
| **夜景街拍 & 直闪胶片** | 35mm 胶片感、强闪光硬阴影、城市微光与超跑前景 | *Candid Nights: Embracing the City Vibe*, *Capturing Elegance* |
| **现代小酒馆 & 微醺氛围** | 佳能 IXUS 卡片机直出、高对比度闪光、吧台与玻璃杯光影 | *Charming Vibes at the Modern Pub* |
| **居家生活 & 舒适抓拍** | 奥林巴斯 μ2 暖调微光、生活感杂乱房间、编织沙发回眸 | *Charming Vintage Vibes*, *Balancing Life and Laughter* |
| **高级时装 & 自然日光** | 侧逆自然阳光、极简时装杂志 Editorial、都市户外步道 | *Breezy Elegance on the Walkway*, *Chic Coastal Vibes* |
| **电影感写真 & 黑色电影** | 30° 俯角直闪、明暗对比法（Chiaroscuro）、复古胶卷调色 | *Modern Film Noir Portrait*, *Zootopia Dreamscape* |

---

## 🛠️ 技术栈

- **框架**：[Next.js 14](https://nextjs.org/) (App Router, React 18, Server & Client Components)
- **开发语言**：[TypeScript](https://www.typescriptlang.org/)
- **样式**：[Tailwind CSS](https://tailwindcss.com/)
- **图标**：[Lucide React](https://lucide.dev/)
- **CDN / 对象存储**：[Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) (`img.iceotter.com`)
- **托管平台**：[Cloudflare Pages](https://pages.cloudflare.com/)

---

## 🚀 本地开发

### 1. 克隆代码仓库

```bash
git clone git@github.com:flowersfallen/banana-portraits.git
cd banana-portraits
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量（可选）

如需运行 R2 图像上传等自动化管理脚本，请复制并在根目录下配置 `.env.local`：

```bash
cp .env.example .env.local
```

填写以下凭证：
```env
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=your_bucket_name
R2_PUBLIC_DOMAIN=https://your-custom-domain.com
```

### 4. 启动本地开发服务

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 即可开始调试。

### 5. 构建生产包

```bash
npm run build
```

---

## 💡 提示词工程设计

本项目中每个案例的提示词均经过标准化结构处理：

```json
{
  "image_parameters": {
    "style": "Point-and-shoot camera / 35mm analog film",
    "lighting": "Direct on-camera flash / Soft natural daylight"
  },
  "subject": {
    "facial_features": "Natural skin texture, realistic pores, subtle freckles",
    "hair": "Voluminous, styled with natural strands framing the face",
    "attire": "Accurate clothing materials, fabrics, and jewelry details",
    "expression": "Poised, candid, playful or cinematic"
  },
  "environment": {
    "setting": "Specific lighting conditions, realistic indoor/outdoor background elements",
    "depth_of_field": "Realistic lens falloff"
  }
}
```

在 **Google Flow** 中使用的黄金流程：
1. 复制案例的完整提示词粘贴至 Google Flow；
2. 基础生成首张满意的人像；
3. 点击右上方 **【设为角色】** 锁定该人像特征；
4. 替换环境与动作描述，即可实现多镜头分镜与动作连续性。

---

## 🤝 贡献与反馈

欢迎提交 PR 或 Issue 来丰富案例库与优化前端交互体验：
1. Fork 本仓库；
2. 新建分支 (`git checkout -b feat/new-character-case`)；
3. 提交变更并推送 (`git commit -m 'feat: add new portrait case'` & `git push origin feat/new-character-case`)；
4. 发起 Pull Request。

---

## 📄 开源许可

本项目遵循 [MIT License](LICENSE) 协议。

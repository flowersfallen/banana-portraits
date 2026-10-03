<div align="center">

# 🍌 Banana Portraits

**Nano Banana Pro 超写实人像生图提示词灵感画廊**

[![Website](https://img.shields.io/badge/Website-banana.iceotter.com-orange?style=flat-square&logo=cloudflare)](https://banana.iceotter.com)
[![Model](https://img.shields.io/badge/Model-Nano%20Banana%20Pro-f59e0b?style=flat-square)](https://banana.iceotter.com)
[![Cases](https://img.shields.io/badge/Cases-32-emerald?style=flat-square)](https://banana.iceotter.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[🌐 访问在线画廊 (banana.iceotter.com)](https://banana.iceotter.com) • [✨ 核心特色](#-核心特性) • [📸 风格概览](#-涵盖人像风格与场景) • [💡 提示词工程](#-结构化提示词设计)

</div>

---

## 📖 About / 关于项目

> 🔗 **在线画廊地址**：**[https://banana.iceotter.com](https://banana.iceotter.com)**

**Banana Portraits** 是专为 **Nano Banana Pro** 打造的超写实人像生图提示词灵感展示库。

画廊汇集了经过实际生图验证的高质量人像案例，完整保留了纯正的摄影级光影、原生相机直出质感（如 35mm 胶片模拟、奥林巴斯 μ2、iPhone 16 Pro Max 直闪、佳能 IXUS 卡片机等）、自然细腻的皮肤纹理与真实生活细节。

作为纯粹的生图灵感画廊，项目旨在展示高质量人像提示词的标准范式，提供全结构化 Prompt 与多机位实测效果，支持一键复制提示词用于 AI 生图创作。

---

## ✨ 核心特性

- **🎯 高画质实测精选**：收录 32 组超写实摄影与生活风人像案例，每组包含多视角/多构图实测效果。
- **🧩 结构化提示词（Prompt-as-Code）**：完整提供摄影机位、光影氛围、主体面容、服装配饰与环境细节等规范化 JSON / 英文提示词。
- **📱 响应式画廊交互**：针对移动端（9:16 竖屏）专门优化，支持轻量级卡片浏览、全屏高清灯箱预览与便捷手势。
- **🌐 中英双语界面**：内置中英文本地化翻译，支持无缝即时切换。
- **⚡ 极速全网分发**：高清 2K 图像托管于 Cloudflare R2 存储桶，配备全球 CDN 边缘缓存，首屏秒开。

---

## 📸 涵盖人像风格与场景

| 风格分类 | 摄影视觉特点 | 代表案例 |
| :--- | :--- | :--- |
| **夜景街拍 & 直闪胶片** | 35mm 胶片感、强闪光硬阴影、城市微光与超跑前景 | *Candid Nights: Embracing the City Vibe*, *Capturing Elegance* |
| **现代小酒馆 & 微醺氛围** | 佳能 IXUS 卡片机直出、高对比度闪光、吧台与玻璃杯光影 | *Charming Vibes at the Modern Pub* |
| **居家生活 & 舒适抓拍** | 奥林巴斯 μ2 暖调微光、生活感真实居室、编织沙发回眸 | *Charming Vintage Vibes*, *Balancing Life and Laughter* |
| **高级时装 & 自然日光** | 侧逆自然阳光、极简时装杂志 Editorial、都市户外步道 | *Breezy Elegance on the Walkway*, *Chic Coastal Vibes* |
| **电影感写真 & 黑色电影** | 30° 俯角直闪、明暗对比法（Chiaroscuro）、复古冷调 | *Modern Film Noir Portrait*, *Zootopia Dreamscape* |

---

## 💡 结构化提示词设计

画廊中的提示词采用清晰解构的模块化规范，方便直观阅读与按需组合：

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

在画廊中浏览任意案例，点击卡片进入详情弹窗即可一键复制纯净英文 Prompt 用于生图。

---

## 🛠️ 技术栈

- **前端框架**：[Next.js 14](https://nextjs.org/) (App Router, React 18)
- **开发语言**：[TypeScript](https://www.typescriptlang.org/)
- **页面样式**：[Tailwind CSS](https://tailwindcss.com/)
- **图标系统**：[Lucide React](https://lucide.dev/)
- **存储与 CDN**：[Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) & [Cloudflare Pages](https://pages.cloudflare.com/)

---

## 📄 开源许可

本项目遵循 [MIT License](LICENSE) 协议。

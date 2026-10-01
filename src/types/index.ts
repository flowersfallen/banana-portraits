export type FlowCategory = 'character' | 'scene' | 'agent_instruction' | 'video_motion';

export type VerificationStatus = 'unverified' | 'verified';

export interface CharacterDimensions {
  country: string; // 韩国 | 日本 | 中国 | 欧美 | 其他
  gender: string;  // 女性 | 男性
  scene: string;   // 便利店 | 演唱会舞台 | 街头夜景 | 咖啡馆 | 办公室 | 运动跑道 | 海滩日落 | 赛博机甲
  outfit: string;  // 连帽卫衣 (Hoodie) | 舞台偶像装 | 运动装 | 一字肩连身裙 | 西装正装 | 战术机甲 | 复古街头
}

export interface PromptItem {
  id: string;
  title: string;
  category: FlowCategory;
  status: VerificationStatus;
  source_model: string;       // e.g. "GPT Image 2"
  target_model: string;       // e.g. "Nano Banana (Google Flow)"
  author: string;
  source_url?: string;
  preview_image: string;       // 采集的原图或缩略图
  verified_image?: string | null; // 在 Google Flow 里用 Nano Banana 实测后替换的图
  gallery_images?: string[];   // 多张实测图变体
  aspect_ratio?: string;       // 生成比例，如 "9:16"
  dimensions: CharacterDimensions;
  tags: string[];
  prompt: string;
  flow_usage_tip: string;     // 针对 Google Flow 角色绑定的实操提示
  created_at?: string;
}

export interface FilterState {
  country: string;
  gender: string;
  scene: string;
  outfit: string;
  status?: string;
  searchQuery: string;
}

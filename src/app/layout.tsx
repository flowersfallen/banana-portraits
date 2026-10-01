import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Banana Portraits - Nano Banana 超写实人像提示词灵感画廊 (Google Flow 实测)",
  description: "专为 Nano Banana 打造的超逼真写实人像提示词灵感画廊。收录 100% 真实质感东亚与全球人像提示词，所有案例均在 Google Flow 中实测生成与验证。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen bg-[#faf9f7] text-neutral-900">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

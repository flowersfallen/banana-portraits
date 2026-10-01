import React from "react";
import { Camera, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { locale, setLocale, dict } = useLanguage();

  return (
    <header className="border-b border-neutral-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
      <div className="mx-auto max-w-[1936px] px-3.5 py-2.5 sm:px-8 sm:py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 shrink-0">
            <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-xl font-bold tracking-tight text-neutral-950">
                {dict.header.title}
              </span>
              <span className="hidden sm:inline-block rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-orange-700">
                {dict.header.badge}
              </span>
            </div>
            <p className="text-xs text-neutral-500 hidden sm:block">
              {dict.header.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="flex items-center rounded-full bg-neutral-100 p-0.5 sm:p-1 border border-neutral-200 text-xs">
            <button
              onClick={() => setLocale("zh")}
              className={`flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-medium transition text-[11px] sm:text-xs ${
                locale === "zh"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <span>中</span>
            </button>
            <button
              onClick={() => setLocale("en")}
              className={`flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-medium transition text-[11px] sm:text-xs ${
                locale === "en"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <span>EN</span>
            </button>
          </div>

          <a
            href="https://flow.google.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-neutral-950 px-2.5 sm:px-4 py-1.5 text-xs font-medium text-white hover:bg-neutral-800 transition shadow-sm shrink-0"
          >
            <span className="sm:hidden">Flow</span>
            <span className="hidden sm:inline">{dict.header.openFlowBtn}</span>
            <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};

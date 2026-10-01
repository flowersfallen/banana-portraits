import React, { useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";
import { PromptItem } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface PromptCardProps {
  item: PromptItem;
  onSelect: (item: PromptItem) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ item, onSelect }) => {
  const { dict, translateTag } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayImage = item.verified_image || item.preview_image;

  return (
    <div
      onClick={() => onSelect(item)}
      className="group relative cursor-pointer break-inside-avoid rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col mb-3 sm:mb-4"
    >
      {/* Image Container */}
      <div className="relative w-full overflow-hidden bg-neutral-100 aspect-[3/4]">
        <img
          src={displayImage}
          alt={item.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quick Copy Button (Top-Right) */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition duration-200">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-full bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium text-white hover:bg-neutral-900 transition shadow-md"
            title={dict.card.copy}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-400" />
                <span className="text-emerald-300 text-[10px] sm:text-xs">{dict.card.copied}</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="text-[10px] sm:text-xs">{dict.card.copy}</span>
              </>
            )}
          </button>
        </div>

        {/* Hover Dark Gradient Overlay (Desktop Only) */}
        <div className="hidden sm:flex absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col justify-end p-4 text-white pointer-events-none">
          <p className="line-clamp-3 text-xs leading-relaxed text-white/90 font-mono">
            {item.prompt}
          </p>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-white/70">
            <span>{dict.card.hoverTip}</span>
            <Sparkles className="h-3.5 w-3.5 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Card Metadata Footer */}
      <div className="p-2.5 sm:p-3.5 flex flex-col gap-1.5 sm:gap-2">
        <h3 className="font-semibold text-xs sm:text-sm text-neutral-900 line-clamp-1 group-hover:text-orange-600 transition">
          {item.title}
        </h3>

        {/* Dimension Chips */}
        <div className="flex flex-wrap gap-1">
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-neutral-600">
            {translateTag(item.dimensions.country)}
          </span>
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-neutral-600">
            {translateTag(item.dimensions.gender)}
          </span>
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-neutral-600">
            {translateTag(item.dimensions.scene)}
          </span>
          <span className="rounded bg-orange-50 text-orange-700 border border-orange-200/50 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-medium">
            {translateTag(item.dimensions.outfit)}
          </span>
        </div>

        {/* Model Spec & Aspect Ratio */}
        <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[10px] sm:text-[11px]">
          <span className="font-medium text-neutral-700 truncate mr-1">
            {item.target_model || "Nano Banana Pro"}
          </span>
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-mono text-neutral-600 shrink-0">
            {item.aspect_ratio || "9:16"}
          </span>
        </div>
      </div>
    </div>
  );
};

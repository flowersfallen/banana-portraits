import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { PromptItem } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface PromptDetailModalProps {
  item: PromptItem | null;
  onClose: () => void;
}

export const PromptDetailModal: React.FC<PromptDetailModalProps> = ({
  item,
  onClose,
}) => {
  const { dict, translateTag } = useLanguage();
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);

  if (!item) return null;

  const defaultImage = item.verified_image || item.preview_image;
  const displayImage = activeImage || defaultImage;

  const copyToClipboard = (
    text: string,
    setCopied: (v: boolean) => void
  ) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Fullscreen Image Lightbox Preview (Tap to see 100% full-screen detail) */}
      {isFullscreen && (
        <div
          onClick={() => setIsFullscreen(false)}
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-2 cursor-zoom-out"
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/20 hover:bg-white/30 p-2 text-white transition backdrop-blur-md"
            title="退出全屏"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={displayImage}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="max-h-[95vh] max-w-[95vw] object-contain select-none"
            />
          </div>
          {item.gallery_images && item.gallery_images.length > 1 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20"
            >
              {item.gallery_images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-9 h-12 rounded-md overflow-hidden border-2 transition ${
                    displayImage === img
                      ? "border-orange-500 scale-105"
                      : "border-white/30 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Detail Modal */}
      <div
        onClick={() => {
          setActiveImage(null);
          onClose();
        }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-6 overflow-y-auto"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl overflow-y-auto md:overflow-hidden border border-neutral-200/90 flex flex-col md:flex-row max-h-[94vh] sm:max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              setActiveImage(null);
              onClose();
            }}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 z-30 rounded-full bg-black/50 sm:bg-white/90 text-white sm:text-neutral-600 backdrop-blur-md p-1.5 sm:p-2 hover:bg-black/70 sm:hover:bg-neutral-100 hover:text-white sm:hover:text-neutral-900 transition shadow-md"
            title="关闭"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Left Side: Large Image Preview Showcase */}
          <div className="md:w-1/2 bg-neutral-950 sm:bg-[#fcfbfa] border-b md:border-b-0 md:border-r border-neutral-200/80 flex flex-col items-center justify-center p-2 sm:p-8 shrink-0 relative overflow-hidden">
            {/* Click to expand hint for mobile */}
            <div
              onClick={() => setIsFullscreen(true)}
              className="relative flex flex-col items-center justify-center w-full cursor-zoom-in group"
            >
              <div className="relative flex items-center justify-center w-full min-h-[260px] sm:min-h-[360px]">
                {/* Skeleton loader while high-res image is downloading */}
                {!modalImageLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900/80 rounded-xl sm:rounded-2xl animate-pulse">
                    <div className="h-7 w-7 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin mb-2" />
                    <span className="text-[11px] text-neutral-400 font-medium tracking-wide">高清大图加载中...</span>
                  </div>
                )}
                <img
                  key={displayImage}
                  src={displayImage}
                  alt=""
                  aria-label={item.title}
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onLoad={() => setModalImageLoaded(true)}
                  className={`max-h-[56vh] sm:max-h-[460px] w-auto max-w-full object-contain rounded-xl sm:rounded-2xl shadow-xl border border-white/10 sm:border-neutral-200/80 transition-all duration-300 ${
                    modalImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                />
                {/* Floating Fullscreen Hint Badge */}
                {modalImageLoaded && (
                  <span className="absolute bottom-2.5 right-2.5 sm:hidden inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] text-white/90 border border-white/20">
                    点击放大
                  </span>
                )}
              </div>

              {/* Multi-image Thumbnail Strip (If multiple verified images exist) */}
              {item.gallery_images && item.gallery_images.length > 1 && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-4 z-10 no-scrollbar overflow-x-auto max-w-full py-1"
                >
                  {item.gallery_images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`w-9 h-12 sm:w-11 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden border-2 transition shrink-0 ${
                        displayImage === img
                          ? "border-orange-500 scale-105 shadow-md ring-2 ring-orange-400"
                          : "border-white/30 sm:border-neutral-200/90 opacity-70 hover:opacity-100 hover:border-neutral-400 bg-white"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Variant ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        {/* Right Side: Details & Actions */}
        <div className="md:w-1/2 p-4 sm:p-6 overflow-y-auto flex flex-col gap-3.5 sm:gap-5 text-neutral-800">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              {/* Generation Info: Model */}
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 text-neutral-700 px-2.5 py-1 text-xs">
                <span className="text-neutral-500">{dict.modal.modelLabel}</span>
                <strong className="font-semibold text-neutral-900">{item.target_model || "Nano Banana Pro"}</strong>
              </span>

              {/* Generation Info: Aspect Ratio */}
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 text-neutral-700 px-2.5 py-1 text-xs">
                <span className="text-neutral-500">{dict.modal.ratioLabel}</span>
                <strong className="font-semibold text-neutral-900">{item.aspect_ratio || "9:16"}</strong>
              </span>
            </div>

            <h2 className="text-xl font-bold text-neutral-950">{item.title}</h2>

            {/* Source URL with clean ellipsis truncation */}
            {item.source_url && (
              <div className="flex items-center gap-2 mt-2.5 text-xs text-neutral-600 min-w-0">
                <span className="text-neutral-500 shrink-0 font-medium">{dict.modal.source}:</span>
                <a
                  href={item.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-orange-600 hover:text-orange-700 hover:underline font-mono text-xs bg-orange-50/80 hover:bg-orange-100/80 px-2.5 py-1 rounded-lg border border-orange-200/70 transition min-w-0 max-w-[240px] sm:max-w-[280px]"
                  title={item.source_url}
                >
                  <span className="truncate">{item.source_url}</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                </a>
              </div>
            )}
          </div>

          {/* 4D Dimension Attributes Grid */}
          <div className="grid grid-cols-2 gap-2 bg-neutral-50 p-3 rounded-xl border border-neutral-200/70 text-xs">
            <div>
              <span className="text-neutral-500">{dict.modal.region}</span>
              <span className="font-semibold text-neutral-900 ml-1">
                {translateTag(item.dimensions.country)}
              </span>
            </div>
            <div>
              <span className="text-neutral-500">{dict.modal.gender}</span>
              <span className="font-semibold text-neutral-900 ml-1">
                {translateTag(item.dimensions.gender)}
              </span>
            </div>
            <div>
              <span className="text-neutral-500">{dict.modal.scene}</span>
              <span className="font-semibold text-neutral-900 ml-1">
                {translateTag(item.dimensions.scene)}
              </span>
            </div>
            <div>
              <span className="text-neutral-500">{dict.modal.outfit}</span>
              <span className="font-semibold text-neutral-900 ml-1">
                {translateTag(item.dimensions.outfit)}
              </span>
            </div>
          </div>

          {/* Full Prompt Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
              <span>{dict.modal.promptTitle}</span>
              <span className="text-neutral-400 font-normal">{dict.modal.promptSub}</span>
            </div>
            <div className="relative rounded-xl bg-neutral-900 p-3.5 text-xs text-neutral-200 font-mono leading-relaxed border border-neutral-800">
              <p className="max-h-40 overflow-y-auto pr-2 whitespace-pre-wrap dark-scrollbar">
                {item.prompt}
              </p>
            </div>
          </div>

          {/* Action Copy Button */}
          <div className="pt-1 sticky bottom-0 bg-white/95 backdrop-blur-sm pb-1 sm:pb-0 z-20">
            <button
              onClick={() => copyToClipboard(item.prompt, setCopiedPrompt)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition shadow-sm active:scale-[0.99]"
            >
              {copiedPrompt ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">{dict.modal.copiedPrompt}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>{dict.modal.copyPrompt}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

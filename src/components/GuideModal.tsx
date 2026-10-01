import React from "react";
import { X, Sparkles, UserCheck, Video, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const { dict } = useLanguage();

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl p-6 sm:p-8 border border-neutral-200"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-neutral-100 p-2 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-950">
              {dict.guideModal.title}
            </h2>
            <p className="text-xs text-neutral-500">
              {dict.guideModal.subtitle}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <div className="flex gap-3 p-3.5 rounded-xl bg-orange-50 border border-orange-200/70">
            <UserCheck className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-orange-950 block mb-1">
                {dict.guideModal.step1Title}
              </strong>
              {dict.guideModal.step1Desc}
            </div>
          </div>

          <div className="flex gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
            <ShieldCheck className="h-5 w-5 text-neutral-800 shrink-0 mt-0.5" />
            <div>
              <strong className="text-neutral-950 block mb-1">
                {dict.guideModal.step2Title}
              </strong>
              {dict.guideModal.step2Desc}
            </div>
          </div>

          <div className="flex gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
            <Video className="h-5 w-5 text-neutral-800 shrink-0 mt-0.5" />
            <div>
              <strong className="text-neutral-950 block mb-1">
                {dict.guideModal.step3Title}
              </strong>
              {dict.guideModal.step3Desc}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs">
            <strong>{dict.guideModal.statusNoteTitle}</strong>
            <p className="mt-1 leading-relaxed">
              {dict.guideModal.statusNoteDesc}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-full bg-neutral-950 px-6 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition"
          >
            {dict.guideModal.gotIt}
          </button>
        </div>
      </div>
    </div>
  );
};

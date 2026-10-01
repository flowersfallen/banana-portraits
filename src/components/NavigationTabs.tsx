import React from "react";
import { UserRound, Clapperboard, Bot, Video } from "lucide-react";
import { FlowCategory } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface NavigationTabsProps {
  activeCategory: FlowCategory;
  onSelectCategory: (category: FlowCategory) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const { dict } = useLanguage();

  const tabs = [
    {
      id: "character" as FlowCategory,
      label: dict.tabs.character,
      desc: dict.tabs.characterDesc,
      icon: UserRound,
      badge: dict.tabs.badgeActive,
      enabled: true,
    },
    {
      id: "scene" as FlowCategory,
      label: dict.tabs.scene,
      desc: dict.tabs.sceneDesc,
      icon: Clapperboard,
      badge: dict.tabs.badgeComingSoon,
      enabled: false,
    },
    {
      id: "agent_instruction" as FlowCategory,
      label: dict.tabs.agent_instruction,
      desc: dict.tabs.agent_instructionDesc,
      icon: Bot,
      badge: dict.tabs.badgePreparing,
      enabled: false,
    },
    {
      id: "video_motion" as FlowCategory,
      label: dict.tabs.video_motion,
      desc: dict.tabs.video_motionDesc,
      icon: Video,
      badge: dict.tabs.badgePreparing,
      enabled: false,
    },
  ];

  return (
    <div className="border-b border-neutral-200/90 bg-white/40">
      <div className="mx-auto max-w-[1936px] px-5 sm:px-8">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => tab.enabled && onSelectCategory(tab.id)}
                disabled={!tab.enabled}
                className={`group relative flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium transition shrink-0 ${
                  isActive
                    ? "bg-neutral-950 text-white shadow-sm"
                    : tab.enabled
                    ? "bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200/80"
                    : "bg-neutral-100/60 text-neutral-400 cursor-not-allowed border border-dashed border-neutral-200"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-orange-400" : ""}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-normal ${
                    isActive
                      ? "bg-white/20 text-orange-200"
                      : tab.enabled
                      ? "bg-orange-50 text-orange-700"
                      : "bg-neutral-200/80 text-neutral-500"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

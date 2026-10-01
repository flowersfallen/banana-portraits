"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { PromptCard } from "@/components/PromptCard";
import { PromptDetailModal } from "@/components/PromptDetailModal";
import { FilterState, PromptItem } from "@/types";
import rawCharactersData from "@/data/characters.json";
import { Sparkles, Layers } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { dict } = useLanguage();
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    country: "全部",
    gender: "全部",
    scene: "全部",
    outfit: "全部",
    searchQuery: "",
  });

  const allPrompts = rawCharactersData as PromptItem[];

  // Filter Logic
  const filteredPrompts = useMemo(() => {
    return allPrompts.filter((item) => {
      // Dimensions filters
      if (filters.country !== "全部" && item.dimensions.country !== filters.country)
        return false;
      if (filters.gender !== "全部" && item.dimensions.gender !== filters.gender)
        return false;
      if (filters.scene !== "全部" && item.dimensions.scene !== filters.scene)
        return false;
      if (filters.outfit !== "全部" && item.dimensions.outfit !== filters.outfit)
        return false;

      // Search query filter
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesPrompt = item.prompt.toLowerCase().includes(query);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(query));
        const matchesAuthor = item.author.toLowerCase().includes(query);
        const matchesOutfit = item.dimensions.outfit.toLowerCase().includes(query);
        const matchesScene = item.dimensions.scene.toLowerCase().includes(query);

        if (
          !matchesTitle &&
          !matchesPrompt &&
          !matchesTags &&
          !matchesAuthor &&
          !matchesOutfit &&
          !matchesScene
        ) {
          return false;
        }
      }

      return true;
    });
  }, [allPrompts, filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      country: "全部",
      gender: "全部",
      scene: "全部",
      outfit: "全部",
      searchQuery: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7]">
      {/* Top Header */}
      <Header />

      {/* Hero Section */}
      <section className="mx-auto max-w-[1936px] px-3.5 sm:px-8 pt-4 sm:pt-8 pb-2 sm:pb-4 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50/80 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-orange-800 shadow-sm mb-2 sm:mb-3">
          <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-orange-600" />
          <span>{dict.hero.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 max-w-4xl mx-auto leading-tight">
          {dict.hero.titlePrefix}
          <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent ml-1.5 sm:ml-2">
            {dict.hero.titleHighlight}
          </span>
        </h1>
        <p className="mt-2 sm:mt-3.5 max-w-2xl mx-auto text-xs sm:text-base text-neutral-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
          {dict.hero.subtitle}
        </p>
      </section>

      {/* Filter and Gallery Section */}
      <main className="mx-auto max-w-[1936px] px-3.5 sm:px-8 flex-1 pb-16 w-full">
        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          totalCount={allPrompts.length}
          filteredCount={filteredPrompts.length}
          allPrompts={allPrompts}
        />

        {/* Masonry Waterfall Gallery Grid */}
        {filteredPrompts.length > 0 ? (
          <div className="mt-4 sm:mt-6 columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 [column-fill:_balance]">
            {filteredPrompts.map((item) => (
              <PromptCard
                key={item.id}
                item={item}
                onSelect={(selected) => setSelectedPrompt(selected)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center py-16 px-4 bg-white rounded-3xl border border-neutral-200/80 max-w-md mx-auto shadow-sm">
            <Layers className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-neutral-900">
              {dict.empty.title}
            </h3>
            <p className="text-xs text-neutral-500 mt-1.5">
              {dict.empty.desc}
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-4 py-2 text-xs font-medium text-white hover:bg-neutral-800 transition"
            >
              {dict.empty.resetBtn}
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      <PromptDetailModal
        item={selectedPrompt}
        onClose={() => setSelectedPrompt(null)}
      />
    </div>
  );
}

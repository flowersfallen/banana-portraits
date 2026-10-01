import React, { useState } from "react";
import { Search, RotateCcw, SlidersHorizontal } from "lucide-react";
import { FilterState, PromptItem } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
  allPrompts?: PromptItem[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalCount,
  filteredCount,
  allPrompts = [],
}) => {
  const { dict, translateTag } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const countries = React.useMemo(() => {
    const set = new Set(allPrompts.map((p) => p.dimensions.country).filter(Boolean));
    return ["全部", ...Array.from(set)];
  }, [allPrompts]);

  const genders = React.useMemo(() => {
    const set = new Set(allPrompts.map((p) => p.dimensions.gender).filter(Boolean));
    return ["全部", ...Array.from(set)];
  }, [allPrompts]);

  const scenes = React.useMemo(() => {
    const set = new Set(allPrompts.map((p) => p.dimensions.scene).filter(Boolean));
    return ["全部", ...Array.from(set)];
  }, [allPrompts]);

  const outfits = React.useMemo(() => {
    const set = new Set(allPrompts.map((p) => p.dimensions.outfit).filter(Boolean));
    return ["全部", ...Array.from(set)];
  }, [allPrompts]);

  const activeDimensionsCount = [
    filters.country,
    filters.gender,
    filters.scene,
    filters.outfit,
  ].filter((x) => x !== "全部").length;

  const hasActiveFilters =
    activeDimensionsCount > 0 || filters.searchQuery !== "";

  return (
    <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4 pb-2">
      {/* Search Input & Mobile Filter Toggle */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder={dict.filters.searchPlaceholder}
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full rounded-full border border-neutral-200/90 bg-white py-2 sm:py-2.5 pl-10 sm:pl-11 pr-4 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200/60 shadow-sm"
          />
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`sm:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-medium transition shrink-0 ${
            isExpanded || activeDimensionsCount > 0
              ? "bg-neutral-950 text-white border-neutral-950 shadow-sm"
              : "bg-white text-neutral-700 border-neutral-200/90 hover:bg-neutral-100"
          }`}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>{dict.filters.dimensionRegion ? "筛选" : "Filter"}</span>
          {activeDimensionsCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center font-bold">
              {activeDimensionsCount}
            </span>
          )}
        </button>
      </div>

      {/* 4D Multi-dimension filter rows */}
      <div
        className={`${
          isExpanded ? "block" : "hidden"
        } sm:block rounded-2xl border border-neutral-200/80 bg-white p-3 sm:p-4 shadow-sm space-y-2.5 sm:space-y-3 transition-all`}
      >
        {/* Country / Region */}
        <div className="flex items-center gap-2 text-xs">
          <span className="w-20 font-semibold text-neutral-500 shrink-0">
            {dict.filters.dimensionRegion}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {countries.map((item) => (
              <button
                key={item}
                onClick={() => onFilterChange({ country: item })}
                className={`px-3 py-1 rounded-full transition text-xs ${
                  filters.country === item
                    ? "bg-neutral-950 text-white font-medium shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {item === "全部" ? dict.filters.all : translateTag(item)}
              </button>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div className="flex items-center gap-2 text-xs">
          <span className="w-20 font-semibold text-neutral-500 shrink-0">
            {dict.filters.dimensionGender}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {genders.map((item) => (
              <button
                key={item}
                onClick={() => onFilterChange({ gender: item })}
                className={`px-3 py-1 rounded-full transition text-xs ${
                  filters.gender === item
                    ? "bg-neutral-950 text-white font-medium shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {item === "全部" ? dict.filters.all : translateTag(item)}
              </button>
            ))}
          </div>
        </div>

        {/* Scene */}
        <div className="flex items-center gap-2 text-xs">
          <span className="w-20 font-semibold text-neutral-500 shrink-0">
            {dict.filters.dimensionScene}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {scenes.map((item) => (
              <button
                key={item}
                onClick={() => onFilterChange({ scene: item })}
                className={`px-3 py-1 rounded-full transition text-xs ${
                  filters.scene === item
                    ? "bg-neutral-950 text-white font-medium shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {item === "全部" ? dict.filters.all : translateTag(item)}
              </button>
            ))}
          </div>
        </div>

        {/* Outfit */}
        <div className="flex items-center gap-2 text-xs">
          <span className="w-20 font-semibold text-neutral-500 shrink-0">
            {dict.filters.dimensionOutfit}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {outfits.map((item) => (
              <button
                key={item}
                onClick={() => onFilterChange({ outfit: item })}
                className={`px-3 py-1 rounded-full transition text-xs ${
                  filters.outfit === item
                    ? "bg-neutral-950 text-white font-medium shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {item === "全部" ? dict.filters.all : translateTag(item)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter summary bar */}
      <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
        <div>
          {dict.filters.foundResults} <span className="font-semibold text-neutral-900">{filteredCount}</span> {dict.filters.matchingPrompts}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium"
          >
            <RotateCcw className="h-3 w-3" />
            <span>{dict.filters.reset}</span>
          </button>
        )}
      </div>
    </div>
  );
};

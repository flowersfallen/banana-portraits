"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, translations } from "@/i18n/translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: typeof translations.zh;
  translateTag: (tag: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocaleState] = useState<Locale>("zh");

  useEffect(() => {
    // Check saved preference or browser language
    const saved = localStorage.getItem("flow_gallery_lang") as Locale | null;
    if (saved === "zh" || saved === "en") {
      setLocaleState(saved);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("zh")) {
        setLocaleState("zh");
      } else {
        setLocaleState("en");
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("flow_gallery_lang", newLocale);
  };

  const dict = translations[locale];

  const translateTag = (tag: string) => {
    if (locale === "zh") return tag;
    return dict.dimensionsMap[tag] || tag;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, dict, translateTag }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

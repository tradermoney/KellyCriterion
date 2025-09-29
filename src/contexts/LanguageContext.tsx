import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { getTranslation } from '../i18n';

// 临时定义 Language 类型
export type Language = 'zh' | 'en';

// 临时定义 Translation 接口
export interface Translation {
  title: string;
  subtitle: string;
  description: string;
  initialCapital: string;
  winRate: string;
  odds: string;
  calculate: string;
  result: string;
  optimalKelly: string;
  recommendedRatio: string;
  riskWarning: string;
  readyToStart: string;
  setParametersAndStart: string;
  language: string;
  darkMode: string;
  lightMode: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLanguage = 'zh'
}) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const t = getTranslation(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
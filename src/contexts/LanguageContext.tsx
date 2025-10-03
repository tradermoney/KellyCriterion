import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getTranslation } from '../i18n';
import { storage, STORAGE_KEYS } from '../utils/storage';

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
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [isLoaded, setIsLoaded] = useState(false);
  const t = getTranslation(language);

  // 初始化：从 IndexedDB 加载语言
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await storage.getItem<Language>(STORAGE_KEYS.LANGUAGE);
        if (savedLanguage) {
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.error('加载语言设置失败:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadLanguage();
  }, []);

  // 保存语言设置到 IndexedDB
  useEffect(() => {
    if (!isLoaded) return;
    storage.setItem(STORAGE_KEYS.LANGUAGE, language);
  }, [language, isLoaded]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

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
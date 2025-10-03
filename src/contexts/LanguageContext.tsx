import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { translations } from '../i18n/translations';
import type { Language } from '../i18n/translations';
import { storage, STORAGE_KEYS } from '../utils/storage';

type TranslationValues = typeof translations.zh;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationValues;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// 检测浏览器语言
const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage;

  // 如果是中文相关的语言代码，返回 zh
  if (browserLang && browserLang.toLowerCase().startsWith('zh')) {
    return 'zh';
  }
  
  // 默认返回英文
  return 'en';
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('zh'); // 默认中文
  const [isLoaded, setIsLoaded] = useState(false);

  // 初始化：从 IndexedDB 加载语言，如果没有则检测浏览器语言
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await storage.getItem<Language>(STORAGE_KEYS.LANGUAGE);
        
        if (savedLanguage) {
          // 使用保存的语言
          setLanguageState(savedLanguage);
        } else {
          // 没有保存的语言，检测浏览器语言
          const detectedLanguage = detectBrowserLanguage();
          setLanguageState(detectedLanguage);
          // 保存检测到的语言
          await storage.setItem(STORAGE_KEYS.LANGUAGE, detectedLanguage);
        }
      } catch (error) {
        console.error('加载语言设置失败:', error);
        // 发生错误时使用检测到的浏览器语言
        setLanguageState(detectBrowserLanguage());
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

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

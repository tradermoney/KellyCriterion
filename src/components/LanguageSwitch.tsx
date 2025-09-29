import React from 'react';
import { Globe } from 'lucide-react';
import { getSupportedLanguages } from '../i18n';
import type { Language } from '../contexts/LanguageContext';

interface LanguageSwitchProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  const languages = getSupportedLanguages();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-gray-600" />
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};
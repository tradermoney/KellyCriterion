import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HelpTooltipProps {
  helpKey?: string;
  content?: string;
  className?: string;
}

export const HelpTooltip: React.FC<HelpTooltipProps> = ({ helpKey, content, className = '' }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  // 优先使用content属性，如果没有则使用helpKey从翻译系统中获取
  const helpText = content || (helpKey ? t.help?.[helpKey as keyof typeof t.help] : '') || '帮助信息未找到';

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors duration-200"
        aria-label="帮助信息"
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg z-50 text-sm">
          <div className="text-slate-700 dark:text-slate-300 leading-relaxed">{helpText}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white dark:border-t-slate-800"></div>
        </div>
      )}
    </div>
  );
};
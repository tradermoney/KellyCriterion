// 语言类型定义
export type Language = 'zh' | 'en';

// 翻译接口定义
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

// 翻译数据
export const translations: Record<Language, Translation> = {
  zh: {
    title: "凯利公式计算器",
    subtitle: "基于凯利公式计算最优投资比例",
    description: "基于凯利公式计算最优投资比例",
    initialCapital: "初始资金",
    winRate: "胜率 (%)",
    odds: "赔率",
    calculate: "计算",
    result: "计算结果",
    optimalKelly: "最优凯利比例",
    recommendedRatio: "建议投资比例",
    riskWarning: "⚠️ 风险提示：凯利公式假设已知胜率和赔率，实际投资请谨慎使用",
    readyToStart: "准备开始仿真",
    setParametersAndStart: "设置参数并点击开始按钮",
    language: "语言",
    darkMode: "暗色模式",
    lightMode: "亮色模式"
  },
  en: {
    title: "Kelly Formula Calculator",
    subtitle: "Calculate optimal investment ratio based on Kelly Formula",
    description: "Calculate optimal investment ratio based on Kelly Formula",
    initialCapital: "Initial Capital",
    winRate: "Win Rate (%)",
    odds: "Odds",
    calculate: "Calculate",
    result: "Result",
    optimalKelly: "Optimal Kelly Ratio",
    recommendedRatio: "Recommended Investment Ratio",
    riskWarning: "⚠️ Risk Warning: Kelly formula assumes known win rate and odds. Please use with caution in actual investment",
    readyToStart: "Ready to Start Simulation",
    setParametersAndStart: "Set parameters and click start button",
    language: "Language",
    darkMode: "Dark Mode",
    lightMode: "Light Mode"
  }
};

// 获取翻译函数
export function getTranslation(language: Language): Translation {
  return translations[language];
}

// 获取支持的语言列表
export function getSupportedLanguages(): {code: Language, name: string}[] {
  return [
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' }
  ];
}
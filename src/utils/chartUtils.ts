import type { StrategyConfig } from '../types/simulation';
import type { StrategyType } from '../types/simulation';

/**
 * 获取策略名称的辅助函数
 * 用于在没有React上下文的地方获取策略名称
 */
export const getStrategyName = (type: StrategyType, strategyNames?: Record<StrategyType, string>): string => {
  if (strategyNames && strategyNames[type]) {
    return strategyNames[type];
  }
  // 默认中文名称（向后兼容）
  const defaultNames: Record<string, string> = {
    kelly: '凯利',
    fractionalKelly: '分数凯利',
    fixedFraction: '固定比例',
    fixedStake: '固定注金',
    paroli: '帕罗利',
    martingale: '马丁格尔'
  };
  return defaultNames[type] || type;
};

/**
 * 生成高对比度的颜色方案
 * 使用HSL色彩空间确保颜色之间有足够的区分度
 */
export const generateHighContrastColors = (count: number): string[] => {
  const colors: string[] = [];
  
  for (let i = 0; i < count; i++) {
    // 使用HSL色彩空间，确保色相均匀分布
    const hue = (i * 360) / count;
    
    // 交替使用高饱和度和中等饱和度，以及不同的亮度
    const saturation = i % 2 === 0 ? 80 : 70;
    const lightness = i % 3 === 0 ? 50 : (i % 3 === 1 ? 60 : 40);
    
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  
  return colors;
};

/**
 * 生成策略显示名称，包含参数信息
 */
export const generateStrategyDisplayName = (
  strategy: StrategyConfig, 
  index: number,
  strategyNames?: Record<StrategyType, string>,
  strategyLabel: string = '策略'
): string => {
  const baseName = getStrategyName(strategy.type, strategyNames);
  const params = strategy.params;
  
  if (!params || Object.keys(params).length === 0) {
    return `${strategyLabel}${index + 1}: ${baseName}`;
  }
  
  const paramStrings: string[] = [];
  
  if (params.alpha !== undefined) {
    paramStrings.push(`α=${params.alpha}`);
  }
  if (params.fFixed !== undefined) {
    paramStrings.push(`f=${params.fFixed}`);
  }
  if (params.k !== undefined) {
    paramStrings.push(`k=${params.k}`);
  }
  if (params.base !== undefined) {
    paramStrings.push(`base=${params.base}`);
  }
  if (params.r !== undefined) {
    paramStrings.push(`r=${params.r}`);
  }
  
  const paramStr = paramStrings.length > 0 ? `(${paramStrings.join(', ')})` : '';
  
  return `${strategyLabel}${index + 1}: ${baseName}${paramStr}`;
};

/**
 * 生成策略的简短显示名称（用于图例）
 */
export const generateStrategyShortName = (
  strategy: StrategyConfig, 
  _index: number,
  strategyNames?: Record<StrategyType, string>
): string => {
  const baseName = getStrategyName(strategy.type, strategyNames);
  const params = strategy.params;
  
  if (!params || Object.keys(params).length === 0) {
    return `${baseName}`;
  }
  
  const paramStrings: string[] = [];
  
  if (params.alpha !== undefined) {
    paramStrings.push(`α=${params.alpha}`);
  }
  if (params.fFixed !== undefined) {
    paramStrings.push(`f=${params.fFixed}`);
  }
  if (params.k !== undefined) {
    paramStrings.push(`k=${params.k}`);
  }
  if (params.base !== undefined) {
    paramStrings.push(`base=${params.base}`);
  }
  if (params.r !== undefined) {
    paramStrings.push(`r=${params.r}`);
  }
  
  const paramStr = paramStrings.length > 0 ? `(${paramStrings.join(', ')})` : '';
  
  return `${baseName}${paramStr}`;
};

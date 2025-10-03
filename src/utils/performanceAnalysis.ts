import type { StrategySummary, PathStats } from '../types/simulation';

export interface PerformanceMetrics {
  // 基础指标
  totalReturn: number;           // 总收益率
  annualizedReturn: number;      // 年化收益率
  volatility: number;            // 波动率
  sharpeRatio: number;           // 夏普比率
  sortinoRatio: number;          // 索提诺比率
  
  // 风险指标
  maxDrawdown: number;           // 最大回撤
  maxDrawdownDuration: number;   // 最大回撤持续时间
  var95: number;               // 95% VaR
  var99: number;               // 99% VaR
  cvar95: number;              // 95% CVaR
  cvar99: number;              // 99% CVaR
  
  // 胜率指标
  winRate: number;              // 胜率
  profitFactor: number;         // 盈利因子
  averageWin: number;          // 平均盈利
  averageLoss: number;         // 平均亏损
  winLossRatio: number;        // 盈亏比
  
  // 分布指标
  skewness: number;            // 偏度
  kurtosis: number;            // 峰度
  percentile5: number;         // 5%分位数
  percentile25: number;        // 25%分位数
  percentile75: number;        // 75%分位数
  percentile95: number;        // 95%分位数
}

export interface RiskReturnPoint {
  strategy: string;
  return: number;
  risk: number;
  sharpe: number;
  maxDrawdown: number;
  color: string;
}

/**
 * 计算单个策略的绩效指标
 */
export function calculatePerformanceMetrics(
  summary: StrategySummary,
  _rounds: number
): PerformanceMetrics {
  const paths = summary.paths || [];
  if (paths.length === 0) {
    return createEmptyMetrics();
  }

  // 计算最终财富的统计指标
  const finalWealths = paths.map(p => p.finalWealth);
  const logReturns = paths.map(p => p.logWealth);
  
  // 基础统计
  const meanFinal = summary.meanFinal;
  const totalReturn = (meanFinal - 1) / 1; // 假设初始资金为1
  const annualizedReturn = Math.pow(1 + totalReturn, 1) - 1; // 简化计算
  
  // 波动率计算
  const volatility = calculateVolatility(logReturns);
  
  // 夏普比率 (假设无风险利率为0)
  const sharpeRatio = volatility > 0 ? annualizedReturn / volatility : 0;
  
  // 索提诺比率 (只考虑下行波动)
  const sortinoRatio = calculateSortinoRatio(logReturns, annualizedReturn);
  
  // 最大回撤
  const maxDrawdown = summary.meanMDD;
  
  // VaR和CVaR计算
  const var95 = calculateVaR(finalWealths, 0.05);
  const var99 = calculateVaR(finalWealths, 0.01);
  const cvar95 = calculateCVaR(finalWealths, 0.05);
  const cvar99 = calculateCVaR(finalWealths, 0.01);
  
  // 胜率相关指标
  const winRate = calculateWinRate(paths);
  const profitFactor = calculateProfitFactor(paths);
  const { averageWin, averageLoss, winLossRatio } = calculateWinLossMetrics(paths);
  
  // 分布指标
  const sortedWealths = [...finalWealths].sort((a, b) => a - b);
  const skewness = calculateSkewness(finalWealths);
  const kurtosis = calculateKurtosis(finalWealths);
  
  return {
    totalReturn,
    annualizedReturn,
    volatility,
    sharpeRatio,
    sortinoRatio,
    maxDrawdown,
    maxDrawdownDuration: 0, // 简化实现
    var95,
    var99,
    cvar95,
    cvar99,
    winRate,
    profitFactor,
    averageWin,
    averageLoss,
    winLossRatio,
    skewness,
    kurtosis,
    percentile5: sortedWealths[Math.floor(sortedWealths.length * 0.05)],
    percentile25: sortedWealths[Math.floor(sortedWealths.length * 0.25)],
    percentile75: sortedWealths[Math.floor(sortedWealths.length * 0.75)],
    percentile95: sortedWealths[Math.floor(sortedWealths.length * 0.95)]
  };
}

/**
 * 计算风险收益散点图数据
 */
export function calculateRiskReturnPoints(
  summaries: StrategySummary[],
  colors: string[]
): RiskReturnPoint[] {
  return summaries.map((summary, index) => {
    const metrics = calculatePerformanceMetrics(summary, 100); // 假设100轮
    return {
      strategy: `策略${index + 1}`,
      return: metrics.annualizedReturn,
      risk: metrics.volatility,
      sharpe: metrics.sharpeRatio,
      maxDrawdown: metrics.maxDrawdown,
      color: colors[index]
    };
  });
}

// 辅助函数
function createEmptyMetrics(): PerformanceMetrics {
  return {
    totalReturn: 0,
    annualizedReturn: 0,
    volatility: 0,
    sharpeRatio: 0,
    sortinoRatio: 0,
    maxDrawdown: 0,
    maxDrawdownDuration: 0,
    var95: 0,
    var99: 0,
    cvar95: 0,
    cvar99: 0,
    winRate: 0,
    profitFactor: 0,
    averageWin: 0,
    averageLoss: 0,
    winLossRatio: 0,
    skewness: 0,
    kurtosis: 0,
    percentile5: 0,
    percentile25: 0,
    percentile75: 0,
    percentile95: 0
  };
}

function calculateVolatility(returns: number[]): number {
  if (returns.length < 2) return 0;
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (returns.length - 1);
  return Math.sqrt(variance);
}

function calculateSortinoRatio(returns: number[], meanReturn: number): number {
  const negativeReturns = returns.filter(r => r < 0);
  if (negativeReturns.length === 0) return 0;
  
  const downsideDeviation = Math.sqrt(
    negativeReturns.reduce((sum, r) => sum + Math.pow(r, 2), 0) / negativeReturns.length
  );
  
  return downsideDeviation > 0 ? meanReturn / downsideDeviation : 0;
}

function calculateVaR(values: number[], confidence: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.floor(sorted.length * confidence);
  return sorted[index];
}

function calculateCVaR(values: number[], confidence: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  const varIndex = Math.floor(sorted.length * confidence);
  const tailValues = sorted.slice(0, varIndex);
  return tailValues.length > 0 ? tailValues.reduce((sum, v) => sum + v, 0) / tailValues.length : 0;
}

function calculateWinRate(paths: PathStats[]): number {
  const totalBets = paths.reduce((sum, path) => sum + path.wins + path.losses, 0);
  const totalWins = paths.reduce((sum, path) => sum + path.wins, 0);
  return totalBets > 0 ? totalWins / totalBets : 0;
}

function calculateProfitFactor(paths: PathStats[]): number {
  const totalWins = paths.reduce((sum, path) => sum + path.wins, 0);
  const totalLosses = paths.reduce((sum, path) => sum + path.losses, 0);
  return totalLosses > 0 ? totalWins / totalLosses : 0;
}

function calculateWinLossMetrics(paths: PathStats[]): {
  averageWin: number;
  averageLoss: number;
  winLossRatio: number;
} {
  // 简化实现，基于最终财富计算
  const finalWealths = paths.map(p => p.finalWealth);
  const profitablePaths = finalWealths.filter(w => w > 1);
  const losingPaths = finalWealths.filter(w => w <= 1);
  
  const averageWin = profitablePaths.length > 0 
    ? profitablePaths.reduce((sum, w) => sum + (w - 1), 0) / profitablePaths.length 
    : 0;
  
  const averageLoss = losingPaths.length > 0 
    ? losingPaths.reduce((sum, w) => sum + (1 - w), 0) / losingPaths.length 
    : 0;
  
  const winLossRatio = averageLoss > 0 ? averageWin / averageLoss : 0;
  
  return { averageWin, averageLoss, winLossRatio };
}

function calculateSkewness(values: number[]): number {
  if (values.length < 3) return 0;
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);
  
  if (stdDev === 0) return 0;
  
  const skewness = values.reduce((sum, v) => {
    return sum + Math.pow((v - mean) / stdDev, 3);
  }, 0) / values.length;
  
  return skewness;
}

function calculateKurtosis(values: number[]): number {
  if (values.length < 4) return 0;
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);
  
  if (stdDev === 0) return 0;
  
  const kurtosis = values.reduce((sum, v) => {
    return sum + Math.pow((v - mean) / stdDev, 4);
  }, 0) / values.length;
  
  return kurtosis - 3; // 超额峰度
}

import type { StrategyConfig, StrategySummary, PathStats } from '../types/simulation';

export class StatisticsCalculator {
  /**
   * 计算策略统计摘要
   */
  static calculateStrategySummary(
    strategy: StrategyConfig,
    pathResults: PathStats[]
  ): StrategySummary {
    const finalWealths = pathResults.map(p => p.finalWealth);
    const logWealths = pathResults.map(p => p.logWealth);
    const maxDrawdowns = pathResults.map(p => p.maxDrawdown);
    
    const ruinCount = pathResults.filter(p => p.ruin).length;
    
    return {
      strategy,
      meanFinal: this.mean(finalWealths),
      medianFinal: this.median(finalWealths),
      p5Final: this.percentile(finalWealths, 0.05),
      ruinRate: ruinCount / pathResults.length,
      meanLogFinal: this.mean(logWealths),
      meanMDD: this.mean(maxDrawdowns),
      paths: pathResults
    };
  }

  /**
   * 计算数组平均值
   */
  private static mean(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  /**
   * 计算数组中位数
   */
  private static median(values: number[]): number {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }

  /**
   * 计算百分位数
   */
  private static percentile(values: number[], p: number): number {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil(sorted.length * p) - 1;
    return sorted[Math.max(0, index)];
  }

  /**
   * 计算标准差
   */
  static std(values: number[]): number {
    if (values.length < 2) return 0;
    const mean = this.mean(values);
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (values.length - 1);
    return Math.sqrt(variance);
  }

  /**
   * 计算夏普比率（简化版）
   */
  static sharpeRatio(returns: number[], riskFreeRate: number = 0): number {
    if (returns.length < 2) return 0;
    const meanReturn = this.mean(returns);
    const stdReturn = this.std(returns);
    return stdReturn === 0 ? 0 : (meanReturn - riskFreeRate) / stdReturn;
  }

  /**
   * 生成直方图数据
   */
  static histogram(values: number[], bins: number = 20): { x: number; y: number }[] {
    if (values.length === 0) return [];
    
    const min = Math.min(...values);
    const max = Math.max(...values);
    const binWidth = (max - min) / bins;
    
    const histogram = new Array(bins).fill(0).map((_, i) => ({
      x: min + i * binWidth + binWidth / 2,
      y: 0
    }));
    
    values.forEach(value => {
      const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
      histogram[binIndex].y++;
    });
    
    return histogram;
  }

  /**
   * 计算滚动最大回撤
   */
  static calculateDrawdown(equityCurve: number[]): number[] {
    const drawdowns: number[] = [];
    let peak = equityCurve[0];
    
    equityCurve.forEach(value => {
      if (value > peak) {
        peak = value;
      }
      const drawdown = peak === 0 ? 0 : (peak - value) / peak;
      drawdowns.push(drawdown);
    });
    
    return drawdowns;
  }
}
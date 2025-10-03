// 策略绩效图表数据生成工具
import type { StrategySummary } from '../types/simulation';

// 计算单个路径的所有绩效指标历史数据
export function calculatePathMetrics(path: number[], initialWealth: number) {
  const metrics: {
    cumulativeReturn: number[];
    wealthMultiple: number[];
    cumulativeDrawdown: number[];
    rollingVolatility: number[];
    logReturn: number[];
    returnDrawdownRatio: number[];
    newHighs: number[];
    relativeChange: number[];
    growthRate: number[];
    cumulativeProfit: number[];
    cumulativeLoss: number[];
    relativeDrawdown: number[];
    peakWealth: number[];
    distanceFromPeak: number[];
    winRateRolling: number[];
    avgProfitRolling: number[];
    avgLossRolling: number[];
    profitLossRatioRolling: number[];
    sharpeRatioRolling: number[];
    sortinoRatioRolling: number[];
    calmarRatio: number[];
    currentWinStreak: number[];
    currentLossStreak: number[];
    maxWinStreak: number[];
    maxLossStreak: number[];
    recoveryIndex: number[];
    var5Rolling: number[];
    maxSingleProfit: number[];
    maxSingleLoss: number[];
  } = {
    cumulativeReturn: [],
    wealthMultiple: [],
    cumulativeDrawdown: [],
    rollingVolatility: [],
    logReturn: [],
    returnDrawdownRatio: [],
    newHighs: [],
    relativeChange: [],
    growthRate: [],
    cumulativeProfit: [],
    cumulativeLoss: [],
    relativeDrawdown: [],
    peakWealth: [],
    distanceFromPeak: [],
    winRateRolling: [],
    avgProfitRolling: [],
    avgLossRolling: [],
    profitLossRatioRolling: [],
    sharpeRatioRolling: [],
    sortinoRatioRolling: [],
    calmarRatio: [],
    currentWinStreak: [],
    currentLossStreak: [],
    maxWinStreak: [],
    maxLossStreak: [],
    recoveryIndex: [],
    var5Rolling: [],
    maxSingleProfit: [],
    maxSingleLoss: [],
  };

  let peak = initialWealth;
  let newHighCount = 0;
  let currentWinStreak = 0;
  let currentLossStreak = 0;
  let maxWinStreak = 0;
  let maxLossStreak = 0;
  let maxProfit = 0;
  let maxLoss = 0;

  for (let i = 0; i < path.length; i++) {
    const wealth = path[i];
    const prevWealth = i > 0 ? path[i - 1] : initialWealth;

    // 累计收益率
    metrics.cumulativeReturn.push(((wealth - initialWealth) / initialWealth) * 100);

    // 资金增长倍数
    metrics.wealthMultiple.push(wealth / initialWealth);

    // 更新峰值
    if (wealth > peak) {
      peak = wealth;
      newHighCount++;
    }
    metrics.peakWealth.push(peak);
    metrics.newHighs.push(newHighCount);

    // 累计最大回撤
    const drawdown = ((peak - wealth) / peak) * 100;
    metrics.cumulativeDrawdown.push(drawdown);

    // 相对峰值回撤
    metrics.relativeDrawdown.push(drawdown);

    // 距离峰值差距
    metrics.distanceFromPeak.push(peak - wealth);

    // 对数收益
    metrics.logReturn.push(Math.log(wealth / initialWealth));

    // 收益回撤比
    const returnRate = ((wealth - initialWealth) / initialWealth) * 100;
    metrics.returnDrawdownRatio.push(drawdown > 0 ? returnRate / drawdown : 0);

    // 相对初始资金变化率
    metrics.relativeChange.push(((wealth - prevWealth) / prevWealth) * 100);

    // 资金增长速度
    const growthSpeed = i > 0 ? ((wealth - prevWealth) / prevWealth) * 100 : 0;
    metrics.growthRate.push(growthSpeed);

    // 累计盈利/亏损
    const change = wealth - prevWealth;
    if (change > 0) {
      metrics.cumulativeProfit.push((metrics.cumulativeProfit[i - 1] || 0) + (change / prevWealth) * 100);
      metrics.cumulativeLoss.push(metrics.cumulativeLoss[i - 1] || 0);
      currentWinStreak++;
      currentLossStreak = 0;
      if (change > maxProfit) maxProfit = change;
    } else {
      metrics.cumulativeProfit.push(metrics.cumulativeProfit[i - 1] || 0);
      metrics.cumulativeLoss.push((metrics.cumulativeLoss[i - 1] || 0) + Math.abs((change / prevWealth) * 100));
      currentLossStreak++;
      currentWinStreak = 0;
      if (Math.abs(change) > Math.abs(maxLoss)) maxLoss = change;
    }

    maxWinStreak = Math.max(maxWinStreak, currentWinStreak);
    maxLossStreak = Math.max(maxLossStreak, currentLossStreak);

    metrics.currentWinStreak.push(currentWinStreak);
    metrics.currentLossStreak.push(currentLossStreak);
    metrics.maxWinStreak.push(maxWinStreak);
    metrics.maxLossStreak.push(maxLossStreak);
    metrics.maxSingleProfit.push(maxProfit);
    metrics.maxSingleLoss.push(Math.abs(maxLoss));

    // 滚动指标 - 波动率
    if (i >= 10) {
      const window = path.slice(i - 10, i + 1);
      const returns = window.map((w, idx) => idx > 0 ? (w - window[idx - 1]) / window[idx - 1] : 0);
      const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
      const variance = returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length;
      metrics.rollingVolatility.push(Math.sqrt(variance) * 100);
    } else {
      metrics.rollingVolatility.push(0);
    }

    // 滚动胜率等指标
    if (i >= 20) {
      const window = path.slice(i - 20, i + 1);
      const changes = window.map((w, idx) => idx > 0 ? w - window[idx - 1] : 0);
      const wins = changes.filter(c => c > 0);
      const losses = changes.filter(c => c < 0);

      metrics.winRateRolling.push((wins.length / changes.length) * 100);
      metrics.avgProfitRolling.push(wins.length > 0 ? (wins.reduce((a, b) => a + b, 0) / wins.length) : 0);
      metrics.avgLossRolling.push(losses.length > 0 ? Math.abs(losses.reduce((a, b) => a + b, 0) / losses.length) : 0);

      const avgProfit = wins.length > 0 ? wins.reduce((a, b) => a + b, 0) / wins.length : 0;
      const avgLoss = losses.length > 0 ? Math.abs(losses.reduce((a, b) => a + b, 0) / losses.length) : 0;
      metrics.profitLossRatioRolling.push(avgLoss > 0 ? avgProfit / avgLoss : 0);
    } else {
      metrics.winRateRolling.push(0);
      metrics.avgProfitRolling.push(0);
      metrics.avgLossRolling.push(0);
      metrics.profitLossRatioRolling.push(0);
    }

    // 夏普比率和索提诺比率（滚动30轮）
    if (i >= 30) {
      const window = path.slice(i - 30, i + 1);
      const returns = window.map((w, idx) => idx > 0 ? (w - window[idx - 1]) / window[idx - 1] : 0);
      const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
      const std = Math.sqrt(returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length);

      metrics.sharpeRatioRolling.push(std > 0 ? mean / std : 0);

      const downReturns = returns.filter(r => r < 0);
      const downStd = downReturns.length > 0
        ? Math.sqrt(downReturns.reduce((a, b) => a + Math.pow(b, 2), 0) / downReturns.length)
        : 0;
      metrics.sortinoRatioRolling.push(downStd > 0 ? mean / downStd : 0);
    } else {
      metrics.sharpeRatioRolling.push(0);
      metrics.sortinoRatioRolling.push(0);
    }

    // 卡尔玛比率
    const annualReturn = returnRate / (i + 1) * 100;
    metrics.calmarRatio.push(drawdown > 0 ? annualReturn / drawdown : 0);

    // 恢复力指数
    const recovery = drawdown > 0 ? ((peak - wealth) / peak) : 1;
    metrics.recoveryIndex.push(1 - recovery);

    // VaR 5%（滚动50轮）
    if (i >= 50) {
      const window = path.slice(i - 50, i + 1);
      const returns = window.map((w, idx) => idx > 0 ? (w - window[idx - 1]) / window[idx - 1] : 0);
      returns.sort((a, b) => a - b);
      metrics.var5Rolling.push(Math.abs(returns[Math.floor(returns.length * 0.05)]) * 100);
    } else {
      metrics.var5Rolling.push(0);
    }
  }

  return metrics;
}

// 为所有策略生成平均绩效指标
export function generatePerformanceChartData(summaries: StrategySummary[]) {
  return summaries.map(summary => {
    // 过滤有效的路径
    const validPaths = summary.paths.filter(p =>
      p && p.wealthHistory && Array.isArray(p.wealthHistory) && p.wealthHistory.length > 0
    );

    if (validPaths.length === 0) {
      // 如果没有有效路径，返回空指标
      return {
        strategy: summary.strategy,
        metrics: {},
      };
    }

    // 计算所有路径的平均值
    const allPathsMetrics = validPaths.map(p => {
      const initialWealth = p.wealthHistory[0] || 100;
      return calculatePathMetrics(p.wealthHistory, initialWealth);
    });

    // 找到最长的路径长度
    const maxLength = Math.max(...allPathsMetrics.map(m => m.cumulativeReturn?.length || 0), 0);

    if (maxLength === 0 || allPathsMetrics.length === 0 || !allPathsMetrics[0]) {
      return {
        strategy: summary.strategy,
        metrics: {},
      };
    }

    // 为每个指标计算平均值
    const avgMetrics: Record<string, number[]> = {};
    const metricKeys = Object.keys(allPathsMetrics[0]) as (keyof typeof allPathsMetrics[0])[];

    for (const key of metricKeys) {
      avgMetrics[key] = [];
      for (let i = 0; i < maxLength; i++) {
        const values = allPathsMetrics
          .map(m => m[key]?.[i])
          .filter(v => v !== undefined && !isNaN(v) && isFinite(v)) as number[];
        avgMetrics[key].push(values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0);
      }
    }

    return {
      strategy: summary.strategy,
      metrics: avgMetrics,
    };
  });
}

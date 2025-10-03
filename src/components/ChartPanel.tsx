import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { StrategySummary } from '../types/simulation';
import { generateHighContrastColors, generateStrategyDisplayName, generateStrategyShortName } from '../utils/chartUtils';
import { HelpTooltip } from './HelpTooltip';
import type { ChartHelpKey } from '../utils/chartHelpTexts';
import { useLanguage } from '../contexts/LanguageContext';

interface ChartPanelProps {
  summaries: StrategySummary[];
}

export const ChartPanel: React.FC<ChartPanelProps> = ({ summaries }) => {
  const { t } = useLanguage();
  
  // 为所有策略统一生成颜色，确保在所有图表中颜色一致
  const strategyColors = React.useMemo(() => {
    return generateHighContrastColors(summaries.length);
  }, [summaries.length]);

  // 在组件外部预计算所有策略的时间序列数据，避免重复计算
  const allTimeSeriesData = React.useMemo(() => {
    if (!summaries || summaries.length === 0) return [];
    
    return summaries.map(summary => {
      if (!summary.paths || summary.paths.length === 0) return [];
      
      const maxLength = Math.max(...summary.paths.map(path => path.wealthHistory?.length || 0));
      if (maxLength === 0) return [];
      
      // 预计算所有路径的平均财富历史
      const avgWealthHistory = [];
      for (let i = 0; i < maxLength; i++) {
        let sum = 0;
        let count = 0;
        
        summary.paths.forEach(path => {
          if (path.wealthHistory && i < path.wealthHistory.length) {
            sum += path.wealthHistory[i];
            count++;
          }
        });
        
        avgWealthHistory.push(count > 0 ? sum / count : 0);
      }
      
      return avgWealthHistory;
    });
  }, [summaries]);

  // 创建单个指标的时间序列图表组件
  const MetricChart = React.useMemo(() => {
    return ({
      title,
      metricCalculator,
      formatter,
      icon,
      yAxisLabel,
      helpKey,
      height = 300
    }: {
      title: string;
      metricCalculator: (wealthHistory: number[], index: number) => number;
      formatter: (value: number) => string;
      icon: string;
      yAxisLabel: string;
      helpKey: ChartHelpKey;
      height?: number;
    }) => {
      const chartData = React.useMemo(() => {
        if (allTimeSeriesData.length === 0) return [];

        // 计算每个策略在每个时间点的指标值
        const timeSeriesData = allTimeSeriesData.map(avgHistory => {
          if (avgHistory.length === 0) return [];

          const metricPath = [];
          for (let i = 0; i < avgHistory.length; i++) {
            const metricValue = metricCalculator(avgHistory, i);
            metricPath.push(!isNaN(metricValue) && isFinite(metricValue) ? metricValue : 0);
          }

          return metricPath;
        });

        const maxLength = Math.max(...timeSeriesData.map(data => data.length));
        if (maxLength === 0) return [];

        // 构建数据点 - 采样减少数据点数量以提升性能
        const data = [];
        const sampleStep = Math.max(1, Math.floor(maxLength / 500)); // 最多500个点

        for (let i = 0; i < maxLength; i += sampleStep) {
          const point: Record<string, number> = { round: i + 1 };

          summaries.forEach((summary, index) => {
            if (i < timeSeriesData[index].length) {
              const strategyName = generateStrategyDisplayName(summary.strategy, index);
              point[strategyName] = timeSeriesData[index][i];
            }
          });

          data.push(point);
        }

        return data;
      }, [allTimeSeriesData, metricCalculator]);

      if (!chartData || chartData.length === 0) {
        return (
          <div className="space-y-2">
            <div className="px-2">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200">
                <span className="text-2xl">{icon}</span>
                {title}
              </h3>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 p-4 shadow-lg">
              <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                暂无数据
              </div>
            </div>
          </div>
        );
      }

    return (
      <div className="space-y-2">
        <div className="px-2">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200">
            <span className="text-2xl">{icon}</span>
            {title}
            <HelpTooltip helpKey={helpKey} />
          </h3>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 p-4 shadow-lg">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height={height}>
              <LineChart 
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60
                }}
                syncId="performanceCharts"
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#f0f0f0" 
                  className="dark:stroke-slate-600/30"
                />
                <XAxis 
                  dataKey="round" 
                  stroke="#666"
                  tick={{ fontSize: 12 }}
                  className="dark:stroke-slate-400"
                  label={{
                    value: t.chartAxisLabels.round,
                    position: 'bottom',
                    offset: 40,
                    className: 'fill-slate-600 dark:fill-slate-400 text-sm'
                  }}
                />
                <YAxis 
                  stroke="#666"
                  tick={{ fontSize: 12 }}
                  tickFormatter={formatter}
                  className="dark:stroke-slate-400"
                  label={{
                    value: yAxisLabel,
                    angle: -90,
                    position: 'left',
                    offset: 0,
                    className: 'fill-slate-600 dark:fill-slate-400 text-sm'
                  }}
                />
                <Tooltip 
                  cursor={{ stroke: '#999', strokeWidth: 1, strokeDasharray: '5 5' }}
                  isAnimationActive={false}
                  formatter={(value: number, name: string) => {
                    return [formatter(value), name];
                  }}
                  labelFormatter={(label) => `第 ${label} 轮`}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    padding: '12px 16px',
                    fontSize: '14px'
                  }}
                  wrapperStyle={{
                    zIndex: 1000
                  }}
                />
                <Legend 
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{
                    paddingTop: '20px',
                    fontSize: '14px'
                  }}
                />
                
                {summaries.map((summary, index) => {
                  const strategyName = generateStrategyDisplayName(summary.strategy, index);
                  const shortName = generateStrategyShortName(summary.strategy, index);
                  return (
                    <Line
                      key={strategyName}
                      type="monotone"
                      dataKey={strategyName}
                      stroke={strategyColors[index]}
                      strokeWidth={2}
                      dot={false}
                      name={shortName}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                      isAnimationActive={false}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. 资金曲线 */}
      <MetricChart
        title={t.charts.wealthCurve}
        metricCalculator={(history, i) => history[i]}
        formatter={(v) => `${v.toFixed(2)}`}
        icon="📈"
        yAxisLabel={t.chartAxisLabels.wealth}
        helpKey="wealthCurve"
      />

      {/* 2. 累计收益率 */}
      <MetricChart
        title={t.charts.cumulativeReturn}
        metricCalculator={(history, i) => (history[i] - 1) * 100}
        formatter={(v) => `${v.toFixed(2)}%`}
        icon="💰"
        yAxisLabel={t.chartAxisLabels.returnRate}
        helpKey="cumulativeReturn"
      />

      {/* 3. 累计最大回撤 */}
      {createMetricChart(
        t.charts.cumulativeDrawdown,
        (history, i) => {
          const maxSoFar = Math.max(...history.slice(0, i + 1));
          return maxSoFar > 0 ? ((maxSoFar - history[i]) / maxSoFar) * 100 : 0;
        },
        (v) => `${v.toFixed(2)}%`,
        '📉',
        t.chartAxisLabels.drawdown,
        'cumulativeDrawdown'
      )}

      {/* 4. 波动率（滚动10轮） */}
      {createMetricChart(
        t.charts.rollingVolatility,
        (history, i) => {
          if (i < 10) return 0;
          const window = history.slice(Math.max(0, i - 10), i + 1);
          const returns = window.slice(1).map((v, idx) => (v - window[idx]) / window[idx]);
          const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
          const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
          return Math.sqrt(variance) * 100;
        },
        (v) => `${v.toFixed(2)}%`,
        '🌊',
        t.chartAxisLabels.volatility,
        'rollingVolatility'
      )}

      {/* 5. 对数收益 */}
      {createMetricChart(
        t.charts.logReturn,
        (history, i) => Math.log(Math.max(history[i], 0.001)),
        (v) => v.toFixed(3),
        '📊',
        t.chartAxisLabels.logReturn,
        'logReturn'
      )}

      {/* 6. 收益/回撤比 */}
      {createMetricChart(
        t.charts.returnDrawdownRatio,
        (history, i) => {
          const maxSoFar = Math.max(...history.slice(0, i + 1));
          const drawdown = maxSoFar > 0 ? (maxSoFar - history[i]) / maxSoFar : 0;
          const returns = (history[i] - 1);
          return drawdown > 0.001 ? returns / drawdown : 0;
        },
        (v) => v.toFixed(2),
        '⚖️',
        t.chartAxisLabels.ratio,
        'returnDrawdownRatio'
      )}

      {/* 7. 资金新高次数（累计） */}
      {createMetricChart(
        t.charts.newHighs,
        (history, i) => {
          let count = 0;
          for (let j = 1; j <= i; j++) {
            if (history[j] > Math.max(...history.slice(0, j))) {
              count++;
            }
          }
          return count;
        },
        (v) => v.toFixed(0),
        '🎯',
        t.chartAxisLabels.count,
        'newHighs'
      )}

      {/* 8. 相对初始资金变化率 */}
      {createMetricChart(
        t.charts.relativeChange,
        (history, i) => ((history[i] - history[0]) / history[0]) * 100,
        (v) => `${v.toFixed(2)}%`,
        '📈',
        t.chartAxisLabels.changeRate,
        'relativeChange'
      )}

      {/* 9. 资金增长速度（单轮变化） */}
      {createMetricChart(
        t.charts.growthRate,
        (history, i) => i > 0 ? ((history[i] - history[i-1]) / history[i-1]) * 100 : 0,
        (v) => `${v.toFixed(2)}%`,
        '🚀',
        t.chartAxisLabels.growthSpeed,
        'growthRate'
      )}

      {/* 10. 累计盈利幅度 */}
      {createMetricChart(
        t.charts.cumulativeProfit,
        (history, i) => {
          const profit = history[i] - 1;
          return profit > 0 ? profit * 100 : 0;
        },
        (v) => `${v.toFixed(2)}%`,
        '💵',
        t.chartAxisLabels.profit,
        'cumulativeProfit'
      )}

      {/* 11. 累计亏损幅度 */}
      {createMetricChart(
        t.charts.cumulativeLoss,
        (history, i) => {
          const loss = 1 - history[i];
          return loss > 0 ? loss * 100 : 0;
        },
        (v) => `${v.toFixed(2)}%`,
        '💸',
        t.chartAxisLabels.loss,
        'cumulativeLoss'
      )}

      {/* 12. 相对峰值回撤 */}
      {createMetricChart(
        t.charts.relativeDrawdown,
        (history, i) => {
          const peak = Math.max(...history.slice(0, i + 1));
          return peak > 0 ? ((peak - history[i]) / peak) * 100 : 0;
        },
        (v) => `${v.toFixed(2)}%`,
        '⬇️',
        t.chartAxisLabels.drawdown,
        'relativeDrawdown'
      )}

      {/* 13. 资金峰值 */}
      {createMetricChart(
        t.charts.peakWealth,
        (history, i) => Math.max(...history.slice(0, i + 1)),
        (v) => v.toFixed(2),
        '⛰️',
        t.chartAxisLabels.peakWealth,
        'peakWealth'
      )}

      {/* 14. 距离峰值差距 */}
      {createMetricChart(
        t.charts.distanceFromPeak,
        (history, i) => {
          const peak = Math.max(...history.slice(0, i + 1));
          return peak - history[i];
        },
        (v) => v.toFixed(2),
        '📏',
        t.chartAxisLabels.distance,
        'distanceFromPeak'
      )}

      {/* 15. 盈利回合占比（滚动20轮） */}
      {createMetricChart(
        t.charts.winRateRolling,
        (history, i) => {
          if (i < 20) return 0;
          const window = history.slice(Math.max(0, i - 20), i + 1);
          let winCount = 0;
          for (let j = 1; j < window.length; j++) {
            if (window[j] > window[j-1]) winCount++;
          }
          return (winCount / 20) * 100;
        },
        (v) => `${v.toFixed(2)}%`,
        '🎲',
        t.chartAxisLabels.winRate,
        'winRateRolling'
      )}

      {/* 16. 平均盈利幅度（滚动20轮） */}
      {createMetricChart(
        t.charts.avgProfitRolling,
        (history, i) => {
          if (i < 20) return 0;
          const window = history.slice(Math.max(0, i - 20), i + 1);
          let totalProfit = 0;
          let count = 0;
          for (let j = 1; j < window.length; j++) {
            const change = (window[j] - window[j-1]) / window[j-1];
            if (change > 0) {
              totalProfit += change;
              count++;
            }
          }
          return count > 0 ? (totalProfit / count) * 100 : 0;
        },
        (v) => `${v.toFixed(3)}%`,
        '📊',
        t.chartAxisLabels.avgProfit,
        'avgProfitRolling'
      )}

      {/* 17. 平均亏损幅度（滚动20轮） */}
      {createMetricChart(
        t.charts.avgLossRolling,
        (history, i) => {
          if (i < 20) return 0;
          const window = history.slice(Math.max(0, i - 20), i + 1);
          let totalLoss = 0;
          let count = 0;
          for (let j = 1; j < window.length; j++) {
            const change = (window[j] - window[j-1]) / window[j-1];
            if (change < 0) {
              totalLoss += Math.abs(change);
              count++;
            }
          }
          return count > 0 ? (totalLoss / count) * 100 : 0;
        },
        (v) => `${v.toFixed(3)}%`,
        '📉',
        t.chartAxisLabels.avgLoss,
        'avgLossRolling'
      )}

      {/* 18. 盈亏比（滚动20轮） */}
      {createMetricChart(
        t.charts.profitLossRatioRolling,
        (history, i) => {
          if (i < 20) return 0;
          const window = history.slice(Math.max(0, i - 20), i + 1);
          let totalProfit = 0, totalLoss = 0;
          let profitCount = 0, lossCount = 0;
          for (let j = 1; j < window.length; j++) {
            const change = (window[j] - window[j-1]) / window[j-1];
            if (change > 0) {
              totalProfit += change;
              profitCount++;
            } else if (change < 0) {
              totalLoss += Math.abs(change);
              lossCount++;
            }
          }
          const avgProfit = profitCount > 0 ? totalProfit / profitCount : 0;
          const avgLoss = lossCount > 0 ? totalLoss / lossCount : 0;
          return avgLoss > 0 ? avgProfit / avgLoss : 0;
        },
        (v) => v.toFixed(2),
        '⚖️',
        t.chartAxisLabels.profitLossRatio,
        'profitLossRatioRolling'
      )}

      {/* 19. 夏普比率（滚动30轮） */}
      {createMetricChart(
        t.charts.sharpeRatioRolling,
        (history, i) => {
          if (i < 30) return 0;
          const window = history.slice(Math.max(0, i - 30), i + 1);
          const returns = window.slice(1).map((v, idx) => (v - window[idx]) / window[idx]);
          const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
          const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
          const std = Math.sqrt(variance);
          return std > 0 ? mean / std : 0;
        },
        (v) => v.toFixed(3),
        '📐',
        t.chartAxisLabels.sharpeRatio,
        'sharpeRatioRolling'
      )}

      {/* 20. 索提诺比率（滚动30轮） */}
      {createMetricChart(
        t.charts.sortinoRatioRolling,
        (history, i) => {
          if (i < 30) return 0;
          const window = history.slice(Math.max(0, i - 30), i + 1);
          const returns = window.slice(1).map((v, idx) => (v - window[idx]) / window[idx]);
          const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
          const negReturns = returns.filter(r => r < 0);
          if (negReturns.length === 0) return 0;
          const downVar = negReturns.reduce((sum, r) => sum + Math.pow(r, 2), 0) / negReturns.length;
          const downStd = Math.sqrt(downVar);
          return downStd > 0 ? mean / downStd : 0;
        },
        (v) => v.toFixed(3),
        '🎯',
        t.chartAxisLabels.sortinoRatio,
        'sortinoRatioRolling'
      )}

      {/* 21. 卡尔玛比率（年化收益/最大回撤） */}
      {createMetricChart(
        t.charts.calmarRatio,
        (history, i) => {
          const returns = (history[i] - 1);
          const peak = Math.max(...history.slice(0, i + 1));
          const drawdown = peak > 0 ? (peak - history[i]) / peak : 0;
          return drawdown > 0.001 ? returns / drawdown : 0;
        },
        (v) => v.toFixed(2),
        '🏆',
        t.chartAxisLabels.calmarRatio,
        'calmarRatio'
      )}

      {/* 22. 连续盈利次数 */}
      {createMetricChart(
        t.charts.currentWinStreak,
        (history, i) => {
          let count = 0;
          for (let j = i; j > 0; j--) {
            if (history[j] > history[j-1]) {
              count++;
            } else {
              break;
            }
          }
          return count;
        },
        (v) => v.toFixed(0),
        '🔥',
        t.chartAxisLabels.winStreak,
        'currentWinStreak'
      )}

      {/* 23. 连续亏损次数 */}
      {createMetricChart(
        t.charts.currentLossStreak,
        (history, i) => {
          let count = 0;
          for (let j = i; j > 0; j--) {
            if (history[j] < history[j-1]) {
              count++;
            } else {
              break;
            }
          }
          return count;
        },
        (v) => v.toFixed(0),
        '❄️',
        t.chartAxisLabels.lossStreak,
        'currentLossStreak'
      )}

      {/* 24. 最长连胜记录 */}
      {createMetricChart(
        t.charts.maxWinStreak,
        (history, i) => {
          let maxStreak = 0;
          let currentStreak = 0;
          for (let j = 1; j <= i; j++) {
            if (history[j] > history[j-1]) {
              currentStreak++;
              maxStreak = Math.max(maxStreak, currentStreak);
            } else {
              currentStreak = 0;
            }
          }
          return maxStreak;
        },
        (v) => v.toFixed(0),
        '🏅',
        t.chartAxisLabels.maxWinStreak,
        'maxWinStreak'
      )}

      {/* 25. 最长连亏记录 */}
      {createMetricChart(
        t.charts.maxLossStreak,
        (history, i) => {
          let maxStreak = 0;
          let currentStreak = 0;
          for (let j = 1; j <= i; j++) {
            if (history[j] < history[j-1]) {
              currentStreak++;
              maxStreak = Math.max(maxStreak, currentStreak);
            } else {
              currentStreak = 0;
            }
          }
          return maxStreak;
        },
        (v) => v.toFixed(0),
        '⛓️',
        t.chartAxisLabels.maxLossStreak,
        'maxLossStreak'
      )}

      {/* 26. 资金恢复力指数 */}
      {createMetricChart(
        t.charts.recoveryIndex,
        (history, i) => {
          const peak = Math.max(...history.slice(0, i + 1));
          const drawdown = peak > 0 ? (peak - history[i]) / peak : 0;
          return drawdown > 0 ? (1 - drawdown) * 100 : 100;
        },
        (v) => `${v.toFixed(2)}%`,
        '💪',
        t.chartAxisLabels.recovery,
        'recoveryIndex'
      )}

      {/* 27. 风险价值VaR（5%分位数，滚动50轮） */}
      {createMetricChart(
        t.charts.var5Rolling,
        (history, i) => {
          if (i < 50) return 0;
          const window = history.slice(Math.max(0, i - 50), i + 1);
          const returns = window.slice(1).map((v, idx) => (v - window[idx]) / window[idx]);
          const sorted = [...returns].sort((a, b) => a - b);
          const varIndex = Math.floor(sorted.length * 0.05);
          return sorted[varIndex] * 100;
        },
        (v) => `${v.toFixed(3)}%`,
        '⚠️',
        t.chartAxisLabels.var5,
        'var5Rolling'
      )}

      {/* 28. 最大单日盈利 */}
      {createMetricChart(
        t.charts.maxSingleProfit,
        (history, i) => {
          let maxGain = 0;
          for (let j = 1; j <= i; j++) {
            const gain = ((history[j] - history[j-1]) / history[j-1]) * 100;
            maxGain = Math.max(maxGain, gain);
          }
          return maxGain;
        },
        (v) => `${v.toFixed(2)}%`,
        '🌟',
        t.chartAxisLabels.maxProfit,
        'maxSingleProfit'
      )}

      {/* 29. 最大单日亏损 */}
      {createMetricChart(
        t.charts.maxSingleLoss,
        (history, i) => {
          let maxLoss = 0;
          for (let j = 1; j <= i; j++) {
            const loss = ((history[j-1] - history[j]) / history[j-1]) * 100;
            maxLoss = Math.max(maxLoss, loss);
          }
          return maxLoss;
        },
        (v) => `${v.toFixed(2)}%`,
        '💥',
        t.chartAxisLabels.maxLoss,
        'maxSingleLoss'
      )}
    </div>
  );
};
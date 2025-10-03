import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { StrategySummary } from '../types/simulation';
import { generateHighContrastColors, generateStrategyDisplayName, generateStrategyShortName } from '../utils/chartUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface PerformanceChartsPanelProps {
  summaries: StrategySummary[];
}

export const PerformanceChartsPanel: React.FC<PerformanceChartsPanelProps> = ({ summaries }) => {
  const { t } = useLanguage();
  const colors = generateHighContrastColors(summaries.length);

  // 创建单个指标的时间序列图表组件
  const MetricChart = React.useMemo(() => {
    return ({
      title,
      metricCalculator,
      formatter,
      icon,
      yAxisLabel,
      height = 300
    }: {
      title: string;
      metricCalculator: (wealthHistory: number[], index: number) => number;
      formatter: (value: number) => string;
      icon: string;
      yAxisLabel: string;
      height?: number;
    }) => {
      // 准备时间序列数据
      const chartData = React.useMemo(() => {
        if (!summaries || summaries.length === 0) return [];

        // 计算每个策略在每个时间点的指标值
        const timeSeriesData = summaries.map(summary => {
          if (!summary.paths || summary.paths.length === 0) return [];

          const maxLength = Math.max(...summary.paths.map(path => path.wealthHistory?.length || 0));
          if (maxLength === 0) return [];

          const metricPath = [];
          for (let i = 0; i < maxLength; i++) {
            let sum = 0;
            let count = 0;

            summary.paths.forEach(path => {
              if (path.wealthHistory && i < path.wealthHistory.length) {
                const metricValue = metricCalculator(path.wealthHistory, i);
                if (!isNaN(metricValue) && isFinite(metricValue)) {
                  sum += metricValue;
                  count++;
                }
              }
            });

            metricPath.push(count > 0 ? sum / count : 0);
          }

          return metricPath;
        });

        const maxLength = Math.max(...timeSeriesData.map(data => data.length));
        if (maxLength === 0) return [];

        // 构建数据点
        const data = [];
        for (let i = 0; i < maxLength; i++) {
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
      }, [summaries, metricCalculator]);

    if (!chartData || chartData.length === 0) {
      return (
        <div className="space-y-2">
          <div className="px-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
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
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
            <span className="text-2xl">{icon}</span>
            {title}
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
                      stroke={colors[index]}
                      strokeWidth={2}
                      dot={false}
                      name={shortName}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }, [summaries, colors, t]);

  if (!summaries || summaries.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p className="font-medium">{t.noData}</p>
          <p className="text-sm">{t.runSimulationFirst}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 收益指标 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MetricChart
          title={t.charts.cumulativeReturn}
          metricCalculator={(history, i) => (history[i] - 1) * 100}
          formatter={(v) => `${v.toFixed(2)}%`}
          icon="📈"
          yAxisLabel={t.chartAxisLabels.returnRate}
        />
        <MetricChart
          title={t.charts.wealthMultiple}
          metricCalculator={(history, i) => history[i]}
          formatter={(v) => `${v.toFixed(2)}x`}
          icon="💰"
          yAxisLabel={t.chartAxisLabels.multiples}
        />
      </div>

      {/* 风险指标 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {createMetricChart(
          t.charts.cumulativeDrawdown,
          (history, i) => {
            const maxSoFar = Math.max(...history.slice(0, i + 1));
            return maxSoFar > 0 ? ((maxSoFar - history[i]) / maxSoFar) * 100 : 0;
          },
          (v) => `${v.toFixed(2)}%`,
          '📉',
          t.chartAxisLabels.drawdown
        )}
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
          t.chartAxisLabels.volatility
        )}
      </div>

      {/* 收益风险比率 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
          t.chartAxisLabels.ratio
        )}
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
          t.chartAxisLabels.count
        )}
      </div>

      {/* 财富分位数变化 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {createMetricChart(
          t.charts.logReturn,
          (history, i) => Math.log(history[i]),
          (v) => v.toFixed(3),
          '📊',
          t.chartAxisLabels.logReturn
        )}
        {createMetricChart(
          t.charts.relativeChange,
          (history, i) => ((history[i] - history[0]) / history[0]) * 100,
          (v) => `${v.toFixed(2)}%`,
          '📈',
          t.chartAxisLabels.changeRate
        )}
      </div>
    </div>
  );
};

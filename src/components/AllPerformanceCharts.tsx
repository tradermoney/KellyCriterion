import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { StrategySummary } from '../types/simulation';
import { generateHighContrastColors, generateStrategyShortName } from '../utils/chartUtils';
import { useLanguage } from '../contexts/LanguageContext';
import { generatePerformanceChartData } from '../utils/performanceChartData';
import { HelpTooltip } from './HelpTooltip';

interface AllPerformanceChartsProps {
  summaries: StrategySummary[];
}

export const AllPerformanceCharts: React.FC<AllPerformanceChartsProps> = ({ summaries }) => {
  const { t } = useLanguage();
  const colors = generateHighContrastColors(summaries.length);

  const performanceData = useMemo(() => {
    return generatePerformanceChartData(summaries);
  }, [summaries]);

  if (!summaries || summaries.length === 0 || performanceData.length === 0) {
    return null;
  }

  // 定义所有29个图表
  const charts = [
    { key: 'cumulativeReturn', title: t.charts.cumulativeReturn, yLabel: t.chartAxisLabels.returnRate },
    { key: 'wealthMultiple', title: t.charts.wealthMultiple, yLabel: '倍数' },
    { key: 'cumulativeDrawdown', title: t.charts.cumulativeDrawdown, yLabel: t.chartAxisLabels.drawdown },
    { key: 'rollingVolatility', title: t.charts.rollingVolatility, yLabel: t.chartAxisLabels.volatility },
    { key: 'logReturn', title: t.charts.logReturn, yLabel: t.chartAxisLabels.logReturn },
    { key: 'returnDrawdownRatio', title: t.charts.returnDrawdownRatio, yLabel: t.chartAxisLabels.ratio },
    { key: 'newHighs', title: t.charts.newHighs, yLabel: t.chartAxisLabels.count },
    { key: 'relativeChange', title: t.charts.relativeChange, yLabel: t.chartAxisLabels.changeRate },
    { key: 'growthRate', title: t.charts.growthRate, yLabel: t.chartAxisLabels.growthSpeed },
    { key: 'cumulativeProfit', title: t.charts.cumulativeProfit, yLabel: t.chartAxisLabels.profit },
    { key: 'cumulativeLoss', title: t.charts.cumulativeLoss, yLabel: t.chartAxisLabels.loss },
    { key: 'relativeDrawdown', title: t.charts.relativeDrawdown, yLabel: t.chartAxisLabels.drawdown },
    { key: 'peakWealth', title: t.charts.peakWealth, yLabel: t.chartAxisLabels.peakWealth },
    { key: 'distanceFromPeak', title: t.charts.distanceFromPeak, yLabel: t.chartAxisLabels.distance },
    { key: 'winRateRolling', title: t.charts.winRateRolling, yLabel: t.chartAxisLabels.winRate },
    { key: 'avgProfitRolling', title: t.charts.avgProfitRolling, yLabel: t.chartAxisLabels.avgProfit },
    { key: 'avgLossRolling', title: t.charts.avgLossRolling, yLabel: t.chartAxisLabels.avgLoss },
    { key: 'profitLossRatioRolling', title: t.charts.profitLossRatioRolling, yLabel: t.chartAxisLabels.profitLossRatio },
    { key: 'sharpeRatioRolling', title: t.charts.sharpeRatioRolling, yLabel: t.chartAxisLabels.sharpeRatio },
    { key: 'sortinoRatioRolling', title: t.charts.sortinoRatioRolling, yLabel: t.chartAxisLabels.sortinoRatio },
    { key: 'calmarRatio', title: t.charts.calmarRatio, yLabel: t.chartAxisLabels.calmarRatio },
    { key: 'currentWinStreak', title: t.charts.currentWinStreak, yLabel: t.chartAxisLabels.streak },
    { key: 'currentLossStreak', title: t.charts.currentLossStreak, yLabel: t.chartAxisLabels.streak },
    { key: 'maxWinStreak', title: t.charts.maxWinStreak, yLabel: t.chartAxisLabels.streak },
    { key: 'maxLossStreak', title: t.charts.maxLossStreak, yLabel: t.chartAxisLabels.streak },
    { key: 'recoveryIndex', title: t.charts.recoveryIndex, yLabel: t.chartAxisLabels.recoveryIndex },
    { key: 'var5Rolling', title: t.charts.var5Rolling, yLabel: t.chartAxisLabels.var },
    { key: 'maxSingleProfit', title: t.charts.maxSingleProfit, yLabel: t.chartAxisLabels.maxProfit },
    { key: 'maxSingleLoss', title: t.charts.maxSingleLoss, yLabel: t.chartAxisLabels.maxLoss },
  ];

  const renderChart = (chartConfig: { key: string; title: string; yLabel: string }) => {
    // 准备图表数据
    const chartData = [];
    const maxLength = Math.max(...performanceData.map(d => d.metrics[chartConfig.key]?.length || 0));

    for (let i = 0; i < maxLength; i++) {
      const point: Record<string, number> = { round: i + 1 };
      performanceData.forEach((data, idx) => {
        const strategyName = generateStrategyShortName(data.strategy, idx, t.strategyTypes);
        point[strategyName] = data.metrics[chartConfig.key]?.[i] || 0;
      });
      chartData.push(point);
    }

    return (
      <div key={chartConfig.key} className="space-y-2">
        <div className="px-2">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
            <span className="text-2xl">📈</span>
            {chartConfig.title}
            <HelpTooltip helpKey={`${chartConfig.key}Chart`} />
          </h3>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 p-4 shadow-lg">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis
                dataKey="round"
                stroke="#64748b"
                className="dark:stroke-slate-400"
                label={{
                  value: t.chartAxisLabels.round,
                  position: 'insideBottom',
                  offset: -5,
                  className: 'fill-slate-600 dark:fill-slate-400'
                }}
              />
              <YAxis
                stroke="#64748b"
                className="dark:stroke-slate-400"
                label={{
                  value: chartConfig.yLabel,
                  angle: -90,
                  position: 'insideLeft',
                  className: 'fill-slate-600 dark:fill-slate-400'
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                labelStyle={{ color: '#475569', fontWeight: 'bold' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              {summaries.map((summary, idx) => {
                const strategyName = generateStrategyShortName(summary.strategy, idx, t.strategyTypes);
                return (
                  <Line
                    key={strategyName}
                    type="monotone"
                    dataKey={strategyName}
                    stroke={colors[idx]}
                    strokeWidth={2}
                    dot={false}
                    name={strategyName}
                    activeDot={{ r: 4 }}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {charts.map((chart) => renderChart(chart))}
    </div>
  );
};

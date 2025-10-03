import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { StrategySummary } from '../types/simulation';
import { calculatePerformanceMetrics } from '../utils/performanceAnalysis';
import { generateHighContrastColors, generateStrategyShortName } from '../utils/chartUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface PerformanceMetricsChartProps {
  summaries: StrategySummary[];
  height?: number;
}

export const PerformanceMetricsChart: React.FC<PerformanceMetricsChartProps> = ({ 
  summaries, 
  height = 300 
}) => {
  const { t } = useLanguage();
  const colors = generateHighContrastColors(summaries.length);
  
  // 准备绩效指标数据
  const chartData = React.useMemo(() => {
    if (!summaries || summaries.length === 0) return [];
    
    // 计算每个策略的绩效指标
    const metricsData = summaries.map((summary, index) => {
      const metrics = calculatePerformanceMetrics(summary);
      const strategyName = generateStrategyShortName(summary.strategy, index, t.strategyTypes);
      
      return {
        strategy: strategyName,
        color: colors[index],
        ...metrics
      };
    });
    
    // 构建图表数据 - 每个指标作为一个数据点
    const indicators = [
      { key: 'totalReturn', name: t.performanceMetrics.totalReturn, formatter: (v: number) => `${(v * 100).toFixed(2)}%` },
      { key: 'annualizedReturn', name: t.performanceMetrics.annualizedReturn, formatter: (v: number) => `${(v * 100).toFixed(2)}%` },
      { key: 'volatility', name: t.performanceMetrics.volatility, formatter: (v: number) => `${(v * 100).toFixed(2)}%` },
      { key: 'sharpeRatio', name: t.performanceMetrics.sharpeRatio, formatter: (v: number) => v.toFixed(3) },
      { key: 'sortinoRatio', name: t.performanceMetrics.sortinoRatio, formatter: (v: number) => v.toFixed(3) },
      { key: 'maxDrawdown', name: t.performanceMetrics.maxDrawdown, formatter: (v: number) => `${(v * 100).toFixed(2)}%` },
      { key: 'var95', name: '95% VaR', formatter: (v: number) => v.toFixed(3) },
      { key: 'var99', name: '99% VaR', formatter: (v: number) => v.toFixed(3) },
      { key: 'winRate', name: t.performanceMetrics.winRate, formatter: (v: number) => `${(v * 100).toFixed(2)}%` },
      { key: 'profitFactor', name: t.performanceMetrics.profitFactor, formatter: (v: number) => v.toFixed(3) },
      { key: 'averageWin', name: t.performanceMetrics.averageWin, formatter: (v: number) => v.toFixed(3) },
      { key: 'averageLoss', name: t.performanceMetrics.averageLoss, formatter: (v: number) => v.toFixed(3) },
      { key: 'winLossRatio', name: t.performanceMetrics.winLossRatio, formatter: (v: number) => v.toFixed(3) },
      { key: 'skewness', name: t.performanceMetrics.skewness, formatter: (v: number) => v.toFixed(3) },
      { key: 'kurtosis', name: t.performanceMetrics.kurtosis, formatter: (v: number) => v.toFixed(3) },
      { key: 'percentile5', name: t.percentile5, formatter: (v: number) => v.toFixed(3) },
      { key: 'percentile25', name: t.percentile25, formatter: (v: number) => v.toFixed(3) },
      { key: 'percentile75', name: t.percentile75, formatter: (v: number) => v.toFixed(3) },
      { key: 'percentile95', name: t.percentile95, formatter: (v: number) => v.toFixed(3) }
    ];
    
    const data = indicators.map(indicator => {
      const point: Record<string, string | number | ((v: number) => string)> = {
        indicator: indicator.name,
        formatter: indicator.formatter
      };

      metricsData.forEach((strategy) => {
        point[strategy.strategy] = strategy[indicator.key as keyof typeof strategy];
      });
      
      return point;
    });
    
    return data;
  }, [summaries, colors, t.performanceMetrics, t.percentile5, t.percentile25, t.percentile75, t.percentile95, t.strategyTypes]);
  
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p className="font-medium">{t.noData}</p>
          <p className="text-sm">{t.runSimulationFirst}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart 
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 100
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#f0f0f0" 
            className="dark:stroke-slate-600/30"
          />
          <XAxis 
            dataKey="indicator" 
            stroke="#666"
            tick={{ fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={80}
            className="dark:stroke-slate-400"
          />
          <YAxis 
            stroke="#666"
            tick={{ fontSize: 12 }}
            className="dark:stroke-slate-400"
            label={{
              value: t.chartAxisLabels.metricValue,
              angle: -90,
              position: 'left',
              offset: 0,
              className: 'fill-slate-600 dark:fill-slate-400 text-sm'
            }}
          />
          <Tooltip
            formatter={(value: number, name: string, props: { payload?: Record<string, string | number | ((v: number) => string)> }) => {
              const data = props.payload;
              const formatter = data?.formatter as (v: number) => string;
              return [formatter(value), name];
            }}
            labelFormatter={(label) => `指标: ${label}`}
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
              fontSize: '12px'
            }}
          />
          
          {summaries.map((summary, index) => {
            const strategyName = generateStrategyShortName(summary.strategy, index);
            return (
              <Line
                key={strategyName}
                type="monotone"
                dataKey={strategyName}
                stroke={colors[index]}
                strokeWidth={2}
                dot={{ r: 4 }}
                name={strategyName}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

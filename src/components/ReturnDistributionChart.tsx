import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { StrategySummary } from '../types/simulation';
import { generateHighContrastColors, generateStrategyShortName } from '../utils/chartUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface ReturnDistributionChartProps {
  summaries: StrategySummary[];
  height?: number;
}

export const ReturnDistributionChart: React.FC<ReturnDistributionChartProps> = ({ 
  summaries, 
  height = 400 
}) => {
  const { t } = useLanguage();
  const colors = generateHighContrastColors(summaries.length);
  
  // 准备收益分布数据
  const chartData = React.useMemo(() => {
    if (!summaries || summaries.length === 0) return [];
    
    // 为每个策略计算收益分布
    const distributionData = summaries.map(summary => {
      const finalWealths = summary.paths?.map(path => path.finalWealth) || [];
      if (finalWealths.length === 0) return [];
      
      // 计算收益率的分布
      const returns = finalWealths.map(wealth => wealth - 1); // 收益率 = 最终财富 - 1
      const sortedReturns = [...returns].sort((a, b) => a - b);
      
      // 创建分布点
      const distribution = [];
      const step = Math.max(1, Math.floor(sortedReturns.length / 50)); // 最多50个点
      
      for (let i = 0; i < sortedReturns.length; i += step) {
        const returnValue = sortedReturns[i];
        const percentile = (i / sortedReturns.length) * 100;
        distribution.push({
          return: returnValue,
          percentile: percentile
        });
      }
      
      return distribution;
    });
    
    // 找到最长的分布
    const maxLength = Math.max(...distributionData.map(dist => dist.length));
    if (maxLength === 0) return [];
    
    // 构建数据点
    const data = [];
    for (let i = 0; i < maxLength; i++) {
      const point: Record<string, number> = { percentile: 0 };
      
      summaries.forEach((summary, index) => {
        if (i < distributionData[index].length) {
          const strategyName = generateStrategyShortName(summary.strategy, index);
          point[strategyName] = distributionData[index][i].return;
          point.percentile = distributionData[index][i].percentile;
        }
      });
      
      data.push(point);
    }
    
    return data;
  }, [summaries]);
  
  if (!chartData || chartData.length === 0) {
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
    <div className="w-full">
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
            dataKey="percentile" 
            stroke="#666"
            tick={{ fontSize: 12 }}
            className="dark:stroke-slate-400"
            label={{
              value: t.chartAxisLabels.percentile,
              position: 'bottom',
              offset: 40,
              className: 'fill-slate-600 dark:fill-slate-400 text-sm'
            }}
            tickFormatter={(value) => `${value.toFixed(0)}%`}
          />
          <YAxis 
            stroke="#666"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
            className="dark:stroke-slate-400"
            label={{
              value: t.chartAxisLabels.returnRate,
              angle: -90,
              position: 'left',
              offset: 0,
              className: 'fill-slate-600 dark:fill-slate-400 text-sm'
            }}
          />
          <Tooltip 
            formatter={(value: number, name: string) => {
              return [`${(value * 100).toFixed(2)}%`, name];
            }}
            labelFormatter={(label) => `${label.toFixed(1)}% ${t.chartAxisLabels.percentile.replace(' (%)', '')}`}
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
            const strategyName = generateStrategyShortName(summary.strategy, index);
            return (
              <Line
                key={strategyName}
                type="monotone"
                dataKey={strategyName}
                stroke={colors[index]}
                strokeWidth={2}
                dot={false}
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

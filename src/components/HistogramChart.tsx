import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { StrategySummary } from '../types/simulation';
import { generateHighContrastColors, generateStrategyShortName } from '../utils/chartUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface HistogramChartProps {
  summaries: StrategySummary[];
  height?: number;
}

export const HistogramChart: React.FC<HistogramChartProps> = ({ 
  summaries, 
  height = 250 
}) => {
  const { t } = useLanguage();
  // 准备直方图数据
  const chartData = React.useMemo(() => {
    if (!summaries || summaries.length === 0) return [];
    
    // 从所有路径的最终财富值创建直方图数据
    const allFinalWealth = summaries.map(summary => 
      summary.paths?.map(path => path.finalWealth) || []
    ).flat();
    
    if (allFinalWealth.length === 0) return [];
    
    // 找到最小值和最大值
    const minValue = Math.min(...allFinalWealth);
    const maxValue = Math.max(...allFinalWealth);
    
    // 创建统一的bins
    const binCount = 20;
    const binWidth = (maxValue - minValue) / binCount;
    const bins = [];
    
    for (let i = 0; i < binCount; i++) {
      const binStart = minValue + i * binWidth;
      const binEnd = binStart + binWidth;
      
      const bin: Record<string, number | string> = {
        bin: `${binStart.toFixed(1)}-${binEnd.toFixed(1)}`,
        binStart,
        binEnd
      };
      
      // 为每个策略计算该bin的计数
      summaries.forEach((summary, index) => {
        const strategyWealth = summary.paths?.map(path => path.finalWealth) || [];
        const count = strategyWealth.filter(
          wealth => wealth >= binStart && wealth < binEnd
        ).length;
        
        const strategyName = generateStrategyShortName(summary.strategy, index);
        bin[strategyName] = count;
      });
      
      bins.push(bin);
    }
    
    return bins;
  }, [summaries]);
  
  // 生成高对比度颜色
  const colors = generateHighContrastColors(summaries.length);
  
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[250px] text-gray-500 dark:text-gray-400">
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
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-slate-600" />
          <XAxis 
            dataKey="bin" 
            stroke="#666"
            tick={{ fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={60}
            className="dark:stroke-slate-400"
          />
          <YAxis 
            stroke="#666"
            tick={{ fontSize: 12 }}
            className="dark:stroke-slate-400"
          />
          <Tooltip 
            formatter={(value: number, name: string) => {
              return [value, name];
            }}
            labelFormatter={(label) => `资金区间: ${label}`}
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
          <Legend />
          
          {summaries.map((summary, index) => {
            const strategyName = generateStrategyShortName(summary.strategy, index);
            return (
              <Bar
                key={strategyName}
                dataKey={strategyName}
                fill={colors[index]}
                name={strategyName}
                opacity={0.8}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
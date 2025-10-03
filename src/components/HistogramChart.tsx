import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { StrategySummary } from '../types/simulation';

interface HistogramChartProps {
  summaries: StrategySummary[];
  height?: number;
}

export const HistogramChart: React.FC<HistogramChartProps> = ({ 
  summaries, 
  height = 250 
}) => {
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
      
      const bin: any = {
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
        
        bin[`策略${index + 1}`] = count;
      });
      
      bins.push(bin);
    }
    
    return bins;
  }, [summaries]);
  
  const colors = [
    '#3B82F6', // blue
    '#EF4444', // red
    '#10B981', // green
    '#F59E0B', // yellow
    '#FF6B35', // orange
    '#EC4899'  // pink
  ];
  
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[250px] text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p className="font-medium">暂无数据</p>
          <p className="text-sm">请先运行仿真</p>
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
            formatter={(value: number) => [value, '次数']}
            labelFormatter={(label) => `资金区间: ${label}`}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          
          {summaries.map((_, index) => {
            const strategyName = `策略${index + 1}`;
            return (
              <Bar
                key={strategyName}
                dataKey={strategyName}
                fill={colors[index % colors.length]}
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
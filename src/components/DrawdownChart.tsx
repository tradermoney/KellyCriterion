import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { StrategySummary } from '../types/simulation';
import { generateHighContrastColors, generateStrategyDisplayName, generateStrategyShortName } from '../utils/chartUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface DrawdownChartProps {
  summaries: StrategySummary[];
  height?: number;
}

export const DrawdownChart: React.FC<DrawdownChartProps> = ({ 
  summaries, 
  height = 400 
}) => {
  const { t } = useLanguage();
  // 准备回撤数据
  const chartData = React.useMemo(() => {
    if (!summaries || summaries.length === 0) return [];
    
    // 计算每个策略的平均回撤路径
    const drawdownPaths = summaries.map(summary => {
      if (!summary.paths || summary.paths.length === 0) return [];
      
      // 找到最长的历史记录
      const maxLength = Math.max(...summary.paths.map(path => path.wealthHistory?.length || 0));
      if (maxLength === 0) return [];
      
      // 计算每个时间点的平均回撤
      const avgDrawdown = [];
      for (let i = 0; i < maxLength; i++) {
        let sumDrawdown = 0;
        let count = 0;
        
        summary.paths.forEach(path => {
          if (path.wealthHistory && i < path.wealthHistory.length) {
            // 计算到目前为止的最大财富值
            const maxWealthSoFar = Math.max(...path.wealthHistory.slice(0, i + 1));
            // 计算当前回撤比例
            const currentDrawdown = (maxWealthSoFar - path.wealthHistory[i]) / maxWealthSoFar;
            sumDrawdown += currentDrawdown;
            count++;
          }
        });
        
        if (count > 0) {
          avgDrawdown.push(sumDrawdown / count);
        }
      }
      
      return avgDrawdown;
    });
    
    // 找到最长的路径
    const maxLength = Math.max(...drawdownPaths.map(path => path.length));
    if (maxLength === 0) return [];
    
    // 构建数据点
    const data = [];
    for (let i = 0; i < maxLength; i++) {
      const point: Record<string, number> = { round: i + 1 };
      
      summaries.forEach((summary, index) => {
        if (i < drawdownPaths[index].length) {
          const strategyName = generateStrategyDisplayName(summary.strategy, index);
          point[strategyName] = drawdownPaths[index][i];
        }
      });
      
      data.push(point);
    }
    
    return data;
  }, [summaries]);
  
  // 生成高对比度颜色
  const colors = generateHighContrastColors(summaries.length);
  
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">📉</div>
          <p className="font-medium">{t.noData}</p>
          <p className="text-sm">{t.runSimulationFirst}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-slate-600" />
          <XAxis 
            dataKey="round" 
            stroke="#666"
            tick={{ fontSize: 12 }}
            className="dark:stroke-slate-400"
          />
          <YAxis 
            stroke="#666"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
            className="dark:stroke-slate-400"
          />
          <Tooltip 
            formatter={(value: number, name: string) => {
              return [`${(value * 100).toFixed(2)}%`, name];
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
          <Legend />
          
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
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
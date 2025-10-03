import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { StrategySummary } from '../types/simulation';

interface DrawdownChartProps {
  summaries: StrategySummary[];
  height?: number;
}

export const DrawdownChart: React.FC<DrawdownChartProps> = ({ 
  summaries, 
  height = 400 
}) => {
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
          const strategyName = `策略${index + 1}: ${summary.strategy.type}`;
          point[strategyName] = drawdownPaths[index][i];
        }
      });
      
      data.push(point);
    }
    
    return data;
  }, [summaries]);
  
  // 生成颜色
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
      <div className="flex items-center justify-center h-[400px] text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">📉</div>
          <p className="font-medium">暂无数据</p>
          <p className="text-sm">请先运行仿真</p>
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
            formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, '回撤']}
            labelFormatter={(label) => `第 ${label} 轮`}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          
          {summaries.map((summary, index) => {
            const strategyName = `策略${index + 1}: ${summary.strategy.type}`;
            return (
              <Line
                key={strategyName}
                type="monotone"
                dataKey={strategyName}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={false}
                name={strategyName}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { StrategySummary } from '../types/simulation';

interface WealthCurveChartProps {
  summaries: StrategySummary[];
  height?: number;
}

export const WealthCurveChart: React.FC<WealthCurveChartProps> = ({ 
  summaries, 
  height = 400 
}) => {
  // 准备图表数据
  const chartData = React.useMemo(() => {
    if (!summaries || summaries.length === 0) return [];
    
    // 计算每个策略的平均路径
    const avgPaths = summaries.map(summary => {
      if (!summary.paths || summary.paths.length === 0) return [];
      
      // 找到最长的历史记录
      const maxLength = Math.max(...summary.paths.map(path => path.wealthHistory?.length || 0));
      if (maxLength === 0) return [];
      
      // 计算每个时间点的平均值
      const avgPath = [];
      for (let i = 0; i < maxLength; i++) {
        let sum = 0;
        let count = 0;
        
        summary.paths.forEach(path => {
          if (path.wealthHistory && i < path.wealthHistory.length) {
            sum += path.wealthHistory[i];
            count++;
          }
        });
        
        if (count > 0) {
          avgPath.push(sum / count);
        }
      }
      
      return avgPath;
    });
    
    // 找到最长的路径
    const maxLength = Math.max(...avgPaths.map(path => path.length));
    if (maxLength === 0) return [];
    
    // 构建数据点
    const data = [];
    for (let i = 0; i < maxLength; i++) {
      const point: any = { round: i + 1 };
      
      summaries.forEach((summary, index) => {
        if (i < avgPaths[index].length) {
          const strategyName = `策略${index + 1}: ${summary.strategy.type}`;
          point[strategyName] = avgPaths[index][i];
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
          <div className="text-4xl mb-2">📈</div>
          <p className="font-medium">暂无数据</p>
          <p className="text-sm">请先运行仿真</p>
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
            dataKey="round" 
            stroke="#666"
            tick={{ fontSize: 12 }}
            className="dark:stroke-slate-400"
            label={{
              value: '轮次',
              position: 'bottom',
              offset: 40,
              className: 'fill-slate-600 dark:fill-slate-400 text-sm'
            }}
          />
          <YAxis 
            stroke="#666"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.toFixed(0)}
            className="dark:stroke-slate-400"
            label={{
              value: '资金',
              angle: -90,
              position: 'left',
              offset: 0,
              className: 'fill-slate-600 dark:fill-slate-400 text-sm'
            }}
          />
          <Tooltip 
            formatter={(value: number, name: string) => {
              return [`${value.toFixed(2)}`, name];
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
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
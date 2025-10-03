import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { StrategySummary } from '../types/simulation';
import { generateHighContrastColors, generateStrategyDisplayName } from '../utils/chartUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface CumulativeReturnChartProps {
  summaries: StrategySummary[];
  height?: number;
}

export const CumulativeReturnChart: React.FC<CumulativeReturnChartProps> = ({
  summaries,
  height = 300
}) => {
  const { t } = useLanguage();
  const colors = generateHighContrastColors(summaries.length);

  // 准备累积收益数据
  const chartData = React.useMemo(() => {
    if (!summaries || summaries.length === 0) return [];

    // 计算每个策略的平均累积收益路径
    const avgReturnPaths = summaries.map(summary => {
      if (!summary.paths || summary.paths.length === 0) return [];

      // 找到最长的历史记录
      const maxLength = Math.max(...summary.paths.map(path => path.wealthHistory?.length || 0));
      if (maxLength === 0) return [];

      // 计算每个时间点的平均累积收益率
      const avgReturnPath = [];
      for (let i = 0; i < maxLength; i++) {
        let sum = 0;
        let count = 0;

        summary.paths.forEach(path => {
          if (path.wealthHistory && i < path.wealthHistory.length) {
            // 计算累积收益率: (当前财富 - 初始财富) / 初始财富
            const cumulativeReturn = (path.wealthHistory[i] - path.wealthHistory[0]) / path.wealthHistory[0];
            sum += cumulativeReturn;
            count++;
          }
        });

        if (count > 0) {
          avgReturnPath.push(sum / count);
        }
      }

      return avgReturnPath;
    });

    // 找到最长的路径
    const maxLength = Math.max(...avgReturnPaths.map(path => path.length));
    if (maxLength === 0) return [];

    // 构建数据点
    const data = [];
    for (let i = 0; i < maxLength; i++) {
      const point: Record<string, number> = { round: i + 1 };

      summaries.forEach((summary, index) => {
        if (i < avgReturnPaths[index].length) {
          const strategyName = generateStrategyDisplayName(summary.strategy, index);
          point[strategyName] = avgReturnPaths[index][i];
        }
      });

      data.push(point);
    }

    return data;
  }, [summaries]);

  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">📈</div>
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
            tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
            className="dark:stroke-slate-400"
            label={{
              value: '累积收益率',
              angle: -90,
              position: 'left',
              offset: 0,
              className: 'fill-slate-600 dark:fill-slate-400 text-sm'
            }}
          />
          <Tooltip
            formatter={(value: number) => [`${(value * 100).toFixed(2)}%`]}
            labelFormatter={(label) => `${t.chartAxisLabels.round} ${label}`}
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
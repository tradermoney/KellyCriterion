import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { StrategySummary } from '../types/simulation';
import { generateHighContrastColors, generateStrategyDisplayName, generateStrategyShortName } from '../utils/chartUtils';
import { HelpTooltip } from './HelpTooltip';
import { useLanguage } from '../contexts/LanguageContext';

interface ChartPanelProps {
  summaries: StrategySummary[];
}

export const ChartPanel: React.FC<ChartPanelProps> = ({ summaries }) => {
  const { t } = useLanguage();

  if (!summaries || summaries.length === 0) {
    return (
      <div className="space-y-6">
        <div className="px-2">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200">
            📈 {t.charts.wealthCurve}
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

  const strategyColors = generateHighContrastColors(summaries.length);

  return (
    <div className="space-y-6">
      {/* 资金曲线 */}
      <div className="space-y-2">
        <div className="px-2">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200">
            <span className="text-2xl">📈</span>
            {t.charts.wealthCurve}
            <HelpTooltip helpKey="wealthCurve" />
          </h3>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 p-4 shadow-lg">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[]} margin={{ top: 20, right: 30, left: 20, bottom: 60 }} syncId="performanceCharts">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-slate-600/30" />
                <XAxis dataKey="round" stroke="#666" className="dark:stroke-slate-400"
                  label={{ value: t.chartAxisLabels.round, position: 'bottom', offset: 40, className: 'fill-slate-600 dark:fill-slate-400 text-sm' }} />
                <YAxis stroke="#666" className="dark:stroke-slate-400"
                  label={{ value: t.chartAxisLabels.wealth, angle: -90, position: 'left', className: 'fill-slate-600 dark:fill-slate-400 text-sm' }} />
                <Tooltip
                  cursor={{ stroke: '#999', strokeWidth: 1, strokeDasharray: '5 5' }}
                  isAnimationActive={false}
                  labelFormatter={(label) => `第 ${label} 轮`}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    padding: '12px 16px',
                    fontSize: '14px'
                  }}
                  wrapperStyle={{ zIndex: 1000 }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px', fontSize: '14px' }} />

                {summaries.map((summary, index) => {
                  const strategyName = generateStrategyDisplayName(summary.strategy, index);
                  const shortName = generateStrategyShortName(summary.strategy, index);
                  return (
                    <Line
                      key={strategyName}
                      type="monotone"
                      dataKey={strategyName}
                      stroke={strategyColors[index]}
                      strokeWidth={2}
                      dot={false}
                      name={shortName}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                      isAnimationActive={false}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
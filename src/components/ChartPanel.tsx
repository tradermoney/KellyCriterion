import React from 'react';
import type { StrategySummary } from '../types/simulation';
import { HelpTooltip } from './HelpTooltip';
import { useLanguage } from '../contexts/LanguageContext';
import { WealthCurveChart } from './WealthCurveChart';
import { AllPerformanceCharts } from './AllPerformanceCharts';

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

  return (
    <div className="space-y-6">
      {/* 资金曲线 */}
      <div className="space-y-2">
        <div className="px-2">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200">
            <span className="text-2xl">📈</span>
            {t.charts.wealthCurve}
            <HelpTooltip helpKey="wealthCurveChart" />
          </h3>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 p-4 shadow-lg">
          <WealthCurveChart summaries={summaries} height={300} />
        </div>
      </div>

      {/* 所有29个策略绩效分析图表 */}
      <AllPerformanceCharts summaries={summaries} />
    </div>
  );
};
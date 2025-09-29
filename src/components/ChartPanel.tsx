import React from 'react';
import { WealthCurveChart } from './WealthCurveChart';
import { HistogramChart } from './HistogramChart';
import { DrawdownChart } from './DrawdownChart';
import type { StrategySummary } from '../types/simulation';

interface ChartPanelProps {
  summaries: StrategySummary[];
}

export const ChartPanel: React.FC<ChartPanelProps> = ({ summaries }) => {
  return (
    <div className="space-y-8">
      {/* 资金曲线 */}
      <div className="space-y-4">
        <div className="px-2">
          <h3 className="flex items-center gap-3 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              📈
            </div>
            资金曲线
          </h3>
          <p className="text-base text-slate-600 dark:text-slate-400 ml-11">展示不同策略的资金增长轨迹</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-600 p-6 shadow-lg">
          <div className="h-[400px] w-full">
            <WealthCurveChart summaries={summaries} />
          </div>
        </div>
      </div>
      
      {/* 次要图表网格 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* 收益分布直方图 */}
        <div className="space-y-4">
          <div className="px-2">
            <h3 className="flex items-center gap-3 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                📊
              </div>
              收益分布
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-400 ml-11">收益率的统计分布情况</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-600 p-6 shadow-lg">
            <div className="h-[300px] w-full">
              <HistogramChart summaries={summaries} />
            </div>
          </div>
        </div>

        {/* 回撤分析 */}
        <div className="space-y-4">
          <div className="px-2">
            <h3 className="flex items-center gap-3 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-xl flex items-center justify-center text-red-600 dark:text-red-400">
                📉
              </div>
              回撤分析
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-400 ml-11">最大回撤和回撤持续时间</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-600 p-6 shadow-lg">
            <div className="h-[300px] w-full">
              <DrawdownChart summaries={summaries} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
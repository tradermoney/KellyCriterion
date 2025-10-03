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
            <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center text-slate-600 dark:text-slate-300">
              📈
            </div>
            资金曲线
          </h3>
          <p className="text-base text-slate-600 dark:text-slate-400 ml-11">展示不同策略的资金增长轨迹</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 p-6 shadow-lg">
          <div className="h-[400px] w-full">
            <WealthCurveChart summaries={summaries} />
          </div>
        </div>
      </div>

      {/* 回撤分析 */}
      <div className="space-y-4">
        <div className="px-2">
          <h3 className="flex items-center gap-3 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center text-slate-600 dark:text-slate-300">
              📉
            </div>
            回撤分析
          </h3>
          <p className="text-base text-slate-600 dark:text-slate-400 ml-11">分析各策略的风险控制能力</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 p-6 shadow-lg">
          <div className="h-[300px] w-full">
            <DrawdownChart summaries={summaries} />
          </div>
        </div>
      </div>

      {/* 下注大小分布 */}
      <div className="space-y-4">
        <div className="px-2">
          <h3 className="flex items-center gap-3 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center text-slate-600 dark:text-slate-300">
              💰
            </div>
            下注大小分布
          </h3>
          <p className="text-base text-slate-600 dark:text-slate-400 ml-11">观察不同策略的下注行为模式</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 p-6 shadow-lg">
          <div className="h-[300px] w-full">
            <HistogramChart summaries={summaries} />
          </div>
        </div>
      </div>
    </div>
  );
};
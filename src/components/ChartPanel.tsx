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
    <div className="space-y-6">
      {/* 资金曲线 */}
      <div className="space-y-2">
        <div className="px-2">
          <h3 className="flex items-center gap-4 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-1">
            <div className="w-9 h-9 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 text-lg">
              📈
            </div>
            资金曲线
          </h3>
          <p className="text-base text-slate-600 dark:text-slate-400 ml-13">展示不同策略的资金增长轨迹</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 p-4 shadow-lg">
          <div className="h-[350px] w-full">
            <WealthCurveChart summaries={summaries} />
          </div>
        </div>
      </div>

      {/* 回撤分析 */}
      <div className="space-y-2">
        <div className="px-2">
          <h3 className="flex items-center gap-4 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-1">
            <div className="w-9 h-9 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 text-lg">
              📉
            </div>
            平均回撤曲线
          </h3>
          <p className="text-base text-slate-600 dark:text-slate-400 ml-13">分析各策略的风险控制能力</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 p-4 shadow-lg">
          <div className="h-[250px] w-full">
            <DrawdownChart summaries={summaries} />
          </div>
        </div>
      </div>

      {/* 下注大小分布 */}
      <div className="space-y-2 mt-16">
        <div className="px-2">
          <h3 className="flex items-center gap-4 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-1">
            <div className="w-9 h-9 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 text-lg">
              💰
            </div>
            下注大小分布
          </h3>
          <p className="text-base text-slate-600 dark:text-slate-400 ml-13">观察不同策略的下注行为模式</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 p-4 shadow-lg">
          <div className="h-[250px] w-full">
            <HistogramChart summaries={summaries} />
          </div>
        </div>
      </div>
    </div>
  );
};
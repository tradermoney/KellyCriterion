import React from 'react';
import type { StrategySummary } from '../types/simulation';

interface StatisticsTableProps {
  summaries: StrategySummary[];
}

export const StatisticsTable: React.FC<StatisticsTableProps> = ({ summaries }) => {
  if (!summaries || summaries.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl flex items-center justify-center text-3xl">
          📊
        </div>
        <p className="text-slate-500 dark:text-slate-400">暂无数据，请先运行仿真</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-600">
                <th className="text-left py-3 px-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  策略
                </th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  最终资金
                </th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  期望收益
                </th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  标准差
                </th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  夏普比率
                </th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  最大回撤
                </th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  破产概率
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {summaries.map((summary, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <td className="py-3 px-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        策略{index + 1}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {summary.strategy.type}
                      </span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-2">
                    <span className="text-sm font-mono font-medium text-slate-800 dark:text-slate-200">
                      {summary.meanFinal.toFixed(2)}
                    </span>
                  </td>
                  <td className="text-right py-3 px-2">
                    <span className={`text-sm font-mono font-medium ${
                      ((summary.meanFinal / 100 - 1) * 100) > 0 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {((summary.meanFinal / 100 - 1) * 100).toFixed(2)}%
                    </span>
                  </td>
                  <td className="text-right py-3 px-2">
                    <span className="text-sm font-mono font-medium text-slate-800 dark:text-slate-200">
                      {Math.sqrt(summary.paths.reduce((acc, path) => acc + Math.pow(path.finalWealth - summary.meanFinal, 2), 0) / summary.paths.length).toFixed(2)}
                    </span>
                  </td>
                  <td className="text-right py-3 px-2">
                    <span className="text-sm font-mono font-medium text-slate-800 dark:text-slate-200">
                      {(summary.meanLogFinal / Math.sqrt(summary.paths.reduce((acc, path) => acc + Math.pow(Math.log(path.finalWealth) - summary.meanLogFinal, 2), 0) / summary.paths.length)).toFixed(3)}
                    </span>
                  </td>
                  <td className="text-right py-3 px-2">
                    <span className="text-sm font-mono font-medium text-red-600 dark:text-red-400">
                      {(summary.meanMDD * 100).toFixed(2)}%
                    </span>
                  </td>
                  <td className="text-right py-3 px-2">
                    <span className={`text-sm font-mono font-medium ${
                      summary.ruinRate === 0 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {(summary.ruinRate * 100).toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 移动端简化视图 */}
      <div className="md:hidden space-y-4">
        {summaries.map((summary, index) => (
          <div 
            key={index}
            className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                策略{index + 1}
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-600 px-2 py-1 rounded-full">
                {summary.strategy.type}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-slate-500 dark:text-slate-400">最终资金</span>
                <div className="font-mono font-medium text-slate-800 dark:text-slate-200">
                  {summary.meanFinal.toFixed(2)}
                </div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">期望收益</span>
                <div className={`font-mono font-medium ${
                  ((summary.meanFinal / 100 - 1) * 100) > 0 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {((summary.meanFinal / 100 - 1) * 100).toFixed(2)}%
                </div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">最大回撤</span>
                <div className="font-mono font-medium text-red-600 dark:text-red-400">
                  {(summary.meanMDD * 100).toFixed(2)}%
                </div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">破产概率</span>
                <div className={`font-mono font-medium ${
                  summary.ruinRate === 0 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {(summary.ruinRate * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
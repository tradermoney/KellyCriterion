import React from 'react';
import type { StrategySummary, StrategyConfig } from '../types/simulation';

interface StatisticsTableProps {
  summaries: StrategySummary[];
}

// 生成策略的详细描述
const getStrategyDescription = (strategy: StrategyConfig): { name: string; params: string } => {
  const { type, params } = strategy;
  
  let name = '';
  let paramsText = '';
  
  switch (type) {
    case 'kelly':
      name = '凯利公式';
      paramsText = 'f = (bp - q) / b';
      break;
    case 'fractionalKelly':
      name = '分数凯利';
      paramsText = `α = ${params?.alpha || 0.25}`;
      break;
    case 'fixedFraction':
      name = '固定比例';
      paramsText = `f = ${params?.fFixed || 0.05}`;
      break;
    case 'fixedStake':
      name = '固定注金';
      paramsText = `k = ${params?.k || 5}`;
      break;
    case 'paroli':
      name = 'Paroli策略';
      paramsText = `base = ${params?.base || 1}, r = ${params?.r || 2}`;
      break;
    case 'martingale':
      name = 'Martingale策略';
      paramsText = `base = ${params?.base || 1}`;
      break;
    default:
      name = type;
      paramsText = params ? JSON.stringify(params) : '';
  }
  
  return { name, params: paramsText };
};

export const StatisticsTable: React.FC<StatisticsTableProps> = ({ summaries }) => {
  if (!summaries || summaries.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-md flex items-center justify-center text-3xl">
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
              {summaries.map((summary, index) => {
                const { name, params } = getStrategyDescription(summary.strategy);
                return (
                  <tr 
                    key={index} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="py-3 px-2">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {name}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          {params}
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
                        ? 'text-orange-600 dark:text-orange-400' 
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
                        ? 'text-orange-600 dark:text-orange-400' 
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
        {summaries.map((summary, index) => {
          const { name, params } = getStrategyDescription(summary.strategy);
          return (
            <div 
              key={index}
              className="bg-slate-50 dark:bg-slate-700/50 rounded-md p-4 border border-slate-200 dark:border-slate-600"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                    {name}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {params}
                  </span>
                </div>
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
                    ? 'text-orange-600 dark:text-orange-400' 
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
                    ? 'text-orange-600 dark:text-orange-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {(summary.ruinRate * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};
import React from 'react';
import type { StrategySummary, StrategyConfig } from '../types/simulation';
import { generateHighContrastColors, generateStrategyShortName } from '../utils/chartUtils';
import { useLanguage } from '../contexts/LanguageContext';
import { HelpTooltip } from './HelpTooltip';

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
  const colors = generateHighContrastColors(summaries.length);
  const { t } = useLanguage();

  if (!summaries || summaries.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-[10px] flex items-center justify-center text-3xl">
          📊
        </div>
        <p className="text-slate-500 dark:text-slate-400">{t.noData}，{t.runSimulationFirst}</p>
      </div>
    );
  }

  // 计算额外的统计指标
  const calculateAdditionalStats = (summary: StrategySummary) => {
    if (!summary.paths || summary.paths.length === 0) {
      return {
        median: 0,
        percentile25: 0,
        percentile75: 0,
        percentile5: 0,
        percentile95: 0,
        min: 0,
        max: 0,
        std: 0,
        winCount: 0,
        totalPaths: 0,
      };
    }

    const finalWealths = summary.paths.map(p => p.finalWealth || 0).filter(w => !isNaN(w));
    if (finalWealths.length === 0) {
      return {
        median: 0,
        percentile25: 0,
        percentile75: 0,
        percentile5: 0,
        percentile95: 0,
        min: 0,
        max: 0,
        std: 0,
        winCount: 0,
        totalPaths: 0,
      };
    }

    const sorted = [...finalWealths].sort((a, b) => a - b);

    return {
      median: sorted[Math.floor(sorted.length / 2)] || 0,
      percentile25: sorted[Math.floor(sorted.length * 0.25)] || 0,
      percentile75: sorted[Math.floor(sorted.length * 0.75)] || 0,
      percentile5: sorted[Math.floor(sorted.length * 0.05)] || 0,
      percentile95: sorted[Math.floor(sorted.length * 0.95)] || 0,
      min: Math.min(...finalWealths) || 0,
      max: Math.max(...finalWealths) || 0,
      std: Math.sqrt(summary.paths.reduce((acc, path) =>
        acc + Math.pow((path.finalWealth || 0) - (summary.meanFinal || 0), 2), 0) / summary.paths.length) || 0,
      winCount: summary.paths.filter(p => (p.finalWealth || 0) > 1).length,
      totalPaths: summary.paths.length,
    };
  };
  
  return (
    <div className="space-y-6">
      {/* 基础绩效指标 */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="text-green-600">💰</span>
          {t.basicPerformance}
          <HelpTooltip content={t.help.basicPerformance} />
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="text-left py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-1">
                    {t.strategy}
                    <HelpTooltip content={t.help.strategy} />
                  </div>
                </th>
                <th className="text-right py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    {t.meanFinal}
                    <HelpTooltip content={t.help.meanFinal} />
                  </div>
                </th>
                <th className="text-right py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    {t.median}
                    <HelpTooltip content={t.help.median} />
                  </div>
                </th>
                <th className="text-right py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    {t.expectedReturn}
                    <HelpTooltip content={t.help.expectedReturn} />
                  </div>
                </th>
                <th className="text-right py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    {t.logReturn}
                    <HelpTooltip content={t.help.logReturn} />
                  </div>
                </th>
                <th className="text-right py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    {t.profitablePaths}
                    <HelpTooltip content={t.help.profitablePaths} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {summaries.map((summary, index) => {
                const strategyName = generateStrategyShortName(summary.strategy, index);
                const stats = calculateAdditionalStats(summary);
                return (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index] }}></div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{strategyName}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900 dark:text-gray-100">{summary.meanFinal.toFixed(2)}</td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900 dark:text-gray-100">{stats.median.toFixed(2)}</td>
                    <td className="text-right py-3 px-3 font-mono">
                      <span className={summary.meanFinal > 1 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                        {((summary.meanFinal - 1) * 100).toFixed(2)}%
                      </span>
                    </td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900 dark:text-gray-100">{summary.meanLogFinal.toFixed(3)}</td>
                    <td className="text-right py-3 px-3 font-mono">
                      <span className="text-blue-600 dark:text-blue-400">
                        {stats.winCount}/{stats.totalPaths} ({((stats.winCount / stats.totalPaths) * 100).toFixed(1)}%)
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 风险指标 */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="text-red-600">⚠️</span>
          {t.riskMetrics}
          <HelpTooltip content={t.help.riskMetrics} />
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="text-left py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-1">
                    {t.strategy}
                    <HelpTooltip content={t.help.strategy} />
                  </div>
                </th>
                <th className="text-right py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    {t.std}
                    <HelpTooltip content={t.help.std} />
                  </div>
                </th>
                <th className="text-right py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    {t.maxDrawdown}
                    <HelpTooltip content={t.help.maxDrawdown} />
                  </div>
                </th>
                <th className="text-right py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    {t.ruinRate}
                    <HelpTooltip content={t.help.ruinRate} />
                  </div>
                </th>
                <th className="text-right py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    {t.percentile5}
                    <HelpTooltip content={t.help.percentile5} />
                  </div>
                </th>
                <th className="text-right py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    {t.min}
                    <HelpTooltip content={t.help.min} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {summaries.map((summary, index) => {
                const strategyName = generateStrategyShortName(summary.strategy, index);
                const stats = calculateAdditionalStats(summary);
                return (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index] }}></div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{strategyName}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900 dark:text-gray-100">{stats.std.toFixed(2)}</td>
                    <td className="text-right py-3 px-3 font-mono">
                      <span className="text-red-600 dark:text-red-400">{(summary.meanMDD * 100).toFixed(2)}%</span>
                    </td>
                    <td className="text-right py-3 px-3 font-mono">
                      <span className={summary.ruinRate === 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                        {(summary.ruinRate * 100).toFixed(2)}%
                      </span>
                    </td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900 dark:text-gray-100">{stats.percentile5.toFixed(2)}</td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900 dark:text-gray-100">{stats.min.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 分布指标 */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="text-purple-600">📊</span>
          {t.distributionMetrics}
          <HelpTooltip content={t.help.distributionMetrics} />
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="text-left py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-1">
                    {t.strategy}
                    <HelpTooltip content={t.help.strategy} />
                  </div>
                </th>
                <th className="text-right py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    {t.percentile25}
                    <HelpTooltip content={t.help.percentile25} />
                  </div>
                </th>
                <th className="text-right py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    {t.median}
                    <HelpTooltip content={t.help.median} />
                  </div>
                </th>
                <th className="text-right py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    {t.percentile75}
                    <HelpTooltip content={t.help.percentile75} />
                  </div>
                </th>
                <th className="text-right py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    {t.percentile95}
                    <HelpTooltip content={t.help.percentile95} />
                  </div>
                </th>
                <th className="text-right py-3 px-3 font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    {t.max}
                    <HelpTooltip content={t.help.max} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {summaries.map((summary, index) => {
                const strategyName = generateStrategyShortName(summary.strategy, index);
                const stats = calculateAdditionalStats(summary);
                return (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index] }}></div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{strategyName}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900 dark:text-gray-100">{stats.percentile25.toFixed(2)}</td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900 dark:text-gray-100">{stats.median.toFixed(2)}</td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900 dark:text-gray-100">{stats.percentile75.toFixed(2)}</td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900 dark:text-gray-100">{stats.percentile95.toFixed(2)}</td>
                    <td className="text-right py-3 px-3 font-mono text-gray-900 dark:text-gray-100">{stats.max.toFixed(2)}</td>
                  </tr>
                );
              })}
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
              className="bg-slate-50 dark:bg-slate-700/50 rounded-[10px] p-4 border border-slate-200 dark:border-slate-600"
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
                <span className="text-slate-500 dark:text-slate-400">{t.finalWealth}</span>
                <div className="font-mono font-medium text-slate-800 dark:text-slate-200">
                  {summary.meanFinal.toFixed(2)}
                </div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">{t.expectedReturn}</span>
                <div className={`font-mono font-medium ${
                  ((summary.meanFinal / 100 - 1) * 100) > 0 
                    ? 'text-orange-600 dark:text-orange-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {((summary.meanFinal / 100 - 1) * 100).toFixed(2)}%
                </div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">{t.maxDrawdown}</span>
                <div className="font-mono font-medium text-red-600 dark:text-red-400">
                  {(summary.meanMDD * 100).toFixed(2)}%
                </div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">{t.ruinProbability}</span>
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
import React from 'react';
import type { StrategySummary } from '../types/simulation';
import { calculatePerformanceMetrics } from '../utils/performanceAnalysis';
import { generateStrategyShortName } from '../utils/chartUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface PerformanceAnalysisTableProps {
  summaries: StrategySummary[];
}

export const PerformanceAnalysisTable: React.FC<PerformanceAnalysisTableProps> = ({ 
  summaries 
}) => {
  const { t } = useLanguage();
  if (!summaries || summaries.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p className="font-medium">{t.noData}</p>
          <p className="text-sm">{t.runSimulationFirst}</p>
        </div>
      </div>
    );
  }

  const performanceData = summaries.map((summary, index) => {
    const metrics = calculatePerformanceMetrics(summary);
    const strategyName = generateStrategyShortName(summary.strategy, index);
    
    return {
      strategy: strategyName,
      metrics
    };
  });

  const formatPercentage = (value: number) => `${(value * 100).toFixed(2)}%`;
  const formatNumber = (value: number, decimals: number = 2) => value.toFixed(decimals);
  const formatRatio = (value: number) => value.toFixed(3);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full">
        {/* 收益指标 */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="text-green-600">📈</span>
            收益指标
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">{t.strategy}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.performanceMetrics.totalReturn}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.performanceMetrics.annualizedReturn}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.performanceMetrics.sharpeRatio}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.performanceMetrics.sortinoRatio}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {performanceData.map(({ strategy, metrics }, index) => (
                  <tr key={strategy} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                    <td className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">{strategy}</td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      <span className={metrics.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatPercentage(metrics.totalReturn)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      <span className={metrics.annualizedReturn >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatPercentage(metrics.annualizedReturn)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      <span className={metrics.sharpeRatio > 1 ? 'text-green-600' : metrics.sharpeRatio > 0 ? 'text-yellow-600' : 'text-red-600'}>
                        {formatRatio(metrics.sharpeRatio)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      <span className={metrics.sortinoRatio > 1 ? 'text-green-600' : metrics.sortinoRatio > 0 ? 'text-yellow-600' : 'text-red-600'}>
                        {formatRatio(metrics.sortinoRatio)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 风险指标 */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="text-red-600">⚠️</span>
            风险指标
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">{t.strategy}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.performanceMetrics.volatility}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.performanceMetrics.maxDrawdown}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">95% VaR</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">99% VaR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {performanceData.map(({ strategy, metrics }, index) => (
                  <tr key={strategy} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                    <td className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">{strategy}</td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      {formatPercentage(metrics.volatility)}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      <span className="text-red-600">
                        {formatPercentage(metrics.maxDrawdown)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      <span className="text-orange-600">
                        {formatNumber(metrics.var95)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      <span className="text-red-600">
                        {formatNumber(metrics.var99)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 胜率指标 */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="text-blue-600">🎯</span>
            胜率指标
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">{t.strategy}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.performanceMetrics.winRate}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.performanceMetrics.profitFactor}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.performanceMetrics.averageWin}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.performanceMetrics.averageLoss}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.performanceMetrics.winLossRatio}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {performanceData.map(({ strategy, metrics }, index) => (
                  <tr key={strategy} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                    <td className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">{strategy}</td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      <span className={metrics.winRate > 0.5 ? 'text-green-600' : 'text-red-600'}>
                        {formatPercentage(metrics.winRate)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      <span className={metrics.profitFactor > 1 ? 'text-green-600' : 'text-red-600'}>
                        {formatRatio(metrics.profitFactor)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      <span className="text-green-600">
                        {formatNumber(metrics.averageWin)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      <span className="text-red-600">
                        {formatNumber(metrics.averageLoss)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      <span className={metrics.winLossRatio > 1 ? 'text-green-600' : 'text-red-600'}>
                        {formatRatio(metrics.winLossRatio)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 分布指标 */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="text-purple-600">📊</span>
            分布指标
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">{t.strategy}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.performanceMetrics.skewness}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.performanceMetrics.kurtosis}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.percentile5}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.percentile25}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.percentile75}</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">{t.percentile95}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {performanceData.map(({ strategy, metrics }, index) => (
                  <tr key={strategy} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                    <td className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">{strategy}</td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      <span className={metrics.skewness > 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatNumber(metrics.skewness)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      <span className={metrics.kurtosis > 0 ? 'text-orange-600' : 'text-blue-600'}>
                        {formatNumber(metrics.kurtosis)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      {formatNumber(metrics.percentile5)}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      {formatNumber(metrics.percentile25)}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      {formatNumber(metrics.percentile75)}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      {formatNumber(metrics.percentile95)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

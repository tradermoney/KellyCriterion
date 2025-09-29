import React from 'react';
import { Download, FileSpreadsheet, FileCode, FileText } from 'lucide-react';
import { useSimulationStore } from "../stores/simulationStore";
import { exportToCSV, exportToJSON, formatSimulationDataForExport, generateExportFilename } from '../utils/exportUtils';
import type { StrategySummary } from '../types/simulation';

export const ExportPanel: React.FC = () => {
  const { result } = useSimulationStore();

  const hasData = result && result.summaries && result.summaries.length > 0;

  const handleExportCSV = () => {
    if (!result || !result.summaries || result.summaries.length === 0) {
      alert('没有仿真结果可导出');
      return;
    }

    try {
      const formattedData = formatSimulationDataForExport(result.summaries);
      
      // 导出不同类型的数据
      exportToCSV(formattedData.wealthCurves, generateExportFilename('wealth_curves'));
      exportToCSV(formattedData.statistics, generateExportFilename('statistics'));
      exportToCSV(formattedData.histograms, generateExportFilename('histograms'));
      exportToCSV(formattedData.drawdowns, generateExportFilename('drawdowns'));
      
      alert('CSV文件导出成功！');
    } catch (error) {
      console.error('CSV导出失败:', error);
      alert('CSV导出失败，请重试');
    }
  };

  const handleExportJSON = () => {
    if (!result || !result.summaries || result.summaries.length === 0) {
      alert('没有仿真结果可导出');
      return;
    }

    try {
      const exportData = {
        metadata: {
          exportTime: new Date().toISOString(),
          version: '1.0.0',
          description: '凯利公式仿真结果'
        },
        parameters: {
          initialWealth: result.config.initialWealth,
          winProbability: result.config.winProb,
          odds: result.config.odds,
          feeRate: result.config.feeRate,
          rounds: result.config.rounds,
          paths: result.config.paths
        },
        results: result.summaries.map((summary: StrategySummary) => ({
          strategy: summary.strategy.type,
          meanFinal: summary.meanFinal,
          medianFinal: summary.medianFinal,
          p5Final: summary.p5Final,
          ruinRate: summary.ruinRate,
          meanLogFinal: summary.meanLogFinal,
          meanMDD: summary.meanMDD,
          paths: summary.paths
        }))
      };

      exportToJSON(exportData, generateExportFilename('kelly_simulation_results'));
      alert('JSON文件导出成功！');
    } catch (error) {
      console.error('JSON导出失败:', error);
      alert('JSON导出失败，请重试');
    }
  };

  const handleExportSummary = () => {
    if (!result || !result.summaries || result.summaries.length === 0) {
      alert('没有仿真结果可导出');
      return;
    }

    try {
      const summaryText = generateSummaryReport(result.summaries);
      const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = generateExportFilename('summary_report.txt');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('报告导出成功！');
    } catch (error) {
      console.error('报告导出失败:', error);
      alert('报告导出失败，请重试');
    }
  };

  const generateSummaryReport = (summaries: StrategySummary[]) => {
    const timestamp = new Date().toLocaleString('zh-CN');
    let report = `凯利公式仿真分析报告\n`;
    report += `生成时间: ${timestamp}\n`;
    report += `${'='.repeat(60)}\n\n`;

    summaries.forEach((summary, index) => {
      report += `策略 ${index + 1}: ${summary.strategy.type}\n`;
      report += `  最终资金均值: ${summary.meanFinal.toFixed(2)}\n`;
      report += `  最终资金中值: ${summary.medianFinal.toFixed(2)}\n`;
      report += `  5%分位数: ${summary.p5Final.toFixed(2)}\n`;
      report += `  破产概率: ${(summary.ruinRate * 100).toFixed(2)}%\n`;
      report += `  平均最大回撤: ${(summary.meanMDD * 100).toFixed(2)}%\n`;
      report += `  对数收益均值: ${summary.meanLogFinal.toFixed(4)}\n`;
      report += `\n`;
    });

    return report;
  };

  return (
    <div className="space-y-3">
      {/* 导出状态提示 */}
      {!hasData && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
            <span className="text-base">ℹ️</span>
            <span className="text-sm font-medium">请先运行仿真后再进行导出操作</span>
          </div>
        </div>
      )}

      {/* 导出按钮 */}
      <div className="space-y-2">
        <button
          onClick={handleExportCSV}
          disabled={!hasData}
          className={`
            w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200
            ${!hasData 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-green-500/30'
            }
          `}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>导出 CSV 表格</span>
        </button>
        
        <button
          onClick={handleExportJSON}
          disabled={!hasData}
          className={`
            w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200
            ${!hasData 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-blue-500/30'
            }
          `}
        >
          <FileCode className="w-4 h-4" />
          <span>导出 JSON 数据</span>
        </button>
        
        <button
          onClick={handleExportSummary}
          disabled={!hasData}
          className={`
            w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200
            ${!hasData 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white shadow-md hover:shadow-purple-500/30'
            }
          `}
        >
          <FileText className="w-4 h-4" />
          <span>导出摘要报告</span>
        </button>
      </div>

      {/* 导出说明 */}
      {hasData && (
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 border border-slate-200 dark:border-slate-600">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">导出说明</h4>
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <div>• <strong>CSV 表格:</strong> 包含资金曲线、统计数据、分布直方图和回撤数据</div>
            <div>• <strong>JSON 数据:</strong> 完整的仿真结果，包含参数和路径详情</div>
            <div>• <strong>摘要报告:</strong> 策略对比的文字总结报告</div>
          </div>
        </div>
      )}
    </div>
  );
};
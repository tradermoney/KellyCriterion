import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, FileCode, FileText } from 'lucide-react';
import { useSimulationStore } from "../stores/simulationStore";
import { exportToCSV, exportToJSON, formatSimulationDataForExport, generateExportFilename } from '../utils/exportUtils';
import { storage, STORAGE_KEYS } from '../utils/storage';
import type { StrategySummary } from '../types/simulation';

interface ExportSettings {
  includeMetadata: boolean;
  includeRawData: boolean;
  filenamePrefix: string;
  lastExportTime: number | null;
}

export const ExportPanel: React.FC = () => {
  const { result } = useSimulationStore();
  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    includeMetadata: true,
    includeRawData: false,
    filenamePrefix: 'kelly_simulation',
    lastExportTime: null
  });

  const hasData = result && result.summaries && result.summaries.length > 0;

  // 加载导出设置
  useEffect(() => {
    const loadExportSettings = async () => {
      try {
        const savedSettings = await storage.getItem<ExportSettings>(STORAGE_KEYS.EXPORT_SETTINGS);
        if (savedSettings) {
          setExportSettings(savedSettings);
        }
      } catch (error) {
        console.error('加载导出设置失败:', error);
      }
    };
    loadExportSettings();
  }, []);

  // 保存导出设置
  const saveExportSettings = async (newSettings: Partial<ExportSettings>) => {
    const updatedSettings = { ...exportSettings, ...newSettings };
    setExportSettings(updatedSettings);
    try {
      await storage.setItem(STORAGE_KEYS.EXPORT_SETTINGS, updatedSettings);
    } catch (error) {
      console.error('保存导出设置失败:', error);
    }
  };

  const handleExportCSV = () => {
    if (!result || !result.summaries || result.summaries.length === 0) {
      alert('没有仿真结果可导出');
      return;
    }

    try {
      const formattedData = formatSimulationDataForExport(result.summaries);
      
      // 导出不同类型的数据
      exportToCSV(formattedData.wealthCurves, generateExportFilename(`${exportSettings.filenamePrefix}_wealth_curves`));
      exportToCSV(formattedData.statistics, generateExportFilename(`${exportSettings.filenamePrefix}_statistics`));
      exportToCSV(formattedData.histograms, generateExportFilename(`${exportSettings.filenamePrefix}_histograms`));
      exportToCSV(formattedData.drawdowns, generateExportFilename(`${exportSettings.filenamePrefix}_drawdowns`));
      
      // 保存导出时间
      saveExportSettings({ lastExportTime: Date.now() });
      
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
      const exportData: any = {
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

      // 根据设置决定是否包含元数据
      if (exportSettings.includeMetadata) {
        exportData.metadata = {
          exportTime: new Date().toISOString(),
          version: '1.0.0',
          description: '凯利公式仿真结果'
        };
      }

      // 根据设置决定是否包含原始数据
      if (exportSettings.includeRawData) {
        exportData.rawData = result.summaries;
      }

      exportToJSON(exportData, generateExportFilename(`${exportSettings.filenamePrefix}_results`));
      
      // 保存导出时间
      saveExportSettings({ lastExportTime: Date.now() });
      
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
      link.download = generateExportFilename(`${exportSettings.filenamePrefix}_summary_report.txt`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // 保存导出时间
      saveExportSettings({ lastExportTime: Date.now() });
      
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

      {/* 导出设置 */}
      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 border border-slate-200 dark:border-slate-600">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">导出设置</h4>
        
        <div className="space-y-3">
          {/* 文件名前缀 */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              文件名前缀
            </label>
            <input
              type="text"
              value={exportSettings.filenamePrefix}
              onChange={(e) => saveExportSettings({ filenamePrefix: e.target.value })}
              className="w-full px-2 py-1 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="kelly_simulation"
            />
          </div>

          {/* JSON导出选项 */}
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={exportSettings.includeMetadata}
                onChange={(e) => saveExportSettings({ includeMetadata: e.target.checked })}
                className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300">JSON包含元数据</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={exportSettings.includeRawData}
                onChange={(e) => saveExportSettings({ includeRawData: e.target.checked })}
                className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300">JSON包含原始数据</span>
            </label>
          </div>

          {/* 上次导出时间 */}
          {exportSettings.lastExportTime && (
            <div className="text-xs text-slate-500 dark:text-slate-400">
              上次导出: {new Date(exportSettings.lastExportTime).toLocaleString('zh-CN')}
            </div>
          )}
        </div>
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
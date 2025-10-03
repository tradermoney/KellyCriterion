import React from 'react';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';
import { useSimulationStore } from '../stores/simulationStore';
import { useLanguage } from '../contexts/LanguageContext';
import { HelpTooltip } from './HelpTooltip';

export const ControlPanel: React.FC = () => {
  const { 
    isRunning, 
    isPaused, 
    progress, 
    error,
    lastSimulationTime,
    autoSaveResults,
    startSimulation, 
    pauseSimulation, 
    resumeSimulation, 
    stopSimulation, 
    resetSimulation,
    setAutoSaveResults
  } = useSimulationStore();
  const { t } = useLanguage();
  
  // 获取翻译后的错误消息
  const getErrorMessage = (errorKey: string) => {
    if (errorKey === 'noStrategySelected') return t.errors.noStrategySelected;
    if (errorKey === 'simulationFailed') return t.errors.simulationFailed;
    return errorKey; // 如果不是预定义的错误键，直接返回原文本
  };

  const handleStart = async () => {
    if (isPaused) {
      await resumeSimulation();
    } else {
      await startSimulation();
    }
  };

  return (
    <div className="space-y-3">
      {/* 错误信息 */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-[10px] p-3">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <span className="text-base">⚠️</span>
            <span className="text-sm font-medium">{getErrorMessage(error)}</span>
          </div>
        </div>
      )}
      
      {/* 控制按钮 */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <button
          onClick={handleStart}
          disabled={isRunning && !isPaused}
          className={`
            flex items-center justify-center gap-2 px-4 py-3 rounded-[10px] font-bold text-base transition-all duration-200 transform hover:scale-105
            ${isRunning && !isPaused 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg hover:shadow-orange-500/40 border-2 border-orange-500'
            }
          `}
        >
          <Play size={20} />
          {isPaused ? t.continueSimulation : t.startSimulation}
        </button>

        <button
          onClick={pauseSimulation}
          disabled={!isRunning || isPaused}
          className={`
            flex items-center justify-center gap-2 px-3 py-2 rounded-[10px] font-medium text-sm transition-all duration-200
            ${!isRunning || isPaused
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md hover:shadow-amber-500/40'
            }
          `}
        >
          <Pause size={16} />
          {t.pauseSimulation}
        </button>

        <button
          onClick={stopSimulation}
          disabled={!isRunning}
          className={`
            flex items-center justify-center gap-2 px-3 py-2 rounded-[10px] font-medium text-sm transition-all duration-200
            ${!isRunning 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-red-500/40'
            }
          `}
        >
          <Square size={16} />
          {t.stopSimulation}
        </button>

        <button
          onClick={resetSimulation}
          disabled={isRunning}
          className={`
            flex items-center justify-center gap-2 px-3 py-2 rounded-[10px] font-medium text-sm transition-all duration-200
            ${isRunning 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white shadow-md hover:shadow-slate-500/40'
            }
          `}
        >
          <RotateCcw size={16} />
          {t.resetSimulation}
        </button>
      </div>

      {/* 进度条 */}
      {isRunning && (
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-[10px] p-3 border border-slate-200 dark:border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t.simulationProgress}
            </span>
            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
              {Math.round(progress * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 transition-all duration-300 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* 设置和状态信息 */}
      <div className="space-y-2">
        {/* 自动保存设置 */}
        <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700/50 rounded-[10px] border border-slate-200 dark:border-slate-600">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
              💾 {t.autoSaveResults}
              <HelpTooltip content={t.help.autoSave} />
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoSaveResults}
              onChange={(e) => setAutoSaveResults(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
          </label>
        </div>

        {/* 上次仿真时间 */}
        {lastSimulationTime && (
          <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-[10px] border border-green-200 dark:border-green-800/50">
            <span className="text-sm text-green-600 dark:text-green-400">
              ✅ {t.lastSimulation}: {new Date(lastSimulationTime).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
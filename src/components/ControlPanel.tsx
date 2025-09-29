import React from 'react';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';
import { useSimulationStore } from '../stores/simulationStore';

export const ControlPanel: React.FC = () => {
  const { 
    isRunning, 
    isPaused, 
    progress, 
    error,
    startSimulation, 
    pauseSimulation, 
    resumeSimulation, 
    stopSimulation, 
    resetSimulation 
  } = useSimulationStore();

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
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <span className="text-base">⚠️</span>
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}
      
      {/* 控制按钮 */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <button
          onClick={handleStart}
          disabled={isRunning && !isPaused}
          className={`
            flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-base transition-all duration-200 transform hover:scale-105
            ${isRunning && !isPaused 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-blue-500/40 border-2 border-blue-500'
            }
          `}
        >
          <Play className="w-5 h-5" />
          <span>{isPaused ? '🔄 继续仿真' : '🚀 开始仿真'}</span>
        </button>
        
        <button
          onClick={pauseSimulation}
          disabled={!isRunning || isPaused}
          className={`
            flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200
            ${!isRunning || isPaused 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-md hover:shadow-orange-500/30'
            }
          `}
        >
          <Pause className="w-4 h-4" />
          <span>暂停</span>
        </button>
        
        <button
          onClick={stopSimulation}
          disabled={!isRunning}
          className={`
            flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200
            ${!isRunning 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-md hover:shadow-red-500/30'
            }
          `}
        >
          <Square className="w-4 h-4" />
          <span>停止</span>
        </button>
        
        <button
          onClick={resetSimulation}
          disabled={isRunning}
          className={`
            flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200
            ${isRunning 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white shadow-md hover:shadow-slate-500/30'
            }
          `}
        >
          <RotateCcw className="w-4 h-4" />
          <span>重置</span>
        </button>
      </div>
      
      {/* 进度条 */}
      {isRunning && (
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 border border-slate-200 dark:border-slate-600">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">仿真进度</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
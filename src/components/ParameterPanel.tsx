import React from 'react';
import { ParameterSlider } from './ParameterSlider';
import { StrategySelector } from './StrategySelector';
import { useSimulationStore } from '../stores/simulationStore';

export const ParameterPanel: React.FC = () => {
  const { 
    config, 
    setConfig, 
    addStrategy, 
    removeStrategy, 
    updateStrategy 
  } = useSimulationStore();

  return (
    <div className="space-y-3">
      {/* 基础参数 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-3 sm:p-4 border border-blue-200/50 dark:border-slate-600/50 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center shadow-sm">
            <span className="text-white text-xs font-bold">📊</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">基础参数</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">配置仿真基础设置</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {/* 初始资金 */}
          <div className="space-y-2">
            <label className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">初始资金</span>
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold rounded">
                ¥{config.initialWealth.toLocaleString()}
              </span>
            </label>
            <input
              type="number"
              value={config.initialWealth}
              onChange={(e) => setConfig({ initialWealth: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="输入初始资金"
            />
          </div>

          {/* 仿真次数 */}
          <div className="space-y-2">
            <label className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">仿真次数</span>
              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-bold rounded">
                {config.paths.toLocaleString()} 次
              </span>
            </label>
            <input
              type="number"
              value={config.paths}
              onChange={(e) => setConfig({ paths: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="输入仿真次数"
            />
          </div>

          {/* 胜率 */}
          <div className="space-y-2">
            <ParameterSlider
              label="胜率"
              value={config.winProb}
              onChange={(value) => setConfig({ winProb: value })}
              min={0}
              max={1}
              step={0.01}
              unit="%"
              decimals={2}
            />
          </div>

          {/* 赔率 */}
          <div className="space-y-2">
            <ParameterSlider
              label="赔率"
              value={config.odds}
              onChange={(value) => setConfig({ odds: value })}
              min={0.1}
              max={10}
              step={0.1}
              unit=":1"
              decimals={1}
            />
          </div>

          {/* 手续费率 */}
          <div className="space-y-2">
            <ParameterSlider
              label="手续费率"
              value={config.feeRate}
              onChange={(value) => setConfig({ feeRate: value })}
              min={0}
              max={0.1}
              step={0.001}
              unit="%"
              decimals={3}
            />
          </div>

          {/* 最大下注比例 */}
          <div className="space-y-2">
            <ParameterSlider
              label="最大下注比例"
              value={config.fMax}
              onChange={(value) => setConfig({ fMax: value })}
              min={0}
              max={1}
              step={0.01}
              unit="%"
              decimals={2}
            />
          </div>
        </div>

        {/* 重置按钮 */}
        <div className="flex justify-end mt-3">
          <button
            onClick={() => setConfig({
              initialWealth: 100,
              paths: 1000,
              winProb: 0.55,
              odds: 1,
              feeRate: 0,
              fMax: 1
            })}
            className="px-3 py-1.5 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1"
          >
            🔄 重置为默认值
          </button>
        </div>
      </div>

      {/* 策略选择 */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-3 sm:p-4 border border-amber-200/50 dark:border-slate-600/50 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-md flex items-center justify-center shadow-sm">
            <span className="text-white text-xs font-bold">🎯</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">策略选择</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">选择投资策略类型</p>
          </div>
        </div>
        
        <StrategySelector 
          strategies={config.strategies}
          onAddStrategy={addStrategy}
          onRemoveStrategy={removeStrategy}
          onUpdateStrategy={updateStrategy}
        />
      </div>
    </div>
  );
};
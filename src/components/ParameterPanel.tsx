import React from 'react';
import { ParameterSlider } from './ParameterSlider';
import { StrategySelector } from './StrategySelector';
import { HelpTooltip } from './HelpTooltip';
import { useSimulationStore } from '../stores/simulationStore';
import { useLanguage } from '../contexts/LanguageContext';

export const ParameterPanel: React.FC = () => {
  const { 
    config, 
    setConfig, 
    addStrategy, 
    removeStrategy, 
    updateStrategy,
    resetToDefault
  } = useSimulationStore();
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
      {/* 基础参数 */}
      <div className="bg-white dark:bg-gray-800 rounded-[10px] border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden transition-all duration-300">
        <div className="bg-gray-700 p-2 sm:p-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 bg-white/20 rounded-[10px] flex items-center justify-center text-sm">📊</span>
            {t.parameters}
          </h2>
          <p className="text-gray-200 text-xs mt-0.5">{t.parametersDesc}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-3 sm:p-4">
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {/* 初始资金 */}
            <div className="space-y-2">
              <label className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  {t.initialWealth}
                  <HelpTooltip content={t.help.initialWealth} />
                </span>
                <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 text-xs font-bold rounded-[10px]">
                  ¥{config.initialWealth.toLocaleString()}
                </span>
              </label>
              <input
                type="number"
                value={config.initialWealth}
                onChange={(e) => setConfig({ initialWealth: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-[10px] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 shadow-sm"
                placeholder={t.inputInitialWealth}
              />
            </div>

            {/* 仿真次数 */}
            <div className="space-y-2">
              <label className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  {t.paths}
                  <HelpTooltip content={t.help.paths} />
                </span>
                <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 text-xs font-bold rounded-[10px]">
                  {config.paths.toLocaleString()} {t.timesUnit}
                </span>
              </label>
              <input
                type="number"
                value={config.paths}
                onChange={(e) => setConfig({ paths: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-[10px] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 shadow-sm"
                placeholder={t.inputSimulationTimes}
              />
            </div>

            {/* 胜率 */}
            <div className="space-y-2">
              <ParameterSlider
                label={t.winProb}
                value={config.winProb}
                onChange={(value) => setConfig({ winProb: value })}
                min={0}
                max={1}
                step={0.01}
                unit="%"
                decimals={2}
                helpText={t.help.winProb}
              />
            </div>

            {/* 赔率 */}
            <div className="space-y-2">
              <ParameterSlider
                label={t.odds}
                value={config.odds}
                onChange={(value) => setConfig({ odds: value })}
                min={0.1}
                max={10}
                step={0.1}
                unit={t.oddsUnit}
                decimals={1}
                helpText={t.help.odds}
              />
            </div>

            {/* 手续费率 */}
            <div className="space-y-2">
              <ParameterSlider
                label={t.feeRate}
                value={config.feeRate}
                onChange={(value) => setConfig({ feeRate: value })}
                min={0}
                max={0.1}
                step={0.001}
                unit="%"
                decimals={3}
                helpText={t.help.feeRate}
              />
            </div>

            {/* 最大下注比例 */}
            <div className="space-y-2">
              <ParameterSlider
                label={t.fMax}
                value={config.fMax}
                onChange={(value) => setConfig({ fMax: value })}
                min={0}
                max={1}
                step={0.01}
                unit="%"
                decimals={2}
                helpText={t.help.fMax}
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
              className="px-3 py-1.5 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white text-sm font-semibold rounded-[10px] shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1"
            >
              🔄 {t.resetParameters}
            </button>
          </div>
        </div>
      </div>

      {/* 策略选择 */}
      <div className="bg-white dark:bg-gray-800 rounded-[10px] border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden transition-all duration-300">
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-2 sm:p-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 bg-white/20 rounded-[10px] flex items-center justify-center text-sm">🎯</span>
            {t.strategySelection}
          </h2>
          <p className="text-slate-200 text-xs mt-0.5">{t.strategySelectionDesc}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-3 sm:p-4">
          <StrategySelector 
            strategies={config.strategies}
            onAddStrategy={addStrategy}
            onRemoveStrategy={removeStrategy}
            onUpdateStrategy={updateStrategy}
            onResetToDefault={resetToDefault}
          />
        </div>
      </div>
    </div>
  );
};
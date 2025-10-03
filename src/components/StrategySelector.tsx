import React from 'react';
import { Plus, X } from 'lucide-react';
import type { StrategyConfig, StrategyType } from '../types/simulation';
import { HelpTooltip } from './HelpTooltip';
import { useLanguage } from '../contexts/LanguageContext';

interface StrategySelectorProps {
  strategies: StrategyConfig[];
  onAddStrategy: (strategy: StrategyConfig) => void;
  onRemoveStrategy: (index: number) => void;
  onUpdateStrategy: (index: number, strategy: StrategyConfig) => void;
  onResetToDefault?: () => void;
}

const STRATEGY_ICONS: Record<StrategyType, { icon: string; color: string }> = {
  kelly: { icon: '🎯', color: 'orange' },
  fractionalKelly: { icon: '📊', color: 'orange' },
  fixedFraction: { icon: '⚖️', color: 'orange' },
  fixedStake: { icon: '💰', color: 'orange' },
  paroli: { icon: '📈', color: 'orange' },
  martingale: { icon: '📉', color: 'orange' }
};

const getColorClasses = (color: string) => {
  const colors = {
    orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
  };
  return colors[color as keyof typeof colors] || colors.orange;
};

const StrategyItem: React.FC<{
  strategy: StrategyConfig;
  index: number;
  onUpdate: (strategy: StrategyConfig) => void;
  onRemove: () => void;
  canRemove: boolean;
}> = ({ strategy, onUpdate, onRemove, canRemove }) => {
  const { t } = useLanguage();
  const strategyIcon = STRATEGY_ICONS[strategy.type];
  const strategyLabel = t.strategyTypes[strategy.type] || t.unknownStrategy;
  const strategyDesc = t.strategyDescriptions[strategy.type] || '';
  
  return (
    <div className="bg-white dark:bg-slate-700 rounded-[10px] border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-all duration-200 p-1">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <div className={`w-5 h-5 rounded-[10px] bg-gradient-to-br ${getColorClasses(strategyIcon?.color || 'orange')} flex items-center justify-center shadow-md`}>
            <span className="text-white text-xs">{strategyIcon?.icon || '🎯'}</span>
          </div>
          <div className="flex items-center gap-1">
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-xs">{strategyLabel}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">{strategyDesc}</p>
            </div>
            <HelpTooltip content={t.help.strategyCard} />
          </div>
        </div>
        {canRemove && (
          <button
            onClick={onRemove}
            className="w-4 h-4 text-slate-400 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-[10px] flex items-center justify-center transition-all duration-200 opacity-60 hover:opacity-100"
          >
            <X size={10} />
          </button>
        )}
      </div>

      {/* 分数凯利特有参数 */}
      {strategy.type === 'fractionalKelly' && (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-[10px] p-1.5 space-y-0.5">
          <label className="block">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-0.5 flex items-center gap-1">
              {t.kellyFraction} ({strategy.params?.alpha || 0.5})
              <HelpTooltip content={t.help.alphaParam} />
            </span>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={strategy.params?.alpha || 0.5}
              onChange={(e) => onUpdate({ ...strategy, params: { ...strategy.params, alpha: Number(e.target.value) } })}
              className="w-full px-1.5 py-0.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-[10px] text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </label>
        </div>
      )}

      {/* 固定比例特有参数 */}
      {strategy.type === 'fixedFraction' && (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-[10px] p-1.5 space-y-0.5">
          <label className="block">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-0.5 flex items-center gap-1">
              {t.strategyParams.fFixed} ({((strategy.params?.fFixed || 0.1) * 100).toFixed(1)}%)
              <HelpTooltip content={t.help.fFixedParam} />
            </span>
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={strategy.params?.fFixed || 0.1}
              onChange={(e) => onUpdate({ ...strategy, params: { ...strategy.params, fFixed: Number(e.target.value) } })}
              className="w-full px-1.5 py-0.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-[10px] text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </label>
        </div>
      )}

      {/* 固定注金特有参数 */}
      {strategy.type === 'fixedStake' && (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-[10px] p-1.5 space-y-0.5">
          <label className="block">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-0.5 flex items-center gap-1">
              {t.strategyParams.k} (¥{strategy.params?.base || 10})
              <HelpTooltip content={t.help.baseParam} />
            </span>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={strategy.params?.base || 10}
              onChange={(e) => onUpdate({ ...strategy, params: { ...strategy.params, base: Number(e.target.value) } })}
              className="w-full px-1.5 py-0.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-[10px] text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </label>
        </div>
      )}

      {/* Paroli策略特有参数 */}
      {strategy.type === 'paroli' && (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-[10px] p-1.5 space-y-1">
          <label className="block">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-0.5 flex items-center gap-1">
              {t.strategyParams.base} (¥{strategy.params?.base || 1})
              <HelpTooltip content={t.help.baseParam} />
            </span>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={strategy.params?.base || 1}
              onChange={(e) => onUpdate({ ...strategy, params: { ...strategy.params, base: Number(e.target.value) } })}
              className="w-full px-1.5 py-0.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-[10px] text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-0.5 flex items-center gap-1">
              {t.strategyParams.r} ({strategy.params?.r || 2}x)
              <HelpTooltip content={t.help.rParam} />
            </span>
            <input
              type="range"
              min="1.5"
              max="5"
              step="0.5"
              value={strategy.params?.r || 2}
              onChange={(e) => onUpdate({ ...strategy, params: { ...strategy.params, r: Number(e.target.value) } })}
              className="w-full px-1.5 py-0.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-[10px] text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </label>
        </div>
      )}

      {/* Martingale策略特有参数 */}
      {strategy.type === 'martingale' && (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-[10px] p-1.5 space-y-0.5">
          <label className="block">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-0.5 flex items-center gap-1">
              {t.strategyParams.base} (¥{strategy.params?.base || 1})
              <HelpTooltip content={t.help.baseParam} />
            </span>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={strategy.params?.base || 1}
              onChange={(e) => onUpdate({ ...strategy, params: { ...strategy.params, base: Number(e.target.value) } })}
              className="w-full px-1.5 py-0.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-[10px] text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </label>
          <div className="mt-1 px-2 py-1 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-[10px] text-xs text-red-600 dark:text-red-400">
            {t.highRiskWarning}
          </div>
        </div>
      )}
    </div>
  );
};

export const StrategySelector: React.FC<StrategySelectorProps> = ({ 
  strategies, 
  onAddStrategy, 
  onRemoveStrategy, 
  onUpdateStrategy,
  onResetToDefault
}) => {
  const { t } = useLanguage();
  const [selectedStrategyType, setSelectedStrategyType] = React.useState<StrategyType>('kelly');

     const handleAddStrategy = () => {
     let strategy: StrategyConfig = {
       type: selectedStrategyType
     };

     switch (selectedStrategyType) {
       case 'fractionalKelly':
         strategy.params = { alpha: 0.5 };
         break;
       case 'fixedFraction':
         strategy.params = { fFixed: 0.1 };
         break;
       case 'fixedStake':
         strategy.params = { base: 10 };
         break;
       case 'paroli':
         strategy.params = { base: 1, r: 2 };
         break;
       case 'martingale':
         strategy.params = { base: 1 };
         break;
       default:
         strategy.params = {};
     }

     onAddStrategy(strategy);
   };

  return (
    <div className="space-y-4">
      {/* 现有策略列表 */}
      <div className="space-y-1">
                 {strategies.map((strategy, index) => (
           <StrategyItem
             key={index}
             strategy={strategy}
             index={index}
             onUpdate={(updatedStrategy) => onUpdateStrategy(index, updatedStrategy)}
             onRemove={() => onRemoveStrategy(index)}
             canRemove={strategies.length > 1}
           />
         ))}
      </div>

      {/* 添加策略区域 */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleAddStrategy}
          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-[10px] shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          <Plus size={16} className="inline mr-1.5" />
          {t.addStrategy}
        </button>
        {onResetToDefault && (
          <button
            onClick={onResetToDefault}
            className="px-4 py-2.5 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-[10px] shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            title={t.resetToDefault}
          >
            🔄
          </button>
        )}
      </div>

      {/* 策略选择提示 */}
      <div className="text-center py-6 bg-slate-50 dark:bg-slate-800 rounded-[10px] border-2 border-dashed border-slate-300 dark:border-slate-600">
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
          {t.selectStrategyType}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {(Object.keys(STRATEGY_ICONS) as StrategyType[]).map((strategyType) => {
            const icon = STRATEGY_ICONS[strategyType];
            const label = t.strategyTypes[strategyType];
            const description = t.strategyDescriptions[strategyType];
            return (
              <button
                key={strategyType}
                onClick={() => setSelectedStrategyType(strategyType)}
                className={`p-3 text-left rounded-[10px] border-2 transition-all duration-200 ${
                  selectedStrategyType === strategyType
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-7 h-7 bg-gradient-to-br from-amber-500 to-orange-600 rounded-[10px] flex items-center justify-center text-white text-sm">{icon.icon}</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">{label}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 ml-9">{description}</p>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
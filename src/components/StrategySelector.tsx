import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, Plus, X } from 'lucide-react';
import type { StrategyConfig, StrategyType } from '../types/simulation';

interface StrategySelectorProps {
  strategies: StrategyConfig[];
  onAddStrategy: (strategy: StrategyConfig) => void;
  onRemoveStrategy: (index: number) => void;
  onUpdateStrategy: (index: number, strategy: StrategyConfig) => void;
}

const STRATEGY_OPTIONS: { value: StrategyType; label: string; description: string; icon: string; color: string }[] = [
  { value: 'kelly', label: '凯利公式', description: '最优下注比例策略', icon: '🎯', color: 'orange' },
  { value: 'fractionalKelly', label: '分数凯利', description: '保守的凯利公式变种', icon: '📊', color: 'orange' },
  { value: 'fixedFraction', label: '固定比例', description: '固定资金比例下注', icon: '⚖️', color: 'orange' },
  { value: 'fixedStake', label: '固定注金', description: '固定金额下注', icon: '💰', color: 'orange' },
  { value: 'paroli', label: 'Paroli', description: '盈利时加倍下注', icon: '📈', color: 'orange' },
  { value: 'martingale', label: 'Martingale', description: '亏损时加倍下注', icon: '📉', color: 'orange' }
];

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
  const strategyOption = STRATEGY_OPTIONS.find(opt => opt.value === strategy.type);
  
  return (
    <div className="bg-white dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-all duration-200 p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${getColorClasses(strategyOption?.color || 'blue')} flex items-center justify-center shadow-md`}>
            <span className="text-white text-sm">{strategyOption?.icon || '🎯'}</span>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{strategyOption?.label || '未知策略'}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">{strategyOption?.description || ''}</p>
          </div>
        </div>
        {canRemove && (
          <button
            onClick={onRemove}
            className="w-6 h-6 text-slate-400 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-md flex items-center justify-center transition-all duration-200 opacity-60 hover:opacity-100"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* 分数凯利特有参数 */}
      {strategy.type === 'fractionalKelly' && (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-md p-3 space-y-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">
              凯利分数 ({strategy.params?.alpha || 0.5})
            </span>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={strategy.params?.alpha || 0.5}
              onChange={(e) => onUpdate({ ...strategy, params: { ...strategy.params, alpha: Number(e.target.value) } })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </label>
        </div>
      )}

      {/* 固定比例特有参数 */}
      {strategy.type === 'fixedFraction' && (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-md p-3 space-y-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">
              固定比例 ({((strategy.params?.fFixed || 0.1) * 100).toFixed(1)}%)
            </span>
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={strategy.params?.fFixed || 0.1}
              onChange={(e) => onUpdate({ ...strategy, params: { ...strategy.params, fFixed: Number(e.target.value) } })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </label>
        </div>
      )}

      {/* 固定注金特有参数 */}
      {strategy.type === 'fixedStake' && (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-md p-3 space-y-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">
              固定注金 (¥{strategy.params?.base || 10})
            </span>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={strategy.params?.base || 10}
              onChange={(e) => onUpdate({ ...strategy, params: { ...strategy.params, base: Number(e.target.value) } })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export const StrategySelector: React.FC<StrategySelectorProps> = ({ 
  strategies, 
  onAddStrategy, 
  onRemoveStrategy, 
  onUpdateStrategy 
}) => {
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
       default:
         strategy.params = {};
     }

     onAddStrategy(strategy);
   };

  return (
    <div className="space-y-4">
      {/* 现有策略列表 */}
      <div className="space-y-3">
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
          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          <Plus size={16} className="inline mr-1.5" />
          添加策略
        </button>
      </div>

      {/* 策略选择提示 */}
      <div className="text-center py-6 bg-slate-50 dark:bg-slate-800 rounded-md border-2 border-dashed border-slate-300 dark:border-slate-600">
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
          选择要添加的策略类型
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {STRATEGY_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedStrategyType(option.value)}
              className={`p-3 text-left rounded-md border-2 transition-all duration-200 ${
                selectedStrategyType === option.value
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                  : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-7 h-7 bg-gradient-to-br from-amber-500 to-orange-600 rounded-md flex items-center justify-center text-white text-sm">🎯</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">{option.label}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 ml-9">{option.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 策略选择下拉菜单（备用方案，当前隐藏） */}
      <div className="hidden">
        <Select.Root value={selectedStrategyType} onValueChange={(value) => setSelectedStrategyType(value as StrategyType)}>
          <Select.Trigger className="flex items-center justify-between w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
            <Select.Value />
            <Select.Icon>
              <ChevronDown size={16} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md shadow-lg z-50">
              <Select.Viewport>
                {STRATEGY_OPTIONS.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className={`p-3 text-left bg-gradient-to-br ${getColorClasses(option.color)} text-white rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 group`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-md flex items-center justify-center text-lg">
                        {option.icon}
                      </div>
                      <div>
                        <Select.ItemText className="font-semibold">{option.label}</Select.ItemText>
                        <p className="text-sm opacity-90">{option.description}</p>
                      </div>
                    </div>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        
        <button
          onClick={() => setSelectedStrategyType('kelly')}
          className="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          重置选择
        </button>
      </div>
    </div>
  );
};
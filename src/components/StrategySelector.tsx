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
  { value: 'kelly', label: '凯利公式', description: '最优下注比例策略', icon: '🎯', color: 'blue' },
  { value: 'fractionalKelly', label: '分数凯利', description: '保守的凯利公式变种', icon: '📊', color: 'green' },
  { value: 'fixedFraction', label: '固定比例', description: '固定资金比例下注', icon: '⚖️', color: 'purple' },
  { value: 'fixedStake', label: '固定注金', description: '固定金额下注', icon: '💰', color: 'orange' },
  { value: 'paroli', label: 'Paroli', description: '盈利时加倍下注', icon: '📈', color: 'emerald' },
  { value: 'martingale', label: 'Martingale', description: '亏损时加倍下注', icon: '📉', color: 'red' }
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
    emerald: 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
    red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

const StrategyItem: React.FC<{
  strategy: StrategyConfig;
  index: number;
  onUpdate: (strategy: StrategyConfig) => void;
  onRemove: () => void;
}> = ({ strategy, index, onUpdate, onRemove }) => {
  const strategyOption = STRATEGY_OPTIONS.find(opt => opt.value === strategy.type);
  
  return (
    <div className="bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-all duration-200 p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getColorClasses(strategyOption?.color || 'blue')} flex items-center justify-center shadow-md`}>
            <span className="text-white text-sm">{strategyOption?.icon || '🎯'}</span>
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
              {strategyOption?.label || strategy.type}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {strategyOption?.description}
            </p>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="w-7 h-7 bg-red-100 hover:bg-red-200 dark:bg-red-900/50 dark:hover:bg-red-900/70 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center transition-all duration-200"
        >
          <X size={14} />
        </button>
      </div>
      
      {/* 策略参数 */}
      {strategy.type === 'fractionalKelly' && (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 space-y-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Alpha系数 (保守程度)
          </label>
          <input
            type="number"
            min="0.1"
            max="1"
            step="0.1"
            value={strategy.params?.alpha || 0.5}
            onChange={(e) => onUpdate({
              ...strategy,
              params: { ...strategy.params, alpha: parseFloat(e.target.value) }
            })}
            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            0.1 = 非常保守, 1.0 = 完整凯利
          </p>
        </div>
      )}
      
      {strategy.type === 'fixedFraction' && (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 space-y-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            固定下注比例
          </label>
          <input
            type="number"
            min="0.01"
            max="1"
            step="0.01"
            value={strategy.params?.fFixed || 0.1}
            onChange={(e) => onUpdate({
              ...strategy,
              params: { ...strategy.params, fFixed: parseFloat(e.target.value) }
            })}
            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            每次下注总资金的固定比例
          </p>
        </div>
      )}
      
      {strategy.type === 'fixedStake' && (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 space-y-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            固定下注金额
          </label>
          <input
            type="number"
            min="1"
            max="100"
            step="1"
            value={strategy.params?.base || 10}
            onChange={(e) => onUpdate({
              ...strategy,
              params: { ...strategy.params, base: parseFloat(e.target.value) }
            })}
            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            每次下注的固定金额
          </p>
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
  const [isAdding, setIsAdding] = React.useState(false);
  
  const handleAddStrategy = (type: StrategyType) => {
    let params = {};
    
    switch (type) {
      case 'fractionalKelly':
        params = { alpha: 0.5 };
        break;
      case 'fixedFraction':
        params = { fFixed: 0.1 };
        break;
      case 'fixedStake':
        params = { base: 10 };
        break;
    }
    
    onAddStrategy({ type, params });
    setIsAdding(false);
  };
  
  return (
    <div className="space-y-3">
      {/* 添加策略按钮 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            已选策略: {strategies.length} 个
          </span>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          <Plus size={14} />
          <span>添加策略</span>
        </button>
      </div>
      
      {/* 策略列表 */}
      <div className="space-y-3">
        {strategies.length === 0 ? (
          <div className="text-center py-6 bg-slate-50 dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">暂未选择策略</p>
            <p className="text-sm text-slate-500 dark:text-slate-500">点击"添加策略"开始配置</p>
          </div>
        ) : (
          strategies.map((strategy, index) => (
            <StrategyItem
              key={index}
              strategy={strategy}
              index={index}
              onUpdate={(updatedStrategy) => onUpdateStrategy(index, updatedStrategy)}
              onRemove={() => onRemoveStrategy(index)}
            />
          ))
        )}
      </div>
      
      {/* 添加策略模态框 */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span className="w-7 h-7 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-sm">🎯</span>
                选择投资策略
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                选择一个策略添加到仿真中
              </p>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {STRATEGY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAddStrategy(option.value)}
                    className={`p-3 text-left bg-gradient-to-br ${getColorClasses(option.color)} text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 group`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-lg">
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-bold mb-1">{option.label}</div>
                        <div className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                          {option.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 rounded-b-xl">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
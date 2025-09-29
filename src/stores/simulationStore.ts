import { create } from 'zustand';
import type { 
  SimulationConfig, 
  StrategyConfig, 
  StrategySummary, 
  StrategyType,
  SimulationResult 
} from '../types/simulation';
import { KellySimulator } from '../core/simulator';
import { StatisticsCalculator } from '../core/statistics';

interface SimulationState {
  // 配置
  config: SimulationConfig;
  
  // 结果
  result: SimulationResult | null;
  
  // UI状态
  isRunning: boolean;
  isPaused: boolean;
  progress: number;
  currentBatch: number;
  totalBatches: number;
  
  // 错误状态
  error: string | null;
  
  // 动作
  setConfig: (config: Partial<SimulationConfig>) => void;
  addStrategy: (strategy: StrategyConfig) => void;
  removeStrategy: (index: number) => void;
  updateStrategy: (index: number, strategy: StrategyConfig) => void;
  
  startSimulation: () => Promise<void>;
  pauseSimulation: () => void;
  resumeSimulation: () => Promise<void>;
  stopSimulation: () => void;
  resetSimulation: () => void;
  
  setError: (error: string | null) => void;
}

// 默认配置
const defaultConfig: SimulationConfig = {
  initialWealth: 100,
  rounds: 100,
  winProb: 0.55,
  odds: 1,
  feeRate: 0,
  fMax: 1,
  ruinThreshold: 1,
  paths: 1000,
  batchSize: 100,
  strategies: [
    {
      type: 'kelly'
    },
    {
      type: 'fractionalKelly',
      params: { alpha: 0.5 }
    },
    {
      type: 'fixedFraction',
      params: { fFixed: 0.1 }
    }
  ]
};

export const useSimulationStore = create<SimulationState>((set, get) => ({
  config: { ...defaultConfig },
  result: null,
  isRunning: false,
  isPaused: false,
  progress: 0,
  currentBatch: 0,
  totalBatches: 0,
  error: null,

  setConfig: (configUpdate) => {
    set((state) => ({
      config: { ...state.config, ...configUpdate }
    }));
  },

  addStrategy: (strategy) => {
    set((state) => ({
      config: {
        ...state.config,
        strategies: [...state.config.strategies, strategy]
      }
    }));
  },

  removeStrategy: (index) => {
    set((state) => ({
      config: {
        ...state.config,
        strategies: state.config.strategies.filter((_, i) => i !== index)
      }
    }));
  },

  updateStrategy: (index, strategy) => {
    set((state) => {
      const newStrategies = [...state.config.strategies];
      newStrategies[index] = strategy;
      return {
        config: {
          ...state.config,
          strategies: newStrategies
        }
      };
    });
  },

  startSimulation: async () => {
    const { config, setError } = get();
    
    if (config.strategies.length === 0) {
      setError('请至少选择一个策略');
      return;
    }

    set({ 
      isRunning: true, 
      isPaused: false, 
      progress: 0, 
      error: null,
      currentBatch: 0,
      totalBatches: Math.ceil(config.paths / config.batchSize)
    });

    try {
      const simulator = new KellySimulator(config.seed);
      const allResults: StrategySummary[] = [];
      
      // 分批处理
      for (let batch = 0; batch < get().totalBatches; batch++) {
        if (get().isPaused) {
          break;
        }
        
        const startPath = batch * config.batchSize;
        const endPath = Math.min(startPath + config.batchSize, config.paths);
        const batchPaths = endPath - startPath;
        
        // 运行当前批次的蒙特卡洛仿真
        const batchResults = simulator.simulateMonteCarlo(
          config.strategies,
          config,
          batchPaths
        );
        
        // 计算每个策略的统计摘要
        const batchSummaries = batchResults.map((results, index) => {
          return StatisticsCalculator.calculateStrategySummary(
            config.strategies[index],
            results
          );
        });
        
        allResults.push(...batchSummaries);
        
        set({
          currentBatch: batch + 1,
          progress: ((batch + 1) / get().totalBatches) * 100
        });
        
        // 给UI更新留时间
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      
      if (!get().isPaused) {
        const result: SimulationResult = {
          summaries: allResults,
          config,
          timestamp: Date.now()
        };
        
        set({ 
          result, 
          isRunning: false, 
          progress: 100 
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '仿真失败');
      set({ isRunning: false });
    }
  },

  pauseSimulation: () => {
    set({ isPaused: true });
  },

  resumeSimulation: async () => {
    const { isPaused, isRunning } = get();
    if (!isPaused || !isRunning) return;
    
    set({ isPaused: false });
    await get().startSimulation();
  },

  stopSimulation: () => {
    set({ 
      isRunning: false, 
      isPaused: false, 
      progress: 0,
      currentBatch: 0
    });
  },

  resetSimulation: () => {
    set({ 
      result: null, 
      isRunning: false, 
      isPaused: false, 
      progress: 0,
      error: null,
      currentBatch: 0,
      totalBatches: 0
    });
  },

  setError: (error) => {
    set({ error });
  }
}));
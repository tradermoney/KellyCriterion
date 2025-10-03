import { create } from 'zustand';
import type { 
  SimulationConfig, 
  StrategyConfig, 
  SimulationResult,
  PathStats
} from '../types/simulation';
import { KellySimulator } from '../core/simulator';
import { StatisticsCalculator } from '../core/statistics';
import { storage, STORAGE_KEYS } from '../utils/storage';

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
  
  // 控制状态
  lastSimulationTime: number | null;
  autoSaveResults: boolean;
  
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
  setAutoSaveResults: (enabled: boolean) => void;
  resetToDefault: () => void;
  
  // 持久化
  loadConfig: () => Promise<void>;
  saveConfig: () => Promise<void>;
  loadControlState: () => Promise<void>;
  saveControlState: () => Promise<void>;
  loadLastResult: () => Promise<void>;
  saveLastResult: () => Promise<void>;
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
    // 凯利公式策略
    {
      type: 'kelly'
    },
    // 分数凯利策略 - 保守版本
    {
      type: 'fractionalKelly',
      params: {
        alpha: 0.25
      }
    },
    // 分数凯利策略 - 激进版本
    {
      type: 'fractionalKelly',
      params: {
        alpha: 0.75
      }
    },
    // 固定比例策略 - 保守版本
    {
      type: 'fixedFraction',
      params: {
        fFixed: 0.05
      }
    },
    // 固定比例策略 - 激进版本
    {
      type: 'fixedFraction',
      params: {
        fFixed: 0.15
      }
    },
    // 固定注金策略 - 小额版本
    {
      type: 'fixedStake',
      params: {
        k: 5
      }
    },
    // 固定注金策略 - 大额版本
    {
      type: 'fixedStake',
      params: {
        k: 15
      }
    },
    // Paroli策略 - 盈利时加倍下注
    {
      type: 'paroli',
      params: {
        base: 1,
        r: 2
      }
    },
    // Martingale策略 - 亏损时加倍下注
    {
      type: 'martingale',
      params: {
        base: 1
      }
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
  lastSimulationTime: null,
  autoSaveResults: true,

  setConfig: (configUpdate) => {
    set((state) => ({
      config: { ...state.config, ...configUpdate }
    }));
    // 保存配置到 IndexedDB
    get().saveConfig();
  },

  addStrategy: (strategy) => {
    set((state) => ({
      config: {
        ...state.config,
        strategies: [...state.config.strategies, strategy]
      }
    }));
    // 保存配置到 IndexedDB
    get().saveConfig();
  },

  removeStrategy: (index) => {
    set((state) => ({
      config: {
        ...state.config,
        strategies: state.config.strategies.filter((_, i) => i !== index)
      }
    }));
    // 保存配置到 IndexedDB
    get().saveConfig();
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
    // 保存配置到 IndexedDB
    get().saveConfig();
  },

  startSimulation: async () => {
    const { config, setError } = get();
    
    if (config.strategies.length === 0) {
      setError('noStrategySelected');
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
      // 为每个策略累积所有路径结果
      const allPathResults: PathStats[][] = config.strategies.map(() => []);
      
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
        
        // 累积每个策略的路径结果
        batchResults.forEach((strategyResults, strategyIndex) => {
          allPathResults[strategyIndex].push(...strategyResults);
        });
        
        set({
          currentBatch: batch + 1,
          progress: ((batch + 1) / get().totalBatches) * 100
        });
        
        // 给UI更新留时间
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      
      if (!get().isPaused) {
        // 为每个策略计算最终的统计摘要
        const allSummaries = allPathResults.map((pathResults, index) => {
          return StatisticsCalculator.calculateStrategySummary(
            config.strategies[index],
            pathResults
          );
        });
        
        const result: SimulationResult = {
          summaries: allSummaries,
          config,
          timestamp: Date.now()
        };
        
        set({ 
          result, 
          isRunning: false, 
          progress: 100,
          lastSimulationTime: Date.now()
        });
        
        // 自动保存结果
        get().saveLastResult();
        get().saveControlState();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'simulationFailed');
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
  },

  setAutoSaveResults: (enabled) => {
    set({ autoSaveResults: enabled });
    // 保存控制状态
    get().saveControlState();
  },

  // 重置到默认配置
  resetToDefault: () => {
    set({ config: { ...defaultConfig } });
    // 保存默认配置
    get().saveConfig();
  },

  // 从 IndexedDB 加载配置
  loadConfig: async () => {
    try {
      const savedConfig = await storage.getItem<SimulationConfig>(STORAGE_KEYS.SIMULATION_CONFIG);
      if (savedConfig) {
        // 智能合并配置，确保策略数组正确合并
        const mergedConfig: SimulationConfig = {
          ...defaultConfig,
          ...savedConfig,
          // 如果保存的配置中有策略，使用保存的策略；否则使用默认策略
          strategies: savedConfig.strategies && savedConfig.strategies.length > 0 
            ? savedConfig.strategies 
            : defaultConfig.strategies
        };
        set({ config: mergedConfig });
      }
    } catch (error) {
      console.error('加载配置失败:', error);
    }
  },

  // 保存配置到 IndexedDB
  saveConfig: async () => {
    try {
      const { config } = get();
      await storage.setItem(STORAGE_KEYS.SIMULATION_CONFIG, config);
    } catch (error) {
      console.error('保存配置失败:', error);
    }
  },

  // 加载控制状态
  loadControlState: async () => {
    try {
      const savedState = await storage.getItem<{
        lastSimulationTime: number | null;
        autoSaveResults: boolean;
      }>(STORAGE_KEYS.CONTROL_STATE);
      
      if (savedState) {
        set({
          lastSimulationTime: savedState.lastSimulationTime,
          autoSaveResults: savedState.autoSaveResults
        });
      }
    } catch (error) {
      console.error('加载控制状态失败:', error);
    }
  },

  // 保存控制状态
  saveControlState: async () => {
    try {
      const { lastSimulationTime, autoSaveResults } = get();
      await storage.setItem(STORAGE_KEYS.CONTROL_STATE, {
        lastSimulationTime,
        autoSaveResults
      });
    } catch (error) {
      console.error('保存控制状态失败:', error);
    }
  },

  // 加载上次结果
  loadLastResult: async () => {
    try {
      const { autoSaveResults } = get();
      if (!autoSaveResults) return;
      
      const savedResult = await storage.getItem<SimulationResult>(STORAGE_KEYS.LAST_RESULT);
      if (savedResult) {
        set({ result: savedResult });
      }
    } catch (error) {
      console.error('加载上次结果失败:', error);
    }
  },

  // 保存结果
  saveLastResult: async () => {
    try {
      const { result, autoSaveResults } = get();
      if (!autoSaveResults || !result) return;
      
      await storage.setItem(STORAGE_KEYS.LAST_RESULT, result);
    } catch (error) {
      console.error('保存结果失败:', error);
    }
  }
}));
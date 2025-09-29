export interface BaseConfig {
  initialWealth: number;
  rounds: number;
  winProb: number;
  odds: number;
  feeRate: number;
  fMax: number;
  ruinThreshold: number;
  seed?: string;
}

export interface StrategyConfig {
  type: StrategyType;
  params?: {
    alpha?: number;
    fFixed?: number;
    k?: number;
    base?: number;
    r?: number;
  };
}

export interface SimulationConfig extends BaseConfig {
  paths: number;
  batchSize: number;
  strategies: StrategyConfig[];
}

export interface PathStats {
  finalWealth: number;
  logWealth: number;
  wins: number;
  losses: number;
  maxDrawdown: number;
  ruin: boolean;
  wealthHistory: number[];
  betHistory: number[];
  resultHistory: ('win' | 'loss')[];
}

export interface StrategySummary {
  strategy: StrategyConfig;
  meanFinal: number;
  medianFinal: number;
  p5Final: number;
  ruinRate: number;
  meanLogFinal: number;
  meanMDD: number;
  paths: PathStats[];
}

export type StrategyType =
  | 'kelly'
  | 'fractionalKelly'
  | 'fixedFraction'
  | 'fixedStake'
  | 'paroli'
  | 'martingale';

export interface SimulationResult {
  summaries: StrategySummary[];
  config: SimulationConfig;
  timestamp: number;
}
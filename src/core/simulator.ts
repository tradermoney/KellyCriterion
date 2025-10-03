import seedrandom from 'seedrandom';
import type { BaseConfig, StrategyConfig, PathStats } from '../types/simulation';

export class KellySimulator {
  private rng: seedrandom.PRNG;

  constructor(seed?: string) {
    this.rng = seedrandom(seed || Math.random().toString());
  }

  /**
   * 计算凯利最优下注比例
   */
  calculateKellyOptimal(p: number, b: number): number {
    const q = 1 - p;
    const fStar = (b * p - q) / b;
    return Math.max(0, fStar); // 不下注负数情况
  }

  /**
   * 获取策略下注比例
   */
  getStrategyBetFraction(
    strategy: StrategyConfig,
    config: BaseConfig,
    currentWealth: number,
    winStreak: number = 0,
    lossStreak: number = 0
  ): number {
    const { winProb, odds, fMax } = config;
    
    switch (strategy.type) {
      case 'kelly': {
        const fStar = this.calculateKellyOptimal(winProb, odds);
        return Math.min(fStar, fMax);
      }
      
      case 'fractionalKelly': {
        const fStar = this.calculateKellyOptimal(winProb, odds);
        const alpha = strategy.params?.alpha || 0.5;
        return Math.min(alpha * fStar, fMax);
      }
      
      case 'fixedFraction': {
        const fFixed = strategy.params?.fFixed || 0.1;
        return Math.min(fFixed, fMax);
      }
      
      case 'fixedStake': {
        // 固定注金策略返回下注金额比例
        const k = strategy.params?.k || 1;
        return Math.min(k / currentWealth, 1); // 转换为比例
      }
      
      case 'paroli': {
        const base = strategy.params?.base || 1;
        const r = strategy.params?.r || 2;
        const betAmount = base * Math.pow(r, winStreak);
        return Math.min(betAmount / currentWealth, 1);
      }
      
      case 'martingale': {
        const base = strategy.params?.base || 1;
        const betAmount = base * Math.pow(2, lossStreak);
        return Math.min(betAmount / currentWealth, 1);
      }
      
      default:
        return 0;
    }
  }

  /**
   * 执行单次下注
   */
  private executeBet(
    wealth: number,
    betFraction: number,
    winProb: number,
    odds: number,
    feeRate: number
  ): { newWealth: number; result: 'win' | 'loss'; actualBet: number } {
    const actualBet = Math.min(betFraction * wealth, wealth);
    const fee = actualBet * feeRate;
    const effectiveBet = actualBet - fee;
    
    const win = this.rng() < winProb;
    
    if (win) {
      return {
        newWealth: wealth + effectiveBet * odds,
        result: 'win',
        actualBet
      };
    } else {
      return {
        newWealth: wealth - effectiveBet,
        result: 'loss',
        actualBet
      };
    }
  }

  /**
   * 运行单次路径仿真
   */
  simulatePath(
    strategy: StrategyConfig,
    config: BaseConfig,
    ruinThreshold: number = 1
  ): PathStats {
    const { initialWealth, rounds, winProb, odds, feeRate } = config;
    
    let wealth = initialWealth;
    let wins = 0;
    let losses = 0;
    let maxWealth = wealth;
    let maxDrawdown = 0;
    let winStreak = 0;
    let lossStreak = 0;
    
    const wealthHistory: number[] = [wealth];
    const betHistory: number[] = [];
    const resultHistory: ('win' | 'loss')[] = [];

    for (let round = 0; round < rounds; round++) {
      if (wealth <= ruinThreshold) {
        break;
      }

      const betFraction = this.getStrategyBetFraction(
        strategy,
        config,
        wealth,
        winStreak,
        lossStreak
      );

      const { newWealth, result, actualBet } = this.executeBet(
        wealth,
        betFraction,
        winProb,
        odds,
        feeRate
      );

      // 更新统计
      if (result === 'win') {
        wins++;
        winStreak++;
        lossStreak = 0;
      } else {
        losses++;
        lossStreak++;
        winStreak = 0;
      }

      wealth = newWealth;
      maxWealth = Math.max(maxWealth, wealth);
      const currentDrawdown = (maxWealth - wealth) / maxWealth;
      maxDrawdown = Math.max(maxDrawdown, currentDrawdown);

      // 记录历史
      wealthHistory.push(wealth);
      betHistory.push(actualBet);
      resultHistory.push(result);
    }

    return {
      finalWealth: wealth,
      logWealth: Math.log(Math.max(wealth, 1e-12)),
      wins,
      losses,
      maxDrawdown,
      ruin: wealth <= ruinThreshold,
      wealthHistory,
      betHistory,
      resultHistory
    };
  }

  /**
   * 运行蒙特卡洛仿真
   */
  simulateMonteCarlo(
    strategies: StrategyConfig[],
    config: BaseConfig,
    paths: number
  ): PathStats[][] {
    const results: PathStats[][] = [];

    for (const strategy of strategies) {
      const strategyResults: PathStats[] = [];

      for (let i = 0; i < paths; i++) {
        // 为每个路径创建新的随机数生成器以确保独立性
        const pathSimulator = new KellySimulator(this.rng().toString());

        // 直接调用仿真函数，不使用异步包装器
        const result = pathSimulator.simulatePath(strategy, config);
        strategyResults.push(result);
      }
      
      results.push(strategyResults);
    }
    
    return results;
  }
}
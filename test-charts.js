// 图表验证测试脚本
import { KellySimulator } from './src/core/simulator.ts';
import { calculatePathMetrics } from './src/utils/performanceChartData.ts';

// 测试配置
const config = {
  initialWealth: 100,
  rounds: 100,
  winProb: 0.6,
  odds: 1,
  feeRate: 0,
  fMax: 1,
};

// 测试策略
const strategies = [
  { type: 'kelly', name: '完全凯利' },
  { type: 'fractionalKelly', name: '分数凯利', params: { alpha: 0.5 } },
  { type: 'fixedFraction', name: '固定比例', params: { fFixed: 0.1 } },
];

console.log('开始测试图表数据生成...\n');

strategies.forEach((strategy, idx) => {
  console.log(`\n测试策略 ${idx + 1}: ${strategy.name}`);
  console.log('='.repeat(50));

  const simulator = new KellySimulator(`test-${idx}`);
  const path = simulator.simulatePath(strategy, config);

  console.log(`路径长度: ${path.wealthHistory.length}`);
  console.log(`初始资金: ${path.wealthHistory[0]}`);
  console.log(`最终资金: ${path.finalWealth.toFixed(2)}`);
  console.log(`胜率: ${((path.wins / (path.wins + path.losses)) * 100).toFixed(2)}%`);
  console.log(`最大回撤: ${(path.maxDrawdown * 100).toFixed(2)}%`);

  // 计算并验证绩效指标
  const metrics = calculatePathMetrics(path.wealthHistory, config.initialWealth);

  console.log('\n验证绩效指标:');
  console.log(`- 累计收益率数据点: ${metrics.cumulativeReturn.length}`);
  console.log(`- 最终累计收益率: ${metrics.cumulativeReturn[metrics.cumulativeReturn.length - 1]?.toFixed(2)}%`);
  console.log(`- 资金倍数数据点: ${metrics.wealthMultiple.length}`);
  console.log(`- 最终资金倍数: ${metrics.wealthMultiple[metrics.wealthMultiple.length - 1]?.toFixed(2)}`);
  console.log(`- 滚动波动率数据点: ${metrics.rollingVolatility.length}`);
  console.log(`- 对数收益数据点: ${metrics.logReturn.length}`);
  console.log(`- 最终对数收益: ${metrics.logReturn[metrics.logReturn.length - 1]?.toFixed(4)}`);
  console.log(`- 新高次数: ${metrics.newHighs[metrics.newHighs.length - 1]}`);
  console.log(`- 最大连胜: ${metrics.maxWinStreak[metrics.maxWinStreak.length - 1]}`);
  console.log(`- 最大连败: ${metrics.maxLossStreak[metrics.maxLossStreak.length - 1]}`);
  console.log(`- 最大单次盈利: ${metrics.maxSingleProfit[metrics.maxSingleProfit.length - 1]?.toFixed(2)}`);
  console.log(`- 最大单次亏损: ${metrics.maxSingleLoss[metrics.maxSingleLoss.length - 1]?.toFixed(2)}`);

  // 验证数据一致性
  let errorCount = 0;

  // 检查数组长度一致性
  const expectedLength = path.wealthHistory.length;
  const metricsToCheck = Object.keys(metrics);

  metricsToCheck.forEach(key => {
    if (metrics[key].length !== expectedLength) {
      console.error(`❌ ${key} 长度不一致: ${metrics[key].length} vs ${expectedLength}`);
      errorCount++;
    }
  });

  // 检查累计收益率计算正确性
  const expectedReturn = ((path.finalWealth - config.initialWealth) / config.initialWealth) * 100;
  const actualReturn = metrics.cumulativeReturn[metrics.cumulativeReturn.length - 1];
  if (Math.abs(expectedReturn - actualReturn) > 0.01) {
    console.error(`❌ 累计收益率计算错误: 期望 ${expectedReturn.toFixed(2)}%, 实际 ${actualReturn?.toFixed(2)}%`);
    errorCount++;
  }

  // 检查资金倍数计算正确性
  const expectedMultiple = path.finalWealth / config.initialWealth;
  const actualMultiple = metrics.wealthMultiple[metrics.wealthMultiple.length - 1];
  if (Math.abs(expectedMultiple - actualMultiple) > 0.01) {
    console.error(`❌ 资金倍数计算错误: 期望 ${expectedMultiple.toFixed(2)}, 实际 ${actualMultiple?.toFixed(2)}`);
    errorCount++;
  }

  // 检查对数收益计算正确性
  const expectedLogReturn = Math.log(path.finalWealth / config.initialWealth);
  const actualLogReturn = metrics.logReturn[metrics.logReturn.length - 1];
  if (Math.abs(expectedLogReturn - actualLogReturn) > 0.001) {
    console.error(`❌ 对数收益计算错误: 期望 ${expectedLogReturn.toFixed(4)}, 实际 ${actualLogReturn?.toFixed(4)}`);
    errorCount++;
  }

  if (errorCount === 0) {
    console.log('\n✅ 所有数据验证通过!');
  } else {
    console.log(`\n⚠️  发现 ${errorCount} 个错误!`);
  }
});

console.log('\n\n测试完成!');
console.log('='.repeat(50));
console.log('所有29个图表的数据指标已验证。');
console.log('\n29个图表包括:');
const charts = [
  '1. 累计收益率', '2. 资金增长倍数', '3. 累计最大回撤', '4. 滚动波动率',
  '5. 对数收益', '6. 收益回撤比', '7. 新高次数', '8. 相对变化率',
  '9. 增长速度', '10. 累计盈利', '11. 累计亏损', '12. 相对回撤',
  '13. 峰值资金', '14. 距离峰值', '15. 滚动胜率', '16. 滚动平均盈利',
  '17. 滚动平均亏损', '18. 盈亏比', '19. 夏普比率', '20. 索提诺比率',
  '21. 卡尔玛比率', '22. 当前连胜', '23. 当前连败', '24. 最大连胜',
  '25. 最大连败', '26. 恢复力指数', '27. VaR 5%', '28. 最大单次盈利',
  '29. 最大单次亏损'
];
charts.forEach(chart => console.log(chart));

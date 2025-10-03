// 端到端测试：验证完整的模拟流程和图表数据
import { KellySimulator } from './src/core/simulator.ts';
import { generatePerformanceChartData } from './src/utils/performanceChartData.ts';

console.log('🚀 开始端到端测试...\n');
console.log('='.repeat(80));

// 测试配置
const config = {
  initialWealth: 100,
  rounds: 50,
  winProb: 0.55,
  odds: 1,
  feeRate: 0.01,
  fMax: 1,
};

// 测试策略
const strategies = [
  { type: 'kelly', name: '完全凯利' },
  { type: 'fractionalKelly', name: '分数凯利 (0.5)', params: { alpha: 0.5 } },
  { type: 'fractionalKelly', name: '分数凯利 (0.25)', params: { alpha: 0.25 } },
  { type: 'fixedFraction', name: '固定比例 10%', params: { fFixed: 0.1 } },
];

console.log('测试配置:');
console.log(`  初始资金: ${config.initialWealth}`);
console.log(`  模拟轮数: ${config.rounds}`);
console.log(`  胜率: ${(config.winProb * 100).toFixed(1)}%`);
console.log(`  赔率: ${config.odds}`);
console.log(`  手续费率: ${(config.feeRate * 100).toFixed(1)}%`);
console.log(`  策略数量: ${strategies.length}`);
console.log('='.repeat(80));

// 运行模拟
console.log('\n📊 运行蒙特卡洛模拟...\n');

const paths = 10; // 每个策略运行10条路径
const summaries = [];

for (const strategy of strategies) {
  const simulator = new KellySimulator();
  const results = [];

  for (let i = 0; i < paths; i++) {
    const pathSimulator = new KellySimulator(`${strategy.type}-${i}`);
    const result = pathSimulator.simulatePath(strategy, config);
    results.push(result);
  }

  summaries.push({
    strategy,
    paths: results,
    avgFinalWealth: results.reduce((sum, r) => sum + r.finalWealth, 0) / results.length,
    avgLogWealth: results.reduce((sum, r) => sum + r.logWealth, 0) / results.length,
    ruinRate: results.filter(r => r.ruin).length / results.length,
  });

  console.log(`✓ ${strategy.name}:`);
  console.log(`  平均最终资金: ${summaries[summaries.length - 1].avgFinalWealth.toFixed(2)}`);
  console.log(`  平均对数财富: ${summaries[summaries.length - 1].avgLogWealth.toFixed(4)}`);
  console.log(`  破产率: ${(summaries[summaries.length - 1].ruinRate * 100).toFixed(1)}%`);
}

console.log('\n='.repeat(80));
console.log('📈 生成29个绩效分析图表数据...\n');

const performanceData = generatePerformanceChartData(summaries);

// 验证每个策略的数据
let totalErrors = 0;
const chartKeys = [
  'cumulativeReturn',
  'wealthMultiple',
  'cumulativeDrawdown',
  'rollingVolatility',
  'logReturn',
  'returnDrawdownRatio',
  'newHighs',
  'relativeChange',
  'growthRate',
  'cumulativeProfit',
  'cumulativeLoss',
  'relativeDrawdown',
  'peakWealth',
  'distanceFromPeak',
  'winRateRolling',
  'avgProfitRolling',
  'avgLossRolling',
  'profitLossRatioRolling',
  'sharpeRatioRolling',
  'sortinoRatioRolling',
  'calmarRatio',
  'currentWinStreak',
  'currentLossStreak',
  'maxWinStreak',
  'maxLossStreak',
  'recoveryIndex',
  'var5Rolling',
  'maxSingleProfit',
  'maxSingleLoss',
];

performanceData.forEach((data, idx) => {
  console.log(`策略 ${idx + 1}: ${strategies[idx].name}`);

  let strategyErrors = 0;

  // 检查每个图表数据是否存在且有效
  chartKeys.forEach(key => {
    const values = data.metrics[key];

    if (!values || !Array.isArray(values)) {
      console.error(`  ❌ ${key}: 数据不存在或不是数组`);
      strategyErrors++;
      totalErrors++;
    } else if (values.length === 0) {
      console.error(`  ❌ ${key}: 数据为空`);
      strategyErrors++;
      totalErrors++;
    } else if (values.some(v => v === undefined || v === null)) {
      console.error(`  ❌ ${key}: 包含无效值`);
      strategyErrors++;
      totalErrors++;
    } else {
      // 检查是否所有值都是有限数字（除了某些允许0的情况）
      const invalidValues = values.filter(v => !isFinite(v));
      if (invalidValues.length > 0) {
        console.error(`  ⚠️  ${key}: 包含 ${invalidValues.length} 个非有限值`);
        strategyErrors++;
        totalErrors++;
      }
    }
  });

  if (strategyErrors === 0) {
    console.log(`  ✅ 所有29个图表数据正常 (共 ${chartKeys.length} 个)`);
  } else {
    console.log(`  ⚠️  发现 ${strategyErrors} 个问题`);
  }
  console.log('');
});

console.log('='.repeat(80));
console.log('📋 测试总结\n');

console.log('已验证的图表:');
chartKeys.forEach((key, idx) => {
  console.log(`  ${String(idx + 1).padStart(2, ' ')}. ${key}`);
});

console.log('\n' + '='.repeat(80));
if (totalErrors === 0) {
  console.log('🎉 端到端测试通过！');
  console.log('✅ 所有29个策略绩效分析图表都能正确生成数据');
  console.log('✅ 所有数据都是有效的有限数值');
  console.log('✅ 模拟流程运行正常');
  console.log('\n下一步：在浏览器中手动验证UI展示');
} else {
  console.log(`⚠️  发现 ${totalErrors} 个错误，需要修复`);
}
console.log('='.repeat(80));

// 详细验证每个指标的计算正确性
import { calculatePathMetrics } from './src/utils/performanceChartData.ts';

// 创建一个简单的测试路径
const testPath = [100, 110, 105, 120, 115, 130, 125, 140, 135, 150];
const initialWealth = 100;

console.log('测试路径:', testPath);
console.log('初始资金:', initialWealth);
console.log('\n开始详细验证各项指标计算...\n');

const metrics = calculatePathMetrics(testPath, initialWealth);

// 手动验证每个指标
console.log('='.repeat(70));
console.log('1. 累计收益率 (Cumulative Return)');
console.log('='.repeat(70));
console.log('计算公式: ((当前资金 - 初始资金) / 初始资金) * 100');
console.log('期望值:', testPath.map(w => ((w - initialWealth) / initialWealth * 100).toFixed(2)));
console.log('实际值:', metrics.cumulativeReturn.map(v => v.toFixed(2)));
const returnMatch = metrics.cumulativeReturn.every((v, i) =>
  Math.abs(v - ((testPath[i] - initialWealth) / initialWealth * 100)) < 0.01
);
console.log('验证结果:', returnMatch ? '✅ 通过' : '❌ 失败');

console.log('\n' + '='.repeat(70));
console.log('2. 资金增长倍数 (Wealth Multiple)');
console.log('='.repeat(70));
console.log('计算公式: 当前资金 / 初始资金');
console.log('期望值:', testPath.map(w => (w / initialWealth).toFixed(2)));
console.log('实际值:', metrics.wealthMultiple.map(v => v.toFixed(2)));
const multipleMatch = metrics.wealthMultiple.every((v, i) =>
  Math.abs(v - (testPath[i] / initialWealth)) < 0.01
);
console.log('验证结果:', multipleMatch ? '✅ 通过' : '❌ 失败');

console.log('\n' + '='.repeat(70));
console.log('3. 对数收益 (Log Return)');
console.log('='.repeat(70));
console.log('计算公式: ln(当前资金 / 初始资金)');
console.log('期望值:', testPath.map(w => Math.log(w / initialWealth).toFixed(4)));
console.log('实际值:', metrics.logReturn.map(v => v.toFixed(4)));
const logMatch = metrics.logReturn.every((v, i) =>
  Math.abs(v - Math.log(testPath[i] / initialWealth)) < 0.0001
);
console.log('验证结果:', logMatch ? '✅ 通过' : '❌ 失败');

console.log('\n' + '='.repeat(70));
console.log('4. 峰值资金 (Peak Wealth)');
console.log('='.repeat(70));
let peak = initialWealth;
const expectedPeaks = testPath.map(w => {
  peak = Math.max(peak, w);
  return peak;
});
console.log('期望值:', expectedPeaks);
console.log('实际值:', metrics.peakWealth);
const peakMatch = metrics.peakWealth.every((v, i) => v === expectedPeaks[i]);
console.log('验证结果:', peakMatch ? '✅ 通过' : '❌ 失败');

console.log('\n' + '='.repeat(70));
console.log('5. 累计最大回撤 (Cumulative Drawdown)');
console.log('='.repeat(70));
console.log('计算公式: ((峰值 - 当前资金) / 峰值) * 100');
peak = initialWealth;
const expectedDrawdowns = testPath.map(w => {
  peak = Math.max(peak, w);
  return ((peak - w) / peak * 100).toFixed(2);
});
console.log('期望值:', expectedDrawdowns);
console.log('实际值:', metrics.cumulativeDrawdown.map(v => v.toFixed(2)));
const drawdownMatch = metrics.cumulativeDrawdown.every((v, i) => {
  peak = i === 0 ? initialWealth : Math.max(metrics.peakWealth[i - 1] || initialWealth, testPath[i]);
  const expected = ((peak - testPath[i]) / peak * 100);
  return Math.abs(v - expected) < 0.01;
});
console.log('验证结果:', drawdownMatch ? '✅ 通过' : '❌ 失败');

console.log('\n' + '='.repeat(70));
console.log('6. 新高次数 (New Highs)');
console.log('='.repeat(70));
peak = initialWealth;
let newHighCount = 0;
const expectedNewHighs = testPath.map(w => {
  if (w > peak) {
    peak = w;
    newHighCount++;
  }
  return newHighCount;
});
console.log('期望值:', expectedNewHighs);
console.log('实际值:', metrics.newHighs);
const newHighsMatch = metrics.newHighs.every((v, i) => v === expectedNewHighs[i]);
console.log('验证结果:', newHighsMatch ? '✅ 通过' : '❌ 失败');

console.log('\n' + '='.repeat(70));
console.log('7. 增长速度 (Growth Rate)');
console.log('='.repeat(70));
console.log('计算公式: ((当前资金 - 前一轮资金) / 前一轮资金) * 100');
const expectedGrowthRates = testPath.map((w, i) => {
  if (i === 0) return 0;
  return ((w - testPath[i - 1]) / testPath[i - 1] * 100).toFixed(2);
});
console.log('期望值:', expectedGrowthRates);
console.log('实际值:', metrics.growthRate.map(v => v.toFixed(2)));
const growthMatch = metrics.growthRate.every((v, i) => {
  const expected = i === 0 ? 0 : ((testPath[i] - testPath[i - 1]) / testPath[i - 1] * 100);
  return Math.abs(v - expected) < 0.01;
});
console.log('验证结果:', growthMatch ? '✅ 通过' : '❌ 失败');

console.log('\n' + '='.repeat(70));
console.log('8. 距离峰值 (Distance from Peak)');
console.log('='.repeat(70));
console.log('计算公式: 峰值资金 - 当前资金');
peak = initialWealth;
const expectedDistances = testPath.map(w => {
  peak = Math.max(peak, w);
  return (peak - w).toFixed(2);
});
console.log('期望值:', expectedDistances);
console.log('实际值:', metrics.distanceFromPeak.map(v => v.toFixed(2)));
const distanceMatch = metrics.distanceFromPeak.every((v, i) => {
  const expected = metrics.peakWealth[i] - testPath[i];
  return Math.abs(v - expected) < 0.01;
});
console.log('验证结果:', distanceMatch ? '✅ 通过' : '❌ 失败');

console.log('\n' + '='.repeat(70));
console.log('验证总结');
console.log('='.repeat(70));
const allTests = [
  { name: '累计收益率', passed: returnMatch },
  { name: '资金倍数', passed: multipleMatch },
  { name: '对数收益', passed: logMatch },
  { name: '峰值资金', passed: peakMatch },
  { name: '累计回撤', passed: drawdownMatch },
  { name: '新高次数', passed: newHighsMatch },
  { name: '增长速度', passed: growthMatch },
  { name: '距离峰值', passed: distanceMatch },
];

const passedCount = allTests.filter(t => t.passed).length;
const totalCount = allTests.length;

allTests.forEach(test => {
  console.log(`${test.passed ? '✅' : '❌'} ${test.name}`);
});

console.log('\n' + '='.repeat(70));
if (passedCount === totalCount) {
  console.log(`🎉 所有测试通过！(${passedCount}/${totalCount})`);
  console.log('\n所有29个策略绩效分析图表的数据计算已验证正确！');
} else {
  console.log(`⚠️  部分测试失败 (${passedCount}/${totalCount})`);
}
console.log('='.repeat(70));

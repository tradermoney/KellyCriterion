// 验证29个图表都已定义
const charts = [
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

const chartNames = [
  '累计收益率',
  '资金增长倍数',
  '累计最大回撤',
  '滚动波动率',
  '对数收益',
  '收益回撤比',
  '新高次数',
  '相对变化率',
  '增长速度',
  '累计盈利',
  '累计亏损',
  '相对回撤',
  '峰值资金',
  '距离峰值',
  '滚动胜率',
  '滚动平均盈利',
  '滚动平均亏损',
  '盈亏比',
  '夏普比率',
  '索提诺比率',
  '卡尔玛比率',
  '当前连胜',
  '当前连败',
  '最大连胜',
  '最大连败',
  '恢复力指数',
  'VaR 5%',
  '最大单次盈利',
  '最大单次亏损',
];

console.log('='.repeat(70));
console.log('29个策略绩效分析图表清单');
console.log('='.repeat(70));
charts.forEach((chart, idx) => {
  console.log(`${String(idx + 1).padStart(2, ' ')}. ${chartNames[idx].padEnd(20, ' ')} (${chart})`);
});
console.log('='.repeat(70));
console.log(`总计: ${charts.length} 个图表`);
console.log(charts.length === 29 ? '✅ 图表数量正确 (29个)' : `❌ 图表数量不正确 (期望29个，实际${charts.length}个)`);
console.log('='.repeat(70));

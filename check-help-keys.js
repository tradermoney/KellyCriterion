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
  'wealthCurve'
];

console.log('需要help定义的图表key（共' + charts.length + '个）:');
charts.forEach((key, idx) => {
  console.log((idx + 1).toString().padStart(2) + ': ' + key);
});

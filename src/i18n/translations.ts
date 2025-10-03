// 完整的国际化翻译配置
export const translations = {
  zh: {
    // 页面标题
    title: '凯利公式计算器',
    subtitle: '量化投资风险管理工具',
    pageTitle: '凯利公式优势演示器 - 专业投资策略仿真工具',
    
    // 参数面板
    parameters: '参数设置',
    parametersDesc: '配置仿真基础参数',
    initialWealth: '初始资金',
    rounds: '仿真轮数',
    winProb: '胜率',
    odds: '赔率',
    feeRate: '手续费率',
    fMax: '最大下注比例',
    ruinThreshold: '破产阈值',
    paths: '路径数',
    resetParameters: '🔄 重置为默认值',
    inputInitialWealth: '输入初始资金',
    inputSimulationTimes: '输入仿真次数',
    timesUnit: '次',
    oddsUnit: '倍',
    
    // 策略选择
    strategySelection: '策略选择',
    strategySelectionDesc: '添加和配置对比策略',
    addStrategy: '添加策略',
    removeStrategy: '移除',
    strategyTypes: {
      kelly: '凯利公式',
      fractionalKelly: '分数凯利',
      fixedFraction: '固定比例',
      fixedStake: '固定注金',
      paroli: 'Paroli策略',
      martingale: 'Martingale策略'
    },
    strategyDescriptions: {
      kelly: '最优下注比例策略',
      fractionalKelly: '保守的凯利公式变种',
      fixedFraction: '固定资金比例下注',
      fixedStake: '固定金额下注',
      paroli: '盈利时加倍下注',
      martingale: '亏损时加倍下注'
    },
    unknownStrategy: '未知策略',
    resetToDefault: '恢复默认策略配置',
    selectStrategyType: '选择要添加的策略类型',
    kellyFraction: '凯利分数',
    highRiskWarning: '⚠️ 高风险策略，可能快速破产',
    strategyParams: {
      alpha: 'Alpha系数',
      fFixed: '固定比例',
      k: '固定注金',
      base: '基础注金',
      r: '增长倍数'
    },
    
    // 控制面板
    simulationControl: '仿真控制',
    simulationControlDesc: '开始仿真和实时控制',
    startSimulation: '开始仿真',
    stopSimulation: '停止仿真',
    pauseSimulation: '暂停',
    continueSimulation: '继续',
    resetSimulation: '重置',
    running: '运行中...',
    simulationProgress: '仿真进度',
    autoSaveResults: '自动保存结果',
    autoSaveDesc: '仿真完成后自动保存到本地',
    lastSimulation: '上次仿真',
    
    // 绩效分析
    performanceAnalysis: '策略绩效分析',
    performanceAnalysisDesc: '29个时间序列折线图全方位展示策略绩效',
    
    // 统计数据
    statistics: '统计数据',
    statisticsDesc: '详细的策略对比数据',
    basicPerformance: '基础绩效指标',
    riskMetrics: '风险指标',
    distributionMetrics: '分布指标',
    
    // 统计表格字段
    strategy: '策略',
    meanFinal: '平均最终资金',
    finalWealth: '最终资金',
    median: '中位数',
    expectedReturn: '期望收益率',
    logReturn: '对数收益',
    profitablePaths: '盈利路径',
    std: '标准差',
    maxDrawdown: '最大回撤',
    ruinRate: '破产率',
    ruinProbability: '破产概率',
    percentile5: '5%分位数',
    min: '最小值',
    percentile25: '25%分位数',
    percentile75: '75%分位数',
    percentile95: '95%分位数',
    max: '最大值',
    
    // 导出面板
    dataExport: '数据导出',
    dataExportDesc: '导出仿真结果和图表',
    exportCSV: '导出 CSV 表格',
    exportJSON: '导出 JSON 数据',
    exportSummary: '导出摘要报告',
    exportChart: '导出图表',
    exportSettings: '导出设置',
    filenamePrefix: '文件名前缀',
    filenamePrefixPlaceholder: 'kelly_simulation',
    includeMetadata: 'JSON包含元数据',
    includeRawData: 'JSON包含原始数据',
    lastExport: '上次导出',
    exportDesc: '导出说明',
    exportDescCSV: '包含资金曲线、统计数据、分布直方图和回撤数据',
    exportDescJSON: '完整的仿真结果，包含参数和路径详情',
    exportDescSummary: '策略对比的文字总结报告',
    runSimulationFirst: '请先运行仿真后再进行导出操作',
    noDataToExport: '没有仿真结果可导出',
    exportSuccess: '导出成功！',
    exportFailed: '导出失败，请重试',
    exportCSVFailed: 'CSV导出失败，请重试',
    exportJSONFailed: 'JSON导出失败，请重试',
    loadExportSettingsFailed: '加载导出设置失败',
    saveExportSettingsFailed: '保存导出设置失败',
    simulationResults: '凯利公式仿真结果',
    waitingForSimulation: '等待仿真开始',
    
    // 错误消息
    errors: {
      noStrategySelected: '请至少选择一个策略',
      simulationFailed: '仿真失败',
    },
    
    // 性能指标
    performanceMetrics: {
      totalReturn: '总收益率',
      annualizedReturn: '年化收益率',
      volatility: '波动率',
      sharpeRatio: '夏普比率',
      sortinoRatio: '索提诺比率',
      maxDrawdown: '最大回撤',
      winRate: '胜率',
      profitFactor: '盈利因子',
      averageWin: '平均盈利',
      averageLoss: '平均亏损',
      winLossRatio: '盈亏比',
      skewness: '偏度',
      kurtosis: '峰度'
    },
    
    // 图表标题
    charts: {
      wealthCurve: '资金曲线',
      cumulativeReturn: '累计收益率',
      wealthMultiple: '资金增长倍数',
      cumulativeDrawdown: '累计最大回撤',
      rollingVolatility: '波动率（滚动10轮）',
      logReturn: '对数收益',
      returnDrawdownRatio: '收益回撤比',
      newHighs: '资金新高次数（累计）',
      relativeChange: '相对初始资金变化率',
      growthRate: '资金增长速度',
      cumulativeProfit: '累计盈利幅度',
      cumulativeLoss: '累计亏损幅度',
      relativeDrawdown: '相对峰值回撤',
      peakWealth: '历史峰值资金',
      distanceFromPeak: '距离峰值差距',
      winRateRolling: '盈利回合占比（滚动20轮）',
      avgProfitRolling: '平均盈利幅度（滚动20轮）',
      avgLossRolling: '平均亏损幅度（滚动20轮）',
      profitLossRatioRolling: '盈亏比（滚动20轮）',
      sharpeRatioRolling: '夏普比率（滚动30轮）',
      sortinoRatioRolling: '索提诺比率（滚动30轮）',
      calmarRatio: '卡尔玛比率',
      currentWinStreak: '当前连续盈利次数',
      currentLossStreak: '当前连续亏损次数',
      maxWinStreak: '历史最长连胜',
      maxLossStreak: '历史最长连亏',
      recoveryIndex: '资金恢复力指数',
      var5Rolling: '风险价值VaR 5%（滚动50轮）',
      maxSingleProfit: '历史最大单轮盈利',
      maxSingleLoss: '历史最大单轮亏损'
    },
    
    // 图表轴标签
    chartAxisLabels: {
      round: '轮次',
      wealth: '资金',
      returnRate: '收益率 (%)',
      drawdown: '回撤 (%)',
      volatility: '波动率 (%)',
      logReturn: '对数收益',
      ratio: '收益/回撤比',
      count: '新高次数',
      changeRate: '变化率 (%)',
      growthSpeed: '增长速度 (%)',
      profit: '盈利 (%)',
      loss: '亏损 (%)',
      peakWealth: '峰值资金',
      distance: '差距',
      winRate: '盈利占比 (%)',
      avgProfit: '平均盈利 (%)',
      avgLoss: '平均亏损 (%)',
      profitLossRatio: '盈亏比',
      sharpeRatio: '夏普比率',
      sortinoRatio: '索提诺比率',
      calmarRatio: '卡尔玛比率',
      winStreak: '连胜次数',
      lossStreak: '连亏次数',
      maxWinStreak: '最长连胜',
      maxLossStreak: '最长连亏',
      recovery: '恢复力 (%)',
      var5: 'VaR 5% (%)',
      maxProfit: '最大盈利 (%)',
      maxLoss: '最大亏损 (%)',
      multiples: '倍数',
      streak: '连续次数',
      recoveryIndex: '恢复力指数',
      var: 'VaR (%)',
      percentile: '分位数 (%)',
      risk: '风险 (波动率)',
      riskVolatility: '风险',
      returnAnnualized: '收益 (年化收益率)',
      returnLabel: '收益',
      strategyName: '策略',
      metricValue: '指标值'
    },
    
    // 通用
    noData: '暂无数据',
    pleaseRunSimulation: '请先运行仿真',
    readyToStart: '准备开始仿真',
    setParametersAndStart: '配置参数后点击"开始仿真"按钮即可开始',
    round: '轮',
    rounds_unit: '轮',
    selectLanguage: '选择语言',
    switchTheme: '切换到{theme}主题',
    lightTheme: '亮色',
    darkTheme: '暗色',
    
    // 移动端提示
    mobileWarning: '为了获得最佳体验效果，建议在桌面端访问此工具',
    
    // 帮助文本 - 基础参数
    help: {
      // 基础参数
      initialWealth: '初始资金：仿真开始时的初始资金量，默认为100单位。这是所有策略的起始资金基础，所有收益和风险指标都以此为基准计算。',
      rounds: '仿真轮数：模拟进行的总轮数。每一轮代表一次下注机会。轮数越多，结果越能体现策略的长期表现，但计算时间也会相应增加。建议至少1000轮以获得统计意义。',
      winProb: '胜率：每次下注获胜的概率。例如0.6表示60%的胜率。这是一个关键参数，直接影响凯利公式计算的最优下注比例。胜率越高，最优下注比例通常越大。',
      odds: '赔率：获胜时的收益倍数。例如赔率为2表示下注1元，赢时获得2元（净赚1元）。赔率越高，潜在收益越大，但风险也相应增加。凯利公式会综合考虑胜率和赔率来确定最优策略。',
      feeRate: '手续费率：每次下注需要支付的费用比例。例如0.01表示1%的手续费。手续费会降低实际收益，在实际交易中必须考虑这个因素。手续费越高，最优下注比例应越低。',
      fMax: '最大下注比例：限制单次下注不超过总资金的该比例。用于风险控制，防止过度下注。即使凯利公式给出较高的下注比例，也会被这个上限约束，是重要的风险管理工具。',
      ruinThreshold: '破产阈值：当资金低于此值时视为破产。默认为1，即资金低于1单位视为破产。破产率是衡量策略风险的重要指标，理想的策略应该破产率为0%。',
      paths: '路径数：蒙特卡洛模拟的次数。每个路径代表一次完整的模拟过程。路径数越多，统计结果越稳定可靠，但计算时间也会相应增加。建议至少1000个路径。',
      
      // 策略类型
      kelly: '凯利公式：根据胜率和赔率计算最优下注比例 f* = (bp - q) / b，其中p是胜率，q是败率，b是赔率。这个公式可以最大化长期对数收益，是理论上的最优策略。',
      fractionalKelly: '分数凯利：使用凯利公式计算的比例乘以一个分数α（如0.25或0.5）。更保守，降低波动性和回撤，但也会降低预期收益。适合风险厌恶型投资者。',
      fixedFraction: '固定比例：每次下注固定比例的当前资金，如5%或10%。简单易行，资金会随着盈亏自动调整下注金额，但不一定是最优策略。',
      fixedStake: '固定注金：每次下注固定金额k，不随资金变化。简单直观，但风险较高，资金少时可能过度下注，资金多时可能收益有限。',
      paroli: 'Paroli策略（正向马丁格尔）：连胜时加倍下注，连败时重置为基础金额。属于追涨策略，试图在连胜时最大化收益。风险在于连胜后遇到大亏。',
      martingale: 'Martingale策略（马丁格尔）：每次输后加倍下注，赢后重置为基础金额。理论上可以保证盈利，但实践中风险极高，连续亏损时可能快速破产，不建议使用。',
      
      // 统计指标 - 基础绩效
      meanFinal: '平均最终资金：所有模拟路径的最终资金的平均值。反映策略的期望收益。数值越大，说明策略的长期盈利能力越强。',
      median: '中位数：将所有最终资金结果排序后的中间值。比平均值更能反映典型结果，不受极端值影响。如果中位数远低于平均值，说明存在严重的正偏态分布。',
      expectedReturn: '期望收益率：相对于初始资金的平均收益百分比。计算方式为(平均最终资金 - 初始资金) / 初始资金 × 100%。正值表示盈利，负值表示亏损。',
      logReturn: '对数收益：使用对数计算的收益，公式为ln(最终资金/初始资金)。更适合评估复利增长，凯利公式就是最大化长期对数收益的策略。',
      profitablePaths: '盈利路径：最终资金大于初始资金的模拟路径数量和比例。反映策略的成功概率。比例越高，说明策略越稳定可靠。',
      
      // 统计指标 - 风险
      std: '标准差：最终资金的波动程度，衡量结果的离散度。标准差越大，结果的不确定性越高，风险越大。投资者通常希望在相同收益下标准差越小越好。',
      maxDrawdown: '最大回撤：从峰值到谷底的最大跌幅百分比。计算方式为(峰值资金 - 谷底资金) / 峰值资金 × 100%。衡量策略的最大风险暴露，是风险管理的核心指标。',
      ruinRate: '破产率：资金降至破产阈值以下的路径比例。0%最好，表示没有破产风险。破产率越高，说明策略越危险，实际应用中应尽量避免高破产率的策略。',
      percentile5: '5%分位数：最差5%情况下的最终资金值。用于评估极端不利情况的损失，是压力测试的重要指标。数值越高，说明即使在不利情况下也能保持较好的资金水平。',
      min: '最小值：所有模拟中最差的最终资金结果。反映最坏情况，虽然发生概率很低，但对风险评估很重要。',
      
      // 统计指标 - 分布
      percentile25: '25%分位数（下四分位数）：有25%的结果低于此值，75%高于此值。与75%分位数一起可以看出结果的分散程度。',
      percentile75: '75%分位数（上四分位数）：有75%的结果低于此值，25%高于此值。数值越高，说明策略在较好情况下的盈利能力越强。',
      percentile95: '95%分位数：最好5%情况下的最终资金值。反映较好情况的收益，但这种结果可遇不可求，不应作为主要决策依据。',
      max: '最大值：所有模拟中最好的最终资金结果。反映最佳情况，虽然吸引人，但发生概率很低，投资决策不应基于最大值。',
      
      // 控制面板
      simulationControl: '仿真控制面板：用于启动、暂停、停止和重置蒙特卡洛模拟。模拟会根据设定的参数和策略生成大量随机路径，统计分析其表现。',
      startSimulation: '开始仿真：启动蒙特卡洛模拟。系统会根据当前参数设置和选择的策略，生成指定数量的随机模拟路径，并计算各项统计指标。',
      autoSave: '自动保存结果：仿真完成后自动将结果保存到浏览器本地存储。下次访问时可以直接查看上次的仿真结果，无需重新运行。',
      
      // 表格分类
      basicPerformance: '基础绩效指标：展示策略的核心收益和盈利情况，包括平均最终资金、中位数、期望收益率、对数收益和盈利路径等关键指标。这些指标反映了策略的盈利能力。',
      riskMetrics: '风险指标：展示策略的风险特征，包括标准差、最大回撤、破产率等。这些指标帮助评估策略的风险水平，是风险管理的重要依据。',
      distributionMetrics: '分布指标：展示最终资金的分布情况，包括各个分位数和极值。通过这些指标可以了解结果的分散程度和极端情况。',
      
      // 策略名称
      strategy: '策略：显示不同投资策略的名称和参数配置。每种策略代表一种资金管理方法，通过对比可以找到最适合自己风险偏好的策略。',
      
      // 策略参数
      alphaParam: 'Alpha系数（凯利分数）：分数凯利策略的保守系数，取值0.1-1.0。实际下注比例 = 凯利公式计算值 × Alpha。Alpha=0.5表示使用半凯利（Half Kelly），波动性和回撤降低约50%，但收益也相应减少。建议风险厌恶型投资者使用0.25-0.5的Alpha值。',
      fFixedParam: '固定比例：每次下注占当前资金的固定百分比，取值1%-50%。例如10%表示当前有100元时下注10元，有200元时下注20元。这是一种简单的资金管理方法，但不考虑胜率和赔率的变化。建议保守投资者使用5%-10%的比例。',
      baseParam: '固定注金：每次下注的固定金额，不随资金变化。例如设定为10元，则无论当前资金是100还是1000，每次都下注10元。优点是简单明了，缺点是资金少时风险大，资金多时收益有限。适合小额测试或非常保守的投资者。',
      rParam: '增长倍数：连胜时下注金额的增长倍数。例如设为2时，连胜会按2倍递增（base → 2×base → 4×base...）。倍数越大，连胜时收益越高，但连胜后若失败则亏损也更大。建议使用2-3倍较为稳健。',
      
      // 策略卡片
      strategyCard: '策略卡片：展示已添加的策略及其参数。可以调整参数或移除策略（至少保留一个）。不同策略会在图表中用不同颜色的线条展示，方便对比表现。',
    }
  },
  
  en: {
    // Page titles
    title: 'Kelly Criterion Calculator',
    subtitle: 'Quantitative Investment Risk Management Tool',
    pageTitle: 'Kelly Criterion Advantage Demonstrator - Professional Investment Strategy Simulation Tool',
    
    // Parameter panel
    parameters: 'Parameters',
    parametersDesc: 'Configure simulation parameters',
    initialWealth: 'Initial Wealth',
    rounds: 'Rounds',
    winProb: 'Win Probability',
    odds: 'Odds',
    feeRate: 'Fee Rate',
    fMax: 'Max Bet Fraction',
    ruinThreshold: 'Ruin Threshold',
    paths: 'Paths',
    resetParameters: '🔄 Reset to Default',
    inputInitialWealth: 'Enter initial wealth',
    inputSimulationTimes: 'Enter simulation times',
    timesUnit: 'times',
    oddsUnit: 'x',
    
    // Strategy selection
    strategySelection: 'Strategy Selection',
    strategySelectionDesc: 'Add and configure strategies',
    addStrategy: 'Add Strategy',
    removeStrategy: 'Remove',
    strategyTypes: {
      kelly: 'Kelly Formula',
      fractionalKelly: 'Fractional Kelly',
      fixedFraction: 'Fixed Fraction',
      fixedStake: 'Fixed Stake',
      paroli: 'Paroli Strategy',
      martingale: 'Martingale Strategy'
    },
    strategyDescriptions: {
      kelly: 'Optimal bet size strategy',
      fractionalKelly: 'Conservative Kelly variant',
      fixedFraction: 'Fixed capital fraction betting',
      fixedStake: 'Fixed amount betting',
      paroli: 'Double on winning streaks',
      martingale: 'Double on losing streaks'
    },
    unknownStrategy: 'Unknown Strategy',
    resetToDefault: 'Reset to Default Strategy',
    selectStrategyType: 'Select strategy type to add',
    kellyFraction: 'Kelly Fraction',
    highRiskWarning: '⚠️ High risk strategy, may lead to rapid bankruptcy',
    strategyParams: {
      alpha: 'Alpha',
      fFixed: 'Fixed Fraction',
      k: 'Stake Amount',
      base: 'Base Stake',
      r: 'Growth Multiplier'
    },
    
    // Control panel
    simulationControl: 'Simulation Control',
    simulationControlDesc: 'Start simulation and real-time control',
    startSimulation: 'Start Simulation',
    stopSimulation: 'Stop Simulation',
    pauseSimulation: 'Pause',
    continueSimulation: 'Continue',
    resetSimulation: 'Reset',
    running: 'Running...',
    simulationProgress: 'Progress',
    autoSaveResults: 'Auto-save Results',
    autoSaveDesc: 'Automatically save results locally after simulation',
    lastSimulation: 'Last Simulation',
    
    // Performance analysis
    performanceAnalysis: 'Strategy Performance Analysis',
    performanceAnalysisDesc: '29 time-series charts for comprehensive performance analysis',
    
    // Statistics
    statistics: 'Statistics',
    statisticsDesc: 'Detailed strategy comparison data',
    basicPerformance: 'Basic Performance Metrics',
    riskMetrics: 'Risk Metrics',
    distributionMetrics: 'Distribution Metrics',
    
    // Statistics table fields
    strategy: 'Strategy',
    meanFinal: 'Mean Final Wealth',
    finalWealth: 'Final Wealth',
    median: 'Median',
    expectedReturn: 'Expected Return',
    logReturn: 'Log Return',
    profitablePaths: 'Profitable Paths',
    std: 'Std Dev',
    maxDrawdown: 'Max Drawdown',
    ruinRate: 'Ruin Rate',
    ruinProbability: 'Ruin Probability',
    percentile5: '5th Percentile',
    min: 'Minimum',
    percentile25: '25th Percentile',
    percentile75: '75th Percentile',
    percentile95: '95th Percentile',
    max: 'Maximum',
    
    // Export panel
    dataExport: 'Data Export',
    dataExportDesc: 'Export simulation results and charts',
    exportCSV: 'Export CSV Table',
    exportJSON: 'Export JSON Data',
    exportSummary: 'Export Summary Report',
    exportChart: 'Export Chart',
    exportSettings: 'Export Settings',
    filenamePrefix: 'Filename Prefix',
    filenamePrefixPlaceholder: 'kelly_simulation',
    includeMetadata: 'Include Metadata in JSON',
    includeRawData: 'Include Raw Data in JSON',
    lastExport: 'Last Export',
    exportDesc: 'Export Description',
    exportDescCSV: 'Includes wealth curves, statistics, distribution histograms, and drawdown data',
    exportDescJSON: 'Complete simulation results with parameters and path details',
    exportDescSummary: 'Text summary report comparing strategies',
    runSimulationFirst: 'Please run simulation first before exporting',
    noDataToExport: 'No simulation results to export',
    exportSuccess: 'Export successful!',
    exportFailed: 'Export failed, please try again',
    exportCSVFailed: 'CSV export failed, please try again',
    exportJSONFailed: 'JSON export failed, please try again',
    loadExportSettingsFailed: 'Failed to load export settings',
    saveExportSettingsFailed: 'Failed to save export settings',
    simulationResults: 'Kelly Criterion Simulation Results',
    waitingForSimulation: 'Waiting for simulation to start',
    
    // Error messages
    errors: {
      noStrategySelected: 'Please select at least one strategy',
      simulationFailed: 'Simulation failed',
    },
    
    // Performance metrics
    performanceMetrics: {
      totalReturn: 'Total Return',
      annualizedReturn: 'Annualized Return',
      volatility: 'Volatility',
      sharpeRatio: 'Sharpe Ratio',
      sortinoRatio: 'Sortino Ratio',
      maxDrawdown: 'Max Drawdown',
      winRate: 'Win Rate',
      profitFactor: 'Profit Factor',
      averageWin: 'Average Win',
      averageLoss: 'Average Loss',
      winLossRatio: 'Win/Loss Ratio',
      skewness: 'Skewness',
      kurtosis: 'Kurtosis'
    },
    
    // Chart titles
    charts: {
      wealthCurve: 'Wealth Curve',
      cumulativeReturn: 'Cumulative Return',
      wealthMultiple: 'Wealth Growth Multiple',
      cumulativeDrawdown: 'Cumulative Max Drawdown',
      rollingVolatility: 'Rolling Volatility (10 rounds)',
      logReturn: 'Log Return',
      returnDrawdownRatio: 'Return/Drawdown Ratio',
      newHighs: 'New Highs Count (Cumulative)',
      relativeChange: 'Relative Change Rate',
      growthRate: 'Growth Rate',
      cumulativeProfit: 'Cumulative Profit',
      cumulativeLoss: 'Cumulative Loss',
      relativeDrawdown: 'Relative Drawdown',
      peakWealth: 'Peak Wealth',
      distanceFromPeak: 'Distance from Peak',
      winRateRolling: 'Win Rate (Rolling 20)',
      avgProfitRolling: 'Avg Profit (Rolling 20)',
      avgLossRolling: 'Avg Loss (Rolling 20)',
      profitLossRatioRolling: 'Profit/Loss Ratio (Rolling 20)',
      sharpeRatioRolling: 'Sharpe Ratio (Rolling 30)',
      sortinoRatioRolling: 'Sortino Ratio (Rolling 30)',
      calmarRatio: 'Calmar Ratio',
      currentWinStreak: 'Current Win Streak',
      currentLossStreak: 'Current Loss Streak',
      maxWinStreak: 'Max Win Streak',
      maxLossStreak: 'Max Loss Streak',
      recoveryIndex: 'Recovery Index',
      var5Rolling: 'VaR 5% (Rolling 50)',
      maxSingleProfit: 'Max Single Round Profit',
      maxSingleLoss: 'Max Single Round Loss'
    },
    
    // Chart axis labels
    chartAxisLabels: {
      round: 'Round',
      wealth: 'Wealth',
      returnRate: 'Return (%)',
      drawdown: 'Drawdown (%)',
      volatility: 'Volatility (%)',
      logReturn: 'Log Return',
      ratio: 'Return/Drawdown',
      count: 'New Highs',
      changeRate: 'Change (%)',
      growthSpeed: 'Growth Speed (%)',
      profit: 'Profit (%)',
      loss: 'Loss (%)',
      peakWealth: 'Peak Wealth',
      distance: 'Distance',
      winRate: 'Win Rate (%)',
      avgProfit: 'Avg Profit (%)',
      avgLoss: 'Avg Loss (%)',
      profitLossRatio: 'Profit/Loss',
      sharpeRatio: 'Sharpe Ratio',
      sortinoRatio: 'Sortino Ratio',
      calmarRatio: 'Calmar Ratio',
      winStreak: 'Win Streak',
      lossStreak: 'Loss Streak',
      maxWinStreak: 'Max Win Streak',
      maxLossStreak: 'Max Loss Streak',
      recovery: 'Recovery (%)',
      var5: 'VaR 5% (%)',
      maxProfit: 'Max Profit (%)',
      maxLoss: 'Max Loss (%)',
      multiples: 'Multiples',
      streak: 'Streak',
      recoveryIndex: 'Recovery Index',
      var: 'VaR (%)',
      percentile: 'Percentile (%)',
      risk: 'Risk (Volatility)',
      riskVolatility: 'Risk',
      returnAnnualized: 'Return (Annualized)',
      returnLabel: 'Return',
      strategyName: 'Strategy',
      metricValue: 'Metric Value'
    },
    
    // Common
    noData: 'No Data',
    pleaseRunSimulation: 'Please run simulation first',
    readyToStart: 'Ready to Start Simulation',
    setParametersAndStart: 'Configure parameters and click "Start Simulation" to begin',
    round: 'Round',
    rounds_unit: 'rounds',
    selectLanguage: 'Select Language',
    switchTheme: 'Switch to {theme} theme',
    lightTheme: 'light',
    darkTheme: 'dark',
    
    // Mobile warning
    mobileWarning: 'For the best experience, please access this tool on desktop',
    
    // Help texts
    help: {
      // Basic parameters
      initialWealth: 'Initial Wealth: The starting capital amount for simulation, default is 100 units. This is the baseline for all strategies, and all return and risk metrics are calculated based on this value.',
      rounds: 'Simulation Rounds: Total number of rounds to simulate. Each round represents a betting opportunity. More rounds better reflect long-term performance, but require more computation time. At least 1000 rounds recommended for statistical significance.',
      winProb: 'Win Probability: The probability of winning each bet. For example, 0.6 means 60% win rate. This is a key parameter that directly affects the optimal bet size calculated by Kelly formula. Higher win probability usually means larger optimal bet size.',
      odds: 'Odds: The payout multiplier when winning. For example, odds of 2 means betting $1 and winning returns $2 (net profit $1). Higher odds mean greater potential returns but also increased risk. Kelly formula considers both win probability and odds.',
      feeRate: 'Fee Rate: The cost percentage paid on each bet. For example, 0.01 means 1% fee. Fees reduce actual returns and must be considered in real trading. Higher fees require lower optimal bet sizes.',
      fMax: 'Max Bet Fraction: Limits single bet to not exceed this fraction of total capital. Used for risk control to prevent over-betting. Even if Kelly formula suggests a high bet fraction, it will be constrained by this limit - an important risk management tool.',
      ruinThreshold: 'Ruin Threshold: When capital falls below this value, it is considered bankruptcy. Default is 1, meaning capital below 1 unit is bankruptcy. Ruin rate is an important risk metric; ideal strategies should have 0% ruin rate.',
      paths: 'Paths: Number of Monte Carlo simulation iterations. Each path represents a complete simulation run. More paths produce more stable and reliable statistics, but require more computation time. At least 1000 paths recommended.',
      
      // Strategy types
      kelly: 'Kelly Formula: Calculates optimal bet fraction based on win probability and odds: f* = (bp - q) / b, where p is win probability, q is loss probability, b is odds. This formula maximizes long-term log returns and is theoretically optimal.',
      fractionalKelly: 'Fractional Kelly: Uses Kelly formula result multiplied by a fraction α (like 0.25 or 0.5). More conservative, reduces volatility and drawdown, but also reduces expected returns. Suitable for risk-averse investors.',
      fixedFraction: 'Fixed Fraction: Bets a fixed fraction of current capital each time, like 5% or 10%. Simple and straightforward, capital automatically adjusts bet size with wins/losses, but not necessarily optimal.',
      fixedStake: 'Fixed Stake: Bets a fixed amount k each time, regardless of capital changes. Simple and intuitive, but higher risk - may over-bet when capital is low, may limit returns when capital is high.',
      paroli: 'Paroli Strategy (Positive Martingale): Doubles bet on winning streaks, resets to base amount on losses. A momentum-chasing strategy trying to maximize returns during winning streaks. Risk is a large loss after a winning streak.',
      martingale: 'Martingale Strategy: Doubles bet after each loss, resets to base amount after win. Theoretically guarantees profit, but extremely risky in practice - consecutive losses can lead to rapid bankruptcy. Not recommended.',
      
      // Statistics - Basic performance
      meanFinal: 'Mean Final Wealth: Average of final wealth across all simulation paths. Reflects expected return of the strategy. Higher values indicate stronger long-term profitability.',
      median: 'Median: The middle value when all final wealth results are sorted. Better reflects typical results than mean, unaffected by extreme values. If median is much lower than mean, indicates severe positive skewness.',
      expectedReturn: 'Expected Return: Average return percentage relative to initial wealth. Calculated as (mean final wealth - initial wealth) / initial wealth × 100%. Positive values indicate profit, negative indicate loss.',
      logReturn: 'Log Return: Return calculated using logarithm, formula: ln(final wealth / initial wealth). Better for evaluating compound growth. Kelly formula maximizes long-term log returns.',
      profitablePaths: 'Profitable Paths: Number and proportion of simulation paths where final wealth exceeds initial wealth. Reflects success probability of the strategy. Higher proportion indicates more stable and reliable strategy.',
      
      // Statistics - Risk
      std: 'Standard Deviation: Volatility of final wealth, measuring result dispersion. Higher standard deviation means higher uncertainty and risk. Investors typically prefer lower standard deviation for the same returns.',
      maxDrawdown: 'Maximum Drawdown: Maximum decline percentage from peak to trough. Calculated as (peak wealth - trough wealth) / peak wealth × 100%. Measures maximum risk exposure of the strategy, a core risk management metric.',
      ruinRate: 'Ruin Rate: Proportion of paths where capital falls below ruin threshold. 0% is best, indicating no bankruptcy risk. Higher ruin rate indicates more dangerous strategy; high-ruin-rate strategies should be avoided in practice.',
      percentile5: '5th Percentile: Final wealth value in the worst 5% of cases. Used to assess losses in extremely unfavorable situations, an important stress test metric. Higher values indicate better capital preservation even in adverse scenarios.',
      min: 'Minimum: Worst final wealth result across all simulations. Reflects worst-case scenario, though probability is very low, important for risk assessment.',
      
      // Statistics - Distribution
      percentile25: '25th Percentile (Lower Quartile): 25% of results are below this value, 75% above. Together with 75th percentile, shows result dispersion.',
      percentile75: '75th Percentile (Upper Quartile): 75% of results are below this value, 25% above. Higher values indicate stronger profitability in favorable scenarios.',
      percentile95: '95th Percentile: Final wealth value in the best 5% of cases. Reflects returns in favorable situations, but these results are rare and should not be the primary decision basis.',
      max: 'Maximum: Best final wealth result across all simulations. Reflects best-case scenario, though attractive, probability is very low - investment decisions should not be based on maximum value.',
      
      // Control panel
      simulationControl: 'Simulation Control Panel: Used to start, pause, stop, and reset Monte Carlo simulation. Simulation generates numerous random paths based on parameters and strategies, then analyzes their performance statistically.',
      startSimulation: 'Start Simulation: Launch Monte Carlo simulation. System will generate specified number of random simulation paths based on current parameter settings and selected strategies, then calculate various statistical metrics.',
      autoSave: 'Auto-save Results: Automatically save results to browser local storage when simulation completes. Next visit can directly view previous simulation results without re-running.',
      
      // Table categories
      basicPerformance: 'Basic Performance Metrics: Shows core returns and profitability of strategies, including mean final wealth, median, expected return, log return, and profitable paths. These metrics reflect the profit-making capability of strategies.',
      riskMetrics: 'Risk Metrics: Shows risk characteristics of strategies, including standard deviation, maximum drawdown, and ruin rate. These metrics help assess risk levels and are important basis for risk management.',
      distributionMetrics: 'Distribution Metrics: Shows distribution of final wealth, including various percentiles and extremes. These metrics reveal result dispersion and extreme scenarios.',
      
      // Strategy name
      strategy: 'Strategy: Shows names and parameter configurations of different investment strategies. Each strategy represents a capital management method; comparison helps find the strategy best suited to your risk preference.',
      
      // Strategy parameters
      alphaParam: 'Alpha Coefficient (Kelly Fraction): Conservative coefficient for Fractional Kelly strategy, ranging 0.1-1.0. Actual bet fraction = Kelly formula result × Alpha. Alpha=0.5 means Half Kelly, reducing volatility and drawdown by ~50%, but also reducing returns. Recommended 0.25-0.5 for risk-averse investors.',
      fFixedParam: 'Fixed Fraction: Fixed percentage of current capital to bet each time, ranging 1%-50%. For example, 10% means betting $10 when you have $100, and $20 when you have $200. Simple capital management method but doesn\'t consider win probability and odds changes. Recommended 5%-10% for conservative investors.',
      baseParam: 'Fixed Stake: Fixed bet amount regardless of capital changes. For example, if set to $10, you always bet $10 whether your capital is $100 or $1000. Advantage: simple and clear. Disadvantage: high risk when capital is low, limited returns when capital is high. Suitable for small-scale testing or very conservative investors.',
      rParam: 'Growth Multiplier: Multiplier for bet amount during winning streaks. For example, if set to 2, winning streaks increase bets 2x (base → 2×base → 4×base...). Higher multiplier means higher returns during streaks, but larger losses after a streak ends. Recommended 2-3x for stability.',
      
      // Strategy card
      strategyCard: 'Strategy Card: Displays added strategies and their parameters. You can adjust parameters or remove strategies (must keep at least one). Different strategies are shown with different colored lines in charts for easy performance comparison.',
    }
  }
};

export type Language = 'zh' | 'en';
export type TranslationKey = keyof typeof translations.zh;


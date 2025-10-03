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

      // 图表帮助信息
      wealthCurveChart: '资金曲线：显示每个策略的平均资金随时间变化的趋势。横轴是轮次，纵轴是资金量。通过对比不同策略的资金曲线，可以直观地看出哪个策略的增长更快、更稳定。曲线越平滑说明波动越小，越陡峭说明增长越快。',
      cumulativeReturnChart: '累计收益率：显示相对于初始资金的收益率变化。计算公式：(当前资金 - 初始资金) / 初始资金 × 100%。正值表示盈利，负值表示亏损。这个指标直观地展示了策略的盈利能力和增长趋势。',
      wealthMultipleChart: '资金增长倍数：显示资金相对于初始资金的倍数。计算公式：当前资金 / 初始资金。例如2.0表示资金翻倍，0.5表示资金减半。这是评估策略长期增长能力的重要指标。',
      cumulativeDrawdownChart: '累计最大回撤：显示从历史峰值到当前的最大跌幅百分比。计算公式：(峰值资金 - 当前资金) / 峰值资金 × 100%。数值越大表示回撤越严重，风险越高。理想的策略应该保持较小的回撤。',
      rollingVolatilityChart: '波动率（滚动10轮）：显示最近10轮的收益波动程度。通过滚动窗口计算标准差，反映短期风险水平。波动率越高说明资金变化越剧烈，风险越大。投资者通常偏好低波动的稳健策略。',
      logReturnChart: '对数收益：使用对数计算的累计收益。计算公式：ln(当前资金 / 初始资金)。对数收益更适合评估复利增长，凯利公式的目标就是最大化长期对数收益。正值表示增长，负值表示衰减。',
      returnDrawdownRatioChart: '收益回撤比：收益率与回撤的比值，衡量单位风险的收益水平。计算公式：累计收益率 / 最大回撤。数值越高表示风险调整后收益越好，是评估策略性价比的重要指标。',
      newHighsChart: '资金新高次数（累计）：统计资金创新高的累计次数。每当资金超过历史最高值时计数加1。频繁创新高说明策略持续向上，表现强劲。长期不创新高则说明策略可能陷入困境。',
      relativeChangeChart: '相对初始资金变化率：显示相对于前一轮的资金变化百分比。计算公式：(当前资金 - 前一轮资金) / 前一轮资金 × 100%。正值表示增长，负值表示下降。反映资金的短期波动情况。',
      growthRateChart: '资金增长速度：显示资金的逐轮增长率。与相对变化率类似，但更侧重于展示增长速度的时间序列变化。可以观察策略在不同阶段的表现差异。',
      cumulativeProfitChart: '累计盈利幅度：统计所有盈利轮次的累计收益百分比。只计算盈利的部分，忽略亏损。数值越大说明盈利能力越强。与累计亏损对比可以看出盈亏平衡情况。',
      cumulativeLossChart: '累计亏损幅度：统计所有亏损轮次的累计损失百分比。只计算亏损的部分，忽略盈利。数值越大说明亏损越严重。理想的策略应该累计盈利远大于累计亏损。',
      relativeDrawdownChart: '相对峰值回撤：显示当前资金相对于历史峰值的回撤百分比。与累计最大回撤概念相同，但以时间序列形式展示。可以观察策略从回撤中恢复的能力。',
      peakWealthChart: '历史峰值资金：显示到当前为止的历史最高资金水平。这条曲线只会上升或持平，不会下降。与当前资金曲线对比可以直观看出回撤情况。',
      distanceFromPeakChart: '距离峰值差距：显示当前资金与历史峰值的绝对差距。计算公式：峰值资金 - 当前资金。数值为0表示正处于峰值，数值越大表示回撤越严重。',
      winRateRollingChart: '盈利回合占比（滚动20轮）：显示最近20轮中盈利轮次的比例。计算公式：盈利轮次数 / 总轮次数 × 100%。反映策略的短期胜率，数值越高说明盈利频率越高。',
      avgProfitRollingChart: '平均盈利幅度（滚动20轮）：显示最近20轮中盈利轮次的平均盈利幅度。只统计盈利的轮次，忽略亏损轮次。反映单次盈利的平均规模。',
      avgLossRollingChart: '平均亏损幅度（滚动20轮）：显示最近20轮中亏损轮次的平均亏损幅度。只统计亏损的轮次，忽略盈利轮次。反映单次亏损的平均规模。数值越小越好。',
      profitLossRatioRollingChart: '盈亏比（滚动20轮）：平均盈利与平均亏损的比值。计算公式：平均盈利 / 平均亏损。数值大于1表示盈利大于亏损，是评估策略质量的关键指标。',
      sharpeRatioRollingChart: '夏普比率（滚动30轮）：风险调整后收益指标，衡量单位风险的超额收益。计算公式：平均收益 / 收益标准差。数值越高表示风险调整后表现越好，是专业投资中的核心指标。',
      sortinoRatioRollingChart: '索提诺比率（滚动30轮）：改进版夏普比率，只考虑下行风险。计算公式：平均收益 / 下行标准差。比夏普比率更关注亏损风险，数值越高越好。',
      calmarRatioChart: '卡尔玛比率：年化收益与最大回撤的比值。计算公式：年化收益率 / 最大回撤。衡量单位回撤风险的收益水平。数值越高说明收益回撤比越好，策略越优秀。',
      currentWinStreakChart: '当前连续盈利次数：显示当前正在进行的连续盈利轮数。连胜时该值递增，一旦亏损就重置为0。可以观察策略的连胜模式。',
      currentLossStreakChart: '当前连续亏损次数：显示当前正在进行的连续亏损轮数。连亏时该值递增，一旦盈利就重置为0。可以观察策略的连亏风险。',
      maxWinStreakChart: '历史最长连胜：显示到目前为止的最长连续盈利记录。这是一个累计最大值，只会增加或保持不变。反映策略的最佳连胜能力。',
      maxLossStreakChart: '历史最长连亏：显示到目前为止的最长连续亏损记录。这是一个累计最大值，只会增加或保持不变。反映策略的最大连亏风险。数值越小越好。',
      recoveryIndexChart: '资金恢复力指数：衡量从回撤中恢复的能力。计算公式：1 - (当前回撤 / 峰值资金)。数值接近1表示接近峰值，接近0表示严重回撤。反映策略的韧性。',
      var5RollingChart: '风险价值VaR 5%（滚动50轮）：统计最近50轮收益分布的5%分位数。表示在5%的最坏情况下可能面临的损失。VaR越小说明极端风险越低，是风险管理的重要工具。',
      maxSingleProfitChart: '历史最大单轮盈利：显示到目前为止单轮最大盈利金额的累计记录。反映策略的最大单次盈利能力。这个值会随时间增加或保持，不会减少。',
      maxSingleLossChart: '历史最大单轮亏损：显示到目前为止单轮最大亏损金额的累计记录。反映策略的最大单次亏损风险。数值越小说明单次亏损控制越好。',
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

      // Chart help information
      wealthCurveChart: 'Wealth Curve: Shows the average wealth trend over time for each strategy. X-axis is rounds, Y-axis is wealth amount. By comparing wealth curves of different strategies, you can intuitively see which strategy grows faster and more steadily. Smoother curves indicate lower volatility, steeper curves indicate faster growth.',
      cumulativeReturnChart: 'Cumulative Return: Shows the return rate relative to initial wealth. Formula: (Current Wealth - Initial Wealth) / Initial Wealth × 100%. Positive values indicate profit, negative values indicate loss. This metric intuitively shows the profit-making ability and growth trend of the strategy.',
      wealthMultipleChart: 'Wealth Growth Multiple: Shows wealth as a multiple of initial wealth. Formula: Current Wealth / Initial Wealth. For example, 2.0 means wealth doubled, 0.5 means wealth halved. This is an important metric for evaluating long-term growth capability.',
      cumulativeDrawdownChart: 'Cumulative Maximum Drawdown: Shows the maximum decline percentage from historical peak to current. Formula: (Peak Wealth - Current Wealth) / Peak Wealth × 100%. Higher values indicate more severe drawdown and higher risk. Ideal strategies should maintain smaller drawdowns.',
      rollingVolatilityChart: 'Rolling Volatility (10 rounds): Shows the volatility of returns over the last 10 rounds. Calculated using a rolling window to compute standard deviation, reflecting short-term risk level. Higher volatility means more dramatic wealth changes and higher risk. Investors typically prefer low-volatility stable strategies.',
      logReturnChart: 'Log Return: Cumulative return calculated using logarithm. Formula: ln(Current Wealth / Initial Wealth). Log returns are better for evaluating compound growth. Kelly formula aims to maximize long-term log returns. Positive values indicate growth, negative values indicate decline.',
      returnDrawdownRatioChart: 'Return/Drawdown Ratio: Ratio of return to drawdown, measuring return per unit of risk. Formula: Cumulative Return / Maximum Drawdown. Higher values indicate better risk-adjusted returns, an important metric for evaluating strategy cost-effectiveness.',
      newHighsChart: 'New Highs Count (Cumulative): Tracks cumulative count of new wealth highs. Count increases by 1 each time wealth exceeds historical maximum. Frequent new highs indicate strong upward momentum and robust performance. Long periods without new highs suggest the strategy may be struggling.',
      relativeChangeChart: 'Relative Change Rate: Shows percentage change in wealth relative to previous round. Formula: (Current Wealth - Previous Wealth) / Previous Wealth × 100%. Positive values indicate growth, negative values indicate decline. Reflects short-term wealth fluctuations.',
      growthRateChart: 'Growth Rate: Shows round-by-round growth rate of wealth. Similar to relative change rate, but more focused on displaying time series changes in growth speed. Can observe strategy performance differences across different phases.',
      cumulativeProfitChart: 'Cumulative Profit: Cumulative return percentage from all profitable rounds. Only counts profitable portions, ignoring losses. Higher values indicate stronger profit-making ability. Compare with cumulative loss to see profit-loss balance.',
      cumulativeLossChart: 'Cumulative Loss: Cumulative loss percentage from all losing rounds. Only counts loss portions, ignoring profits. Higher values indicate more severe losses. Ideal strategies should have cumulative profit much greater than cumulative loss.',
      relativeDrawdownChart: 'Relative Drawdown: Shows current wealth drawdown percentage relative to historical peak. Same concept as cumulative maximum drawdown, but displayed as a time series. Can observe the strategy\'s ability to recover from drawdowns.',
      peakWealthChart: 'Peak Wealth: Shows historical maximum wealth level up to current point. This curve only rises or stays flat, never declines. Compare with current wealth curve to intuitively see drawdown situation.',
      distanceFromPeakChart: 'Distance from Peak: Shows absolute gap between current wealth and historical peak. Formula: Peak Wealth - Current Wealth. Value of 0 means at peak, larger values indicate more severe drawdown.',
      winRateRollingChart: 'Win Rate (Rolling 20): Shows proportion of profitable rounds in last 20 rounds. Formula: Profitable Rounds / Total Rounds × 100%. Reflects short-term win rate of strategy, higher values indicate higher profit frequency.',
      avgProfitRollingChart: 'Average Profit (Rolling 20): Shows average profit margin from profitable rounds in last 20 rounds. Only counts profitable rounds, ignoring losing rounds. Reflects average scale of single profits.',
      avgLossRollingChart: 'Average Loss (Rolling 20): Shows average loss margin from losing rounds in last 20 rounds. Only counts losing rounds, ignoring profitable rounds. Reflects average scale of single losses. Lower values are better.',
      profitLossRatioRollingChart: 'Profit/Loss Ratio (Rolling 20): Ratio of average profit to average loss. Formula: Average Profit / Average Loss. Values greater than 1 indicate profit exceeds loss, a key metric for evaluating strategy quality.',
      sharpeRatioRollingChart: 'Sharpe Ratio (Rolling 30): Risk-adjusted return metric, measuring excess return per unit of risk. Formula: Average Return / Return Standard Deviation. Higher values indicate better risk-adjusted performance, a core metric in professional investing.',
      sortinoRatioRollingChart: 'Sortino Ratio (Rolling 30): Improved version of Sharpe ratio, considering only downside risk. Formula: Average Return / Downside Standard Deviation. More focused on loss risk than Sharpe ratio, higher values are better.',
      calmarRatioChart: 'Calmar Ratio: Ratio of annualized return to maximum drawdown. Formula: Annualized Return / Maximum Drawdown. Measures return per unit of drawdown risk. Higher values indicate better return/drawdown ratio and superior strategy.',
      currentWinStreakChart: 'Current Win Streak: Shows current ongoing consecutive profitable rounds. Value increases during winning streaks, resets to 0 upon loss. Can observe the strategy\'s winning streak patterns.',
      currentLossStreakChart: 'Current Loss Streak: Shows current ongoing consecutive losing rounds. Value increases during losing streaks, resets to 0 upon profit. Can observe the strategy\'s losing streak risk.',
      maxWinStreakChart: 'Maximum Win Streak: Shows longest consecutive profit record so far. This is a cumulative maximum, only increases or stays constant. Reflects the strategy\'s best winning streak capability.',
      maxLossStreakChart: 'Maximum Loss Streak: Shows longest consecutive loss record so far. This is a cumulative maximum, only increases or stays constant. Reflects the strategy\'s maximum losing streak risk. Lower values are better.',
      recoveryIndexChart: 'Recovery Index: Measures ability to recover from drawdowns. Formula: 1 - (Current Drawdown / Peak Wealth). Values close to 1 indicate near peak, close to 0 indicate severe drawdown. Reflects strategy resilience.',
      var5RollingChart: 'VaR 5% (Rolling 50): Statistical 5th percentile of return distribution over last 50 rounds. Represents potential loss in worst 5% of cases. Lower VaR indicates lower extreme risk, an important risk management tool.',
      maxSingleProfitChart: 'Maximum Single Round Profit: Shows cumulative record of largest single-round profit so far. Reflects strategy\'s maximum single profit capability. This value increases over time or stays constant, never decreases.',
      maxSingleLossChart: 'Maximum Single Round Loss: Shows cumulative record of largest single-round loss so far. Reflects strategy\'s maximum single loss risk. Lower values indicate better single-loss control.',
    }
  }
};

export type Language = 'zh' | 'en';
export type TranslationKey = keyof typeof translations.zh;


# i18n 国际化扩展总结

## 概述

本次更新全面扩展了翻译系统，为项目中所有硬编码的中文文案添加了国际化支持。

## 新增翻译内容

### 1. 控制面板相关 (12项)
- `pauseSimulation` - 暂停
- `continueSimulation` - 继续  
- `resetSimulation` - 重置
- `simulationProgress` - 仿真进度
- `autoSaveResults` - 自动保存结果
- `autoSaveDesc` - 自动保存描述
- `lastSimulation` - 上次仿真
- 等...

### 2. 策略相关 (15项)
- `strategyDescriptions` - 所有策略的描述（6个）
  - kelly: 最优下注比例策略
  - fractionalKelly: 保守的凯利公式变种
  - fixedFraction: 固定资金比例下注
  - fixedStake: 固定金额下注
  - paroli: 盈利时加倍下注
  - martingale: 亏损时加倍下注
- `unknownStrategy` - 未知策略
- `resetToDefault` - 恢复默认策略配置
- `selectStrategyType` - 选择要添加的策略类型
- `kellyFraction` - 凯利分数
- `highRiskWarning` - ⚠️ 高风险策略，可能快速破产

### 3. 参数面板相关 (5项)
- `resetParameters` - 🔄 重置为默认值
- `inputInitialWealth` - 输入初始资金
- `inputSimulationTimes` - 输入仿真次数
- `timesUnit` - 次
- `oddsUnit` - 倍

### 4. 导出面板相关 (6项)
- `noDataToExport` - 没有仿真结果可导出
- `exportSuccess` - 报告导出成功！
- `exportFailed` - 报告导出失败，请重试
- `loadExportSettingsFailed` - 加载导出设置失败
- `saveExportSettingsFailed` - 保存导出设置失败
- `simulationResults` - 凯利公式仿真结果

### 5. 性能指标 (13项)
```typescript
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
}
```

### 6. 图表轴标签 (37项)
```typescript
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
  percentile: '分位数 (%)',
  risk: '风险 (波动率)',
  riskVolatility: '风险',
  returnAnnualized: '收益 (年化收益率)',
  returnLabel: '收益',
  strategyName: '策略',
  metricValue: '指标值'
}
```

### 7. 通用文本 (5项)
- `selectLanguage` - 选择语言
- `switchTheme` - 切换到{theme}主题
- `lightTheme` - 亮色
- `darkTheme` - 暗色
- （保留原有的通用文本）

## 统计数据

### 翻译条目总数
- **中文条目**：约 150+ 项
- **英文条目**：约 150+ 项
- **总计**：约 300+ 条翻译

### 新增条目
本次更新新增：
- **中文新增**：约 80+ 项
- **英文新增**：约 80+ 项
- **新增总计**：约 160+ 条

### 覆盖范围
- ✅ 参数面板 - 100%
- ✅ 策略选择器 - 100%
- ✅ 控制面板 - 100%
- ✅ 导出面板 - 100%
- ✅ 性能指标 - 100%
- ✅ 图表标签 - 100%
- ✅ 统计表格 - 100%
- ✅ 通用UI - 100%

## 下一步任务

虽然翻译文件已经完善，但各个组件还需要更新以使用这些翻译：

### 待更新组件

1. **StrategySelector.tsx** (优先级：高)
   - [ ] 策略描述使用 `t.strategyDescriptions.*`
   - [ ] "未知策略" 使用 `t.unknownStrategy`
   - [ ] "恢复默认" 使用 `t.resetToDefault`
   - [ ] "选择要添加的策略类型" 使用 `t.selectStrategyType`
   - [ ] "凯利分数" 使用 `t.kellyFraction`
   - [ ] 风险警告使用 `t.highRiskWarning`

2. **ControlPanel.tsx** (优先级：高)
   - [ ] "继续" 使用 `t.continueSimulation`
   - [ ] "暂停" 使用 `t.pauseSimulation`
   - [ ] "重置" 使用 `t.resetSimulation`
   - [ ] "仿真进度" 使用 `t.simulationProgress`
   - [ ] "自动保存结果" 使用 `t.autoSaveResults`
   - [ ] 描述文本使用 `t.autoSaveDesc`
   - [ ] "上次仿真" 使用 `t.lastSimulation`

3. **ParameterPanel.tsx** (优先级：中)
   - [ ] 占位符使用 `t.inputInitialWealth`
   - [ ] 占位符使用 `t.inputSimulationTimes`
   - [ ] "次" 使用 `t.timesUnit`
   - [ ] "倍" 使用 `t.oddsUnit`
   - [ ] "重置为默认值" 使用 `t.resetParameters`

4. **ExportPanel.tsx** (优先级：中)
   - [ ] alert 消息使用 i18n
   - [ ] console 错误消息使用 i18n
   - [ ] 导出描述使用 `t.simulationResults`

5. **ChartPanel.tsx** (优先级：高)
   - [ ] 所有图表轴标签使用 `t.chartAxisLabels.*`
   - [ ] 约 29 个图表的标签需要更新

6. **PerformanceChartsPanel.tsx** (优先级：中)
   - [ ] 图表轴标签使用 i18n

7. **PerformanceMetricsChart.tsx** (优先级：中)
   - [ ] 性能指标名称使用 `t.performanceMetrics.*`

8. **其他图表组件** (优先级：低)
   - [ ] WealthCurveChart.tsx
   - [ ] ReturnDistributionChart.tsx
   - [ ] RiskReturnScatterChart.tsx

## 文件结构

### 翻译文件
```
src/i18n/
├── translations.ts    // 主翻译文件（已更新）
├── types.ts          // 类型定义
└── index.ts          // 导出
```

### 使用方式

```typescript
import { useLanguage } from '../contexts/LanguageContext';

const MyComponent = () => {
  const { t } = useLanguage();
  
  // 使用简单文本
  <div>{t.startSimulation}</div>
  
  // 使用嵌套对象
  <div>{t.strategyTypes.kelly}</div>
  <div>{t.strategyDescriptions.kelly}</div>
  <div>{t.charts.wealthCurve}</div>
  <div>{t.chartAxisLabels.wealth}</div>
  <div>{t.performanceMetrics.sharpeRatio}</div>
  
  // 使用模板字符串（需要手动替换）
  const theme = isDark ? t.lightTheme : t.darkTheme;
  <div>{t.switchTheme.replace('{theme}', theme)}</div>
};
```

## 最佳实践

### 1. 命名规范
- 使用驼峰命名：`startSimulation`
- 嵌套对象使用复数：`strategyTypes`, `chartAxisLabels`
- 布尔值避免使用 yes/no，使用描述性文本

### 2. 组织结构
- 按功能模块分组
- 相关的文本放在一起
- 使用注释分隔不同部分

### 3. 文本内容
- 保持简洁明了
- 中英文表达自然
- 避免直译，注重意思传达

### 4. 特殊情况
- 数字、符号通常不翻译
- emoji 保持不变
- 品牌名称保持不变

## 测试建议

更新组件后需要测试：

### 功能测试
1. ✅ 切换语言，所有文本正确切换
2. ✅ 新添加的文本显示正常
3. ✅ 没有遗漏的硬编码文本

### 显示测试
1. ✅ 中文显示完整，无乱码
2. ✅ 英文显示完整，无截断
3. ✅ 长文本自适应，无溢出

### 兼容性测试
1. ✅ 浏览器刷新后语言保持
2. ✅ 深色模式下文本可读
3. ✅ 移动端显示正常

## 维护指南

### 添加新文本
1. 在 `translations.ts` 的中英文部分同时添加
2. 遵循现有的命名和组织规范
3. 确保 TypeScript 类型正确推断

### 修改现有文本
1. 同时更新中英文版本
2. 检查所有使用该文本的地方
3. 测试切换语言的效果

### 删除废弃文本
1. 确认没有组件使用该文本
2. 同时从中英文版本删除
3. 更新相关文档

## 总结

本次i18n扩展是一个重大的改进：

✅ **完成**：
- 翻译文件扩展（中英文各 80+ 项）
- 所有硬编码文本识别
- 翻译文本组织和命名

🔄 **进行中**：
- 组件更新使用新翻译
- 测试和验证

📋 **待完成**：
- 全部组件更新
- 端到端测试
- 用户文档更新

预计完成后，整个应用将实现 **100%** 的国际化支持！



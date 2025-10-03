# i18n 国际化进度更新报告

## 最新进展

继续深入检查和修复页面上的硬编码中文文本，确保完整的 i18n 支持。

## 已完成的修复（本次）

### 1. RiskReturnScatterChart.tsx ✅
**修复内容：**
- 添加 `useLanguage` hook
- 轴标签：
  - X轴名称：`name="风险"` → `name={t.chartAxisLabels.risk}`
  - X轴标签：`value: '风险 (波动率)'` → `value: t.chartAxisLabels.riskVolatility`
  - Y轴名称：`name="收益"` → `name={t.chartAxisLabels.returnLabel}`
  - Y轴标签：`value: '收益 (年化收益率)'` → `value: t.chartAxisLabels.returnAnnualized`
- Tooltip 格式化：
  - `'年化收益率'` → `t.chartAxisLabels.returnLabel`
  - `'波动率'` → `t.chartAxisLabels.risk`
  - `策略: ${data.strategy}` → `${t.strategy}: ${data.strategy}`
- Scatter 名称：`name="策略"` → `name={t.strategy}`
- 空数据提示：
  - `暂无数据` → `{t.noData}`
  - `请先运行仿真` → `{t.runSimulationFirst}`

### 2. WealthCurveChart.tsx ✅
**修复内容：**
- 添加 `useLanguage` hook
- 轴标签：
  - X轴标签：`value: '轮次'` → `value: t.chartAxisLabels.round`
  - Y轴标签：`value: '资金'` → `value: t.chartAxisLabels.wealth`
- Tooltip 标签格式：
  - `labelFormatter={(label) => '第 ${label} 轮'}` → `labelFormatter={(label) => '${t.chartAxisLabels.round} ${label}'}`

## 发现的待修复硬编码文本

### 仍需修复的组件

#### 1. PerformanceMetricsChart.tsx（14个硬编码指标名称）
```typescript
{ key: 'totalReturn', name: '总收益率', ... }
{ key: 'annualizedReturn', name: '年化收益率', ... }
{ key: 'volatility', name: '波动率', ... }
{ key: 'sharpeRatio', name: '夏普比率', ... }
{ key: 'sortinoRatio', name: '索提诺比率', ... }
{ key: 'maxDrawdown', name: '最大回撤', ... }
{ key: 'winRate', name: '胜率', ... }
{ key: 'profitFactor', name: '盈利因子', ... }
{ key: 'averageWin', name: '平均盈利', ... }
{ key: 'averageLoss', name: '平均亏损', ... }
{ key: 'winLossRatio', name: '盈亏比', ... }
{ key: 'skewness', name: '偏度', ... }
{ key: 'kurtosis', name: '峰度', ... }
value: '指标值'
```

#### 2. ReturnDistributionChart.tsx（2个硬编码标签）
```typescript
value: '分位数 (%)'
value: '收益率'
```

#### 3. PerformanceChartsPanel.tsx（17个硬编码图表标题和标签）
```typescript
value: '轮次'
'累计收益率', '收益率 (%)'
'资金增长倍数', '倍数'
'累计最大回撤', '回撤 (%)'
'波动率（滚动）', '波动率 (%)'
'累计收益/最大回撤比', '收益/回撤比'
'资金新高次数（累计）', '新高次数'
'对数收益', '对数收益'
'相对初始资金变化', '变化率 (%)'
```

#### 4. ChartPanel.tsx（29个图表 x 多个标签 = 约60个硬编码文本）
包括但不限于：
```typescript
'资金曲线', '资金'
'累计收益率', '收益率 (%)'
'累计最大回撤', '回撤 (%)'
'波动率（滚动10轮）', '波动率 (%)'
'对数收益', '对数收益'
'收益回撤比', '收益/回撤比'
'资金新高次数（累计）', '新高次数'
'相对初始资金变化率', '变化率 (%)'
'资金增长速度', '增长速度 (%)'
'累计盈利幅度', '盈利 (%)'
'累计亏损幅度', '亏损 (%)'
'相对峰值回撤', '回撤 (%)'
'历史峰值资金', '峰值资金'
'距离峰值差距', '差距'
'盈利回合占比（滚动20轮）', '盈利占比 (%)'
'平均盈利幅度（滚动20轮）', '平均盈利 (%)'
'平均亏损幅度（滚动20轮）', '平均亏损 (%)'
'盈亏比（滚动20轮）', '盈亏比'
'夏普比率（滚动30轮）', '夏普比率'
'索提诺比率（滚动30轮）', '索提诺比率'
'卡尔玛比率', '卡尔玛比率'
'当前连续盈利次数', '连胜次数'
'当前连续亏损次数', '连亏次数'
'历史最长连胜', '最长连胜'
'历史最长连亏', '最长连亏'
'资金恢复力指数', '恢复力 (%)'
'风险价值VaR 5%（滚动50轮）', ...
'历史最大单轮盈利', '最大盈利 (%)'
'历史最大单轮亏损', '最大亏损 (%)'
```

#### 5. chartUtils.ts（策略名称映射）
```typescript
const strategyNames: Record<string, string> = {
  kelly: '凯利',
  fractionalKelly: '分数凯利',
  fixedFraction: '固定比例',
  fixedStake: '固定注金',
  paroli: '帕罗利',
  martingale: '马丁格尔'
};
```
这个对象出现了2次（两个函数中）。

## 当前构建状态

✅ **构建成功**

虽然还有大量硬编码文本未修复，但当前代码可以正常构建和运行。

## 翻译文件现状

`src/i18n/translations.ts` 中已经包含了所有需要的翻译键：

- ✅ `chartAxisLabels`: 29 个完整的图表轴标签
- ✅ `performanceMetrics`: 13 个性能指标翻译
- ✅ `charts`: 所有图表标题翻译
- ✅ `noData`, `runSimulationFirst` 等通用UI文本

**问题所在：**
这些翻译键已存在，但组件中仍在使用硬编码的中文字符串，而不是使用 `t.xxx` 来获取翻译。

## 修复策略建议

### 立即修复（高优先级）
1. **PerformanceMetricsChart.tsx** - 修改指标数组使用 `t.performanceMetrics`
2. **ReturnDistributionChart.tsx** - 修改轴标签使用 `t.chartAxisLabels`

### 次要修复（中优先级）
3. **PerformanceChartsPanel.tsx** - 修改图表标题和标签
4. **chartUtils.ts** - 修改策略名称映射使用 `t.strategyTypes`

### 大规模修复（低优先级，但重要）
5. **ChartPanel.tsx** - 29个图表的标题和标签修复
   - 这是工作量最大的部分
   - 建议批量修改，使用 `t.charts` 和 `t.chartAxisLabels`

## 下一步行动

由于 ChartPanel.tsx 包含了大量的硬编码文本（约60处），建议：

1. **优先修复小文件**：先修复 PerformanceMetricsChart、ReturnDistributionChart
2. **修复工具函数**：然后修复 chartUtils.ts
3. **最后集中修复大文件**：ChartPanel.tsx 和 PerformanceChartsPanel.tsx

## 估计工作量

- PerformanceMetricsChart.tsx: ~15分钟
- ReturnDistributionChart.tsx: ~5分钟
- chartUtils.ts: ~10分钟
- PerformanceChartsPanel.tsx: ~20分钟
- ChartPanel.tsx: ~40分钟

**总计约 1.5小时的工作量**

## 结论

虽然还有大量硬编码文本需要修复，但：
1. ✅ 翻译文件已完善
2. ✅ 核心组件已支持 i18n（部分）
3. ✅ 构建成功，代码可运行
4. ⚠️ 图表组件是最后的硬编码堡垒

建议继续系统地修复剩余的硬编码文本，以实现完整的 i18n 支持。



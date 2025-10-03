# 帮助提示使用指南

## 如何添加新的帮助提示

### 步骤 1: 在翻译文件中添加帮助文本

编辑 `src/i18n/translations.ts`，在 `help` 对象中添加新的条目：

```typescript
// 中文版本
export const translations = {
  zh: {
    // ... 其他翻译
    help: {
      // 添加新的帮助文本
      yourNewField: '字段名称：详细的帮助说明，包括定义、计算方法、实际意义和使用建议。',
      // ... 其他帮助文本
    }
  },
  
  en: {
    // ... 其他翻译
    help: {
      // 添加对应的英文版本
      yourNewField: 'Field Name: Detailed help text including definition, calculation method, practical significance, and usage tips.',
      // ... 其他帮助文本
    }
  }
};
```

### 步骤 2: 在组件中使用帮助提示

有两种使用方式：

#### 方式 1: 使用翻译系统（推荐）

```tsx
import { HelpTooltip } from './HelpTooltip';
import { useLanguage } from '../contexts/LanguageContext';

export const YourComponent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <label className="flex items-center gap-1">
        字段名称
        <HelpTooltip content={t.help.yourNewField} />
      </label>
    </div>
  );
};
```

#### 方式 2: 直接传递内容（不推荐，不支持国际化）

```tsx
import { HelpTooltip } from './HelpTooltip';

export const YourComponent: React.FC = () => {
  return (
    <div>
      <label className="flex items-center gap-1">
        字段名称
        <HelpTooltip content="这是一个帮助提示" />
      </label>
    </div>
  );
};
```

#### 方式 3: 使用预定义的图表帮助键（仅用于图表）

```tsx
import { HelpTooltip } from './HelpTooltip';

export const ChartComponent: React.FC = () => {
  return (
    <div>
      <h3 className="flex items-center gap-1">
        资金曲线
        <HelpTooltip helpKey="wealthCurve" />
      </h3>
    </div>
  );
};
```

## 帮助文本编写指南

### 结构建议

一个好的帮助文本应该包含以下部分：

```
字段名称：简短的定义。详细说明包括计算方法、实际意义和使用建议。可以包含示例和注意事项。
```

### 示例

**好的帮助文本**：
```
胜率：每次下注获胜的概率。例如0.6表示60%的胜率。这是一个关键参数，直接影响凯利公式计算的最优下注比例。胜率越高，最优下注比例通常越大。
```

**不好的帮助文本**（太简短）：
```
胜率：获胜的概率。
```

### 编写原则

1. **清晰简洁**：使用简单易懂的语言，避免过于专业的术语
2. **信息完整**：包含定义、计算方法、意义和建议
3. **适当长度**：一般 2-4 句话，60-150 字为宜
4. **举例说明**：适当使用具体数值示例
5. **双语一致**：确保中英文表达的含义一致

## 常见问题

### Q: 帮助提示框的位置如何调整？

A: 默认提示框显示在问号按钮的上方。如需调整，修改 `HelpTooltip.tsx` 中的 CSS 类：

```tsx
// 当前：显示在上方
<div className="... bottom-full mb-2">

// 修改为显示在下方
<div className="... top-full mt-2">

// 修改为显示在右侧
<div className="... left-full ml-2">
```

### Q: 帮助提示框的宽度如何调整？

A: 修改 `HelpTooltip.tsx` 中的 `w-64` 类：

```tsx
// 当前宽度：w-64 (16rem = 256px)
<div className="... w-64 ...">

// 更宽：w-80 (20rem = 320px)
<div className="... w-80 ...">

// 更窄：w-48 (12rem = 192px)
<div className="... w-48 ...">
```

### Q: 如何让帮助提示框在移动端表现更好？

A: 可以添加响应式类：

```tsx
<div className="... w-64 sm:w-80 ...">
```

这样在小屏幕上宽度为 16rem，中等及以上屏幕为 20rem。

### Q: TypeScript 提示找不到 help 属性？

A: 确保你的 IDE 已经重新加载了类型定义。TypeScript 会自动从 `translations.ts` 推断出所有可用的属性。如果仍然有问题，尝试：
1. 重启 TypeScript 服务器
2. 检查 `translations.ts` 中的 `help` 对象是否在两个语言版本中都存在

### Q: 如何为表格中的列添加帮助提示？

A: 在表头 `<th>` 中使用 flex 布局：

```tsx
<th className="... flex items-center gap-1">
  列名
  <HelpTooltip content={t.help.columnName} />
</th>
```

如果需要右对齐：

```tsx
<th className="... flex items-center justify-end gap-1">
  列名
  <HelpTooltip content={t.help.columnName} />
</th>
```

## 最佳实践

1. **统一风格**：保持所有帮助文本的风格和结构一致
2. **及时更新**：当功能变化时，同步更新帮助文本
3. **用户测试**：收集用户反馈，持续改进帮助文本的质量
4. **避免重复**：相似的概念可以引用或交叉链接（未来功能）
5. **保持同步**：中英文版本应该表达相同的含义

## 相关文件

- `src/components/HelpTooltip.tsx` - 帮助提示组件
- `src/i18n/translations.ts` - 翻译文件（包含帮助文本）
- `src/utils/chartHelpTexts.ts` - 图表专用的帮助文本
- `HELP_TOOLTIP_IMPROVEMENTS.md` - 详细的改进说明

## 示例代码

完整的使用示例请参考：
- `src/components/ParameterPanel.tsx` - 参数面板中的帮助提示
- `src/components/StatisticsTable.tsx` - 统计表格中的帮助提示
- `src/components/ControlPanel.tsx` - 控制面板中的帮助提示



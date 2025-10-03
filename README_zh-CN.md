# 凯利公式计算器

简体中文 | [English](./README.md)

🎯 **在线演示**: [https://tradermoney.github.io/KellyCriterion/](https://tradermoney.github.io/KellyCriterion/)

一款专业的量化投资风险管理工具，帮助投资者理解并应用凯利公式进行最优仓位管理策略。

## 📚 什么是凯利公式？

凯利公式是一个数学公式，用于确定一系列投注的最优规模，以实现长期增长最大化。在投资中，它帮助确定应将多少百分比的资金分配给每个投资机会。

**公式**: f* = (bp - q) / b

其中：
- f* = 应投注的资金比例
- b = 投注的赔率
- p = 获胜概率
- q = 失败概率 (1 - p)

## ✨ 核心特性

### 🎮 交互式仿真
- 实时蒙特卡洛模拟，参数可调
- 多策略对比分析
- 动画图表和统计数据的可视化反馈

### 📊 全面可视化
- **29个时间序列图表**：多维度完整性能分析
  - 资金曲线和累计收益
  - 回撤分析和风险指标
  - 收益分布和直方图
  - 绩效指标对比
  - 风险收益散点图
  - 还有更多...

### 🎯 多策略支持
- **凯利公式**：最优增长投注策略
- **分数凯利**：保守变种（如半凯利、四分之一凯利）
- **固定比例**：按固定资金百分比下注
- **固定注金**：按固定金额下注
- **Paroli策略**：累进式投注（盈利时加倍）
- **Martingale策略**：在亏损时加倍（高风险）

### 🔧 灵活配置
- 初始资金
- 仿真轮数
- 胜率和赔率
- 交易手续费
- 最大下注限制
- 破产阈值
- 仿真路径数

### 📈 详细统计
- **绩效指标**：最终资金、收益率、盈利路径
- **风险指标**：标准差、最大回撤、破产率
- **分布分析**：百分位数、中位数、最小/最大值

### 💾 数据持久化
- 自动保存仿真结果
- 从上次会话恢复
- 导出结果为CSV或JSON

### 🌍 国际化
- 🇨🇳 简体中文
- 🇺🇸 英语
- 易于添加更多语言

### 🎨 现代化UI/UX
- 深色模式支持
- 响应式设计（桌面端优化）
- 流畅的Framer Motion动画
- Material-UI组件

## 🚀 快速开始

### 前置要求
- Node.js 18+ 和 npm

### 安装

```bash
# 克隆仓库
git clone https://github.com/tradermoney/KellyCriterion.git
cd KellyCriterion

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 在浏览器中打开 http://localhost:55289
```

### 生产构建

```bash
# 为GitHub Pages构建
npm run build:github

# 预览生产构建
npm run preview:github
```

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI库**: Material-UI + Tailwind CSS
- **图表**: Recharts
- **状态管理**: Zustand
- **动画**: Framer Motion
- **图标**: Lucide React

## 📖 使用指南

1. **设置参数**：配置初始资金、胜率、赔率等仿真参数
2. **选择策略**：添加多个策略进行对比（凯利、分数凯利、固定比例等）
3. **运行仿真**：点击"开始仿真"运行蒙特卡洛模拟
4. **分析结果**：查看全面的图表和统计数据，对比策略表现
5. **导出数据**：将仿真结果导出为CSV或JSON进行进一步分析

## 🎯 使用场景

### 1. 投资组合管理
使用凯利公式根据不同投资的预期收益和概率确定最优仓位大小。

### 2. 交易策略优化
比较不同的投注策略，找到增长与风险之间的最优平衡。

### 3. 风险管理教育
可视化不同策略对长期财富积累的影响，理解正确仓位管理的重要性。

### 4. 策略回测
模拟数千个投注场景，了解不同策略的统计特性。

## ⚠️ 重要提示

- 凯利公式假设你知道真实的概率和赔率，但在现实投资中这很少能实现
- 完全凯利可能过于激进；通常推荐使用分数凯利（如半凯利）
- Martingale策略风险极高，可能导致快速破产
- 本工具仅用于教育和模拟目的；在做出投资决策前请务必进行自己的研究

## 📝 项目结构

```
KellyCriterion/
├── src/
│   ├── components/       # React组件
│   ├── core/            # 核心仿真逻辑
│   ├── contexts/        # React上下文（主题、语言）
│   ├── i18n/            # 国际化
│   ├── stores/          # Zustand状态管理
│   ├── types/           # TypeScript类型定义
│   └── utils/           # 工具函数
├── public/              # 静态资源
└── dist/                # 构建输出（GitHub Pages）
```

## 🤝 贡献

欢迎贡献！请随时提交Pull Request。

1. Fork本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个Pull Request

## 📄 许可证

本项目是开源的，采用MIT许可证。

## 🔗 链接

- **在线演示**: [https://tradermoney.github.io/KellyCriterion/](https://tradermoney.github.io/KellyCriterion/)
- **GitHub仓库**: [https://github.com/tradermoney/KellyCriterion](https://github.com/tradermoney/KellyCriterion)

## 📧 联系方式

如有问题、建议或反馈，请在GitHub上提交issue。

---

⭐ 如果你觉得这个项目有帮助，请在GitHub上给它一个star！

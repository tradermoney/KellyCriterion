import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { ChartHelpKey } from '../utils/chartHelpTexts';
import { chartHelpTexts } from '../utils/chartHelpTexts';

interface HelpTooltipProps {
  content?: string;
  helpKey?: ChartHelpKey;
  title?: string;
}

export const HelpTooltip: React.FC<HelpTooltipProps> = ({ content, helpKey, title }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  
  // 如果提供了helpKey，使用i18n的文本；否则使用content
  const text = helpKey ? chartHelpTexts[language][helpKey] : content || '';

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="inline-flex items-center justify-center w-4 h-4 ml-1 text-xs rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-colors cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={(e) => {
          e.preventDefault();
          setIsVisible(!isVisible);
        }}
      >
        ?
      </button>
      
      {isVisible && (
        <div className="absolute w-64 p-3 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl left-0 bottom-full mb-2" style={{ zIndex: 9999 }}>
          {title && (
            <div className="font-bold text-gray-900 dark:text-gray-100 mb-1">
              {title}
            </div>
          )}
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {text}
          </div>
          <div className="absolute w-2 h-2 bg-white dark:bg-gray-800 border-r border-b border-gray-300 dark:border-gray-600 transform rotate-45 left-2 -bottom-1"></div>
        </div>
      )}
    </div>
  );
};

// 预定义的帮助内容 - 现在使用i18n系统
// 这个对象保留是为了向后兼容，但推荐使用translations系统
const _HELP_TEXTS = {
  // 基础参数
  initialWealth: "初始资金：仿真开始时的初始资金量，默认为100单位。这是所有策略的起始资金基础。",
  rounds: "仿真轮数：模拟进行的总轮数。每一轮代表一次下注机会。轮数越多，结果越能体现策略的长期表现。",
  winProb: "胜率：每次下注获胜的概率。例如0.6表示60%的胜率。这是一个关键参数，影响凯利公式的最优下注比例。",
  odds: "赔率：获胜时的收益倍数。例如赔率为2表示下注1元，赢时获得2元（净赚1元）。赔率越高，潜在收益越大。",
  feeRate: "手续费率：每次下注需要支付的费用比例。例如0.01表示1%的手续费。手续费会降低实际收益。",
  fMax: "最大下注比例：限制单次下注不超过总资金的该比例。用于风险控制，防止过度下注。",
  ruinThreshold: "破产阈值：当资金低于此值时视为破产。默认为1，即资金归零视为破产。",
  paths: "路径数：蒙特卡洛模拟的次数。每个路径代表一次完整的模拟过程。路径数越多，统计结果越稳定可靠。",
  
  // 策略类型
  kelly: "凯利公式：根据胜率和赔率计算最优下注比例 f* = (bp - q) / b，可最大化长期对数收益。这是理论上的最优策略。",
  fractionalKelly: "分数凯利：使用凯利公式计算的比例乘以一个分数α（如0.5）。更保守，降低波动性，但也会降低预期收益。",
  fixedFraction: "固定比例：每次下注固定比例的当前资金。简单易行，但不一定是最优策略。",
  fixedStake: "固定注金：每次下注固定金额k。不随资金变化，风险较高。",
  paroli: "帕罗利策略：连胜时加倍下注，连败时重置。属于正向马丁格尔策略，追逐连胜。",
  martingale: "马丁格尔策略：每次输后加倍下注，赢后重置。高风险策略，可能快速破产。",
  
  // 统计指标
  meanFinal: "平均最终资金：所有模拟路径的最终资金的平均值。反映策略的期望收益。",
  median: "中位数：将所有结果排序后的中间值。比平均值更能反映典型结果，不受极端值影响。",
  expectedReturn: "期望收益率：相对于初始资金的平均收益百分比。正值表示盈利，负值表示亏损。",
  logReturn: "对数收益：使用对数计算的收益，更适合评估复利增长。凯利公式就是最大化长期对数收益。",
  profitablePaths: "盈利路径：最终资金大于初始资金的模拟路径数量和比例。反映策略的成功概率。",
  
  std: "标准差：最终资金的波动程度。标准差越大，结果的不确定性越高，风险越大。",
  maxDrawdown: "最大回撤：从峰值到谷底的最大跌幅百分比。衡量策略的最大风险暴露。",
  ruinRate: "破产率：资金降至破产阈值以下的路径比例。0%最好，表示没有破产风险。",
  percentile5: "5%分位数：最差5%情况下的资金值。用于评估极端不利情况的损失。",
  min: "最小值：所有模拟中最差的结果。反映最坏情况。",
  
  percentile25: "25%分位数（下四分位数）：有25%的结果低于此值，75%高于此值。",
  percentile75: "75%分位数（上四分位数）：有75%的结果低于此值，25%高于此值。",
  percentile95: "95%分位数：最好5%情况下的资金值。反映较好情况的收益。",
  max: "最大值：所有模拟中最好的结果。反映最佳情况。",
  
  // 图表指标
  wealthCurve: "资金曲线：展示每一轮后的平均资金变化。可以看到资金的增长轨迹和波动情况。",
  cumulativeReturn: "累计收益率：相对于初始资金的累计收益百分比变化。",
  cumulativeDrawdown: "累计最大回撤：每一轮的最大回撤百分比。回撤越小，策略越稳健。",
  rollingVolatility: "波动率（滚动）：使用滚动窗口计算的波动率。反映最近一段时间的风险水平变化。",
  logWealth: "对数收益：对数尺度下的资金变化。更适合观察长期复利增长。",
  returnDrawdownRatio: "收益回撤比：累计收益除以最大回撤。比值越高，风险调整后的收益越好。",
  newHighs: "资金新高次数：创造历史新高的累计次数。反映策略的持续盈利能力。",
  
  growthRate: "资金增长速度：单轮资金变化的百分比。反映每轮的盈亏幅度。",
  cumulativeProfit: "累计盈利幅度：相对初始资金的盈利部分（仅计算盈利）。",
  cumulativeLoss: "累计亏损幅度：相对初始资金的亏损部分（仅计算亏损）。",
  peakWealth: "历史峰值资金：到当前轮次为止的最高资金值。",
  distanceFromPeak: "距离峰值差距：当前资金与历史峰值的差距。差距越大，回撤越深。",
  
  winRateRolling: "盈利回合占比（滚动）：最近N轮中盈利轮次的比例。反映短期胜率变化。",
  avgProfitRolling: "平均盈利幅度（滚动）：最近N轮中平均每次盈利的幅度。",
  avgLossRolling: "平均亏损幅度（滚动）：最近N轮中平均每次亏损的幅度。",
  profitLossRatioRolling: "盈亏比（滚动）：平均盈利除以平均亏损。大于1表示盈利幅度超过亏损。",
  
  sharpeRatio: "夏普比率：风险调整后的收益指标，计算为（平均收益率）/（收益率标准差）。越高越好，一般>1为良好。",
  sortinoRatio: "索提诺比率：类似夏普比率，但只考虑下行风险。更关注亏损的波动，而忽略盈利波动。",
  calmarRatio: "卡尔玛比率：年化收益率除以最大回撤。衡量承担回撤风险获得的收益。越高越好。",
  
  currentWinStreak: "当前连续盈利次数：当前正在进行的连胜轮数。连胜越长，说明最近表现越好。",
  currentLossStreak: "当前连续亏损次数：当前正在进行的连亏轮数。连亏越长，可能需要调整策略。",
  maxWinStreak: "历史最长连胜：历史上最长的连续盈利轮数。反映策略的最佳连续表现。",
  maxLossStreak: "历史最长连亏：历史上最长的连续亏损轮数。反映策略的最差连续表现。",
  
  recoveryIndex: "资金恢复力指数：相对于峰值的恢复程度。100%表示已恢复到峰值，越低表示回撤越大。",
  var5: "风险价值VaR 5%：在95%的置信度下，单轮最大可能损失的百分比。基于历史模拟计算。",
  maxSingleProfit: "历史最大单轮盈利：单轮盈利的最高百分比。反映策略的最大盈利潜力。",
  maxSingleLoss: "历史最大单轮亏损：单轮亏损的最大百分比。反映策略的最大风险暴露。"
};

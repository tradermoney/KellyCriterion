/**
 * 数据导出工具函数
 * 提供CSV和JSON格式的数据导出功能
 */

/**
 * 将数据导出为CSV格式
 */
export function exportToCSV(data: Record<string, unknown>[], filename: string): void {
  if (!data || data.length === 0) {
    alert('没有数据可导出');
    return;
  }

  try {
    // 获取表头
    const headers = Object.keys(data[0]);
    
    // 构建CSV内容
    const csvContent = [
      headers.join(','), // 表头行
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // 处理包含逗号的字符串值
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    // 创建Blob对象
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // 创建下载链接
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('CSV导出失败:', error);
    alert('CSV导出失败，请重试');
  }
}

/**
 * 将数据导出为JSON格式
 */
export function exportToJSON(data: unknown, filename: string): void {
  if (!data) {
    alert('没有数据可导出');
    return;
  }

  try {
    // 将数据转换为格式化的JSON字符串
    const jsonContent = JSON.stringify(data, null, 2);
    
    // 创建Blob对象
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    
    // 创建下载链接
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.json`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('JSON导出失败:', error);
    alert('JSON导出失败，请重试');
  }
}

/**
 * 格式化仿真结果数据用于导出 (StrategySummary 版本)
 */
export function formatSimulationDataForExport(summaries: Array<{
  strategy: { type: string; params?: Record<string, unknown> };
  meanFinal: number;
  medianFinal: number;
  p5Final: number;
  ruinRate: number;
  meanLogFinal: number;
  meanMDD: number;
  paths: Array<{
    finalWealth: number;
    logWealth: number;
    wins: number;
    losses: number;
    maxDrawdown: number;
    ruin: boolean;
    wealthHistory: number[];
    betHistory: number[];
    resultHistory: ('win' | 'loss')[];
  }>;
}>): {
  wealthCurves: Record<string, unknown>[];
  histograms: Record<string, unknown>[];
  drawdowns: Record<string, unknown>[];
  statistics: Record<string, unknown>[];
} {
  const wealthCurves: Record<string, unknown>[] = [];
  const histograms: Record<string, unknown>[] = [];
  const drawdowns: Record<string, unknown>[] = [];
  const statistics: Record<string, unknown>[] = [];

  summaries.forEach((summary) => {
    const strategyName = summary.strategy.type;
    
    // 从所有路径中提取资金曲线数据
    summary.paths.forEach((path, pathIndex) => {
      path.wealthHistory.forEach((wealth: number, stepIndex: number) => {
        wealthCurves.push({
          strategy: strategyName,
          path: pathIndex,
          step: stepIndex,
          wealth: wealth,
          timestamp: new Date().toISOString()
        });
      });
    });

    // 创建最终财富分布直方图数据
    const finalWealths = summary.paths.map(path => path.finalWealth);
    const minWealth = Math.min(...finalWealths);
    const maxWealth = Math.max(...finalWealths);
    const binCount = 20;
    const binSize = (maxWealth - minWealth) / binCount;
    
    for (let i = 0; i < binCount; i++) {
      const binStart = minWealth + i * binSize;
      const binEnd = binStart + binSize;
      const count = finalWealths.filter(wealth => wealth >= binStart && wealth < binEnd).length;
      
      histograms.push({
        strategy: strategyName,
        bin: i,
        binStart: binStart,
        binEnd: binEnd,
        count: count,
        timestamp: new Date().toISOString()
      });
    }

    // 从所有路径中提取回撤数据
    summary.paths.forEach((path, pathIndex) => {
      // 计算每个步骤的回撤
      let peak = path.wealthHistory[0];
      path.wealthHistory.forEach((wealth: number, stepIndex: number) => {
        if (wealth > peak) peak = wealth;
        const drawdown = (peak - wealth) / peak;
        
        drawdowns.push({
          strategy: strategyName,
          path: pathIndex,
          step: stepIndex,
          drawdown: drawdown,
          timestamp: new Date().toISOString()
        });
      });
    });

    // 统计数据
    statistics.push({
      strategy: strategyName,
      meanFinal: summary.meanFinal,
      medianFinal: summary.medianFinal,
      p5Final: summary.p5Final,
      ruinRate: summary.ruinRate,
      meanLogFinal: summary.meanLogFinal,
      meanMDD: summary.meanMDD,
      timestamp: new Date().toISOString()
    });
  });

  return {
    wealthCurves,
    histograms,
    drawdowns,
    statistics
  };
}

/**
 * 生成导出文件名
 */
export function generateExportFilename(prefix: string): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 19).replace(/:/g, '-');
  return `${prefix}_${dateStr}`;
}
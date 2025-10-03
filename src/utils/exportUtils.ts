/**
 * 数据导出工具函数
 * 提供CSV和JSON格式的数据导出功能
 */

/**
 * 将数据导出为CSV格式
 */
export function exportToCSV(data: any[], filename: string): void {
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
export function exportToJSON(data: any, filename: string): void {
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
 * 格式化仿真结果数据用于导出
 */
export function formatSimulationDataForExport(results: any[]): {
  wealthCurves: any[];
  histograms: any[];
  drawdowns: any[];
  statistics: any[];
} {
  const wealthCurves: any[] = [];
  const histograms: any[] = [];
  const drawdowns: any[] = [];
  const statistics: any[] = [];

  results.forEach((result) => {
    const strategyName = result.strategy.name;
    
    // 资金曲线数据
    result.wealthCurve.forEach((wealth: number, stepIndex: number) => {
      wealthCurves.push({
        strategy: strategyName,
        step: stepIndex,
        wealth: wealth,
        timestamp: new Date().toISOString()
      });
    });

    // 直方图数据
    result.finalWealthDistribution.forEach((count: number, binIndex: number) => {
      histograms.push({
        strategy: strategyName,
        bin: binIndex,
        count: count,
        timestamp: new Date().toISOString()
      });
    });

    // 回撤数据
    result.drawdownCurve.forEach((drawdown: number, stepIndex: number) => {
      drawdowns.push({
        strategy: strategyName,
        step: stepIndex,
        drawdown: drawdown,
        timestamp: new Date().toISOString()
      });
    });

    // 统计数据
    statistics.push({
      strategy: strategyName,
      finalWealth: result.finalWealth,
      expectedReturn: result.expectedReturn,
      standardDeviation: result.standardDeviation,
      sharpeRatio: result.sharpeRatio,
      maxDrawdown: result.maxDrawdown,
      bankruptcyProbability: result.bankruptcyProbability,
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
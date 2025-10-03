import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { BarChart3, Download } from 'lucide-react';
import { performanceMonitor } from '../utils/performanceMonitor';

export const PerformanceMonitor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState({
    averageSimulationTime: 0,
    totalSimulations: 0,
    memoryUsage: 0,
    totalMetrics: 0
  });

  useEffect(() => {
    // 定期更新性能数据
    const interval = setInterval(() => {
      const report = performanceMonitor.getPerformanceReport();
      const avgSimTime = performanceMonitor.getAverageSimulationTime();

      setMetrics({
        averageSimulationTime: avgSimTime,
        totalSimulations: report.filter(m => m.simulationTime !== undefined).length,
        memoryUsage: report[report.length - 1]?.memoryUsage || 0,
        totalMetrics: report.length
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleExportData = () => {
    const data = performanceMonitor.exportPerformanceData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-report-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    performanceMonitor.clear();
    setMetrics({
      averageSimulationTime: 0,
      totalSimulations: 0,
      memoryUsage: 0,
      totalMetrics: 0
    });
  };

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 shadow-lg"
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        性能监控
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-h-96 bg-white dark:bg-gray-800 rounded-[10px] shadow-xl border border-gray-200 dark:border-gray-700">
      <Card className="border-0 shadow-none">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">性能监控</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExportData}
                className="h-6 px-2"
                title="导出性能数据"
              >
                <Download className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="h-6 px-2"
              >
                ×
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <div className="text-gray-500 dark:text-gray-400">平均仿真时间</div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {metrics.averageSimulationTime.toFixed(2)}ms
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <div className="text-gray-500 dark:text-gray-400">仿真次数</div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {metrics.totalSimulations}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <div className="text-gray-500 dark:text-gray-400">内存使用</div>
                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {metrics.memoryUsage > 0 ? `${(metrics.memoryUsage / 1024 / 1024).toFixed(1)}MB` : 'N/A'}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <div className="text-gray-500 dark:text-gray-400">监控点</div>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {metrics.totalMetrics}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleClearData}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                清除数据
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
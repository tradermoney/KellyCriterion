/**
 * 性能监控工具
 * 用于监控应用性能和用户交互
 */

import React from 'react';

interface PerformanceMetrics {
  timestamp: number;
  memoryUsage?: number;
  renderTime?: number;
  simulationTime?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private enabled: boolean = process.env.NODE_ENV === 'development';

  /**
   * 开始性能监控
   */
  startMonitoring(): void {
    if (!this.enabled) return;

    this.metrics = [];

    // 监控内存使用情况（如果可用）
    if ('memory' in performance) {
      this.recordMetric({
        timestamp: Date.now(),
        memoryUsage: (performance as any).memory.usedJSHeapSize
      });
    }
  }

  /**
   * 记录性能指标
   */
  recordMetric(metric: Partial<PerformanceMetrics>): void {
    if (!this.enabled) return;

    this.metrics.push({
      timestamp: Date.now(),
      ...metric
    });
  }

  /**
   * 记录仿真性能
   */
  recordSimulationTime(duration: number): void {
    this.recordMetric({
      simulationTime: duration
    });
  }

  /**
   * 记录组件渲染时间
   */
  recordRenderTime(componentName: string, duration: number): void {
    this.recordMetric({
      renderTime: duration
    });

    if (duration > 100) { // 如果渲染时间超过100ms，打印警告
      console.warn(`[Performance] ${componentName} 渲染时间: ${duration.toFixed(2)}ms`);
    }
  }

  /**
   * 获取性能报告
   */
  getPerformanceReport(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  /**
   * 获取平均仿真时间
   */
  getAverageSimulationTime(): number {
    const simulationTimes = this.metrics.filter(m => m.simulationTime !== undefined);
    if (simulationTimes.length === 0) return 0;

    const total = simulationTimes.reduce((sum, m) => sum + (m.simulationTime || 0), 0);
    return total / simulationTimes.length;
  }

  /**
   * 清理性能数据
   */
  clear(): void {
    this.metrics = [];
  }

  /**
   * 导出性能数据
   */
  exportPerformanceData(): string {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: this.metrics,
      averageSimulationTime: this.getAverageSimulationTime(),
      totalRecords: this.metrics.length
    };

    return JSON.stringify(report, null, 2);
  }
}

// 创建全局性能监控实例
export const performanceMonitor = new PerformanceMonitor();

/**
 * 性能监控Hook
 * 用于React组件的性能监控
 */
export function usePerformanceMonitor(componentName: string) {
  const startTimeRef = React.useRef<number>(0);

  React.useEffect(() => {
    startTimeRef.current = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTimeRef.current;
      performanceMonitor.recordRenderTime(componentName, renderTime);
    };
  }, [componentName]);
}

/**
 * 仿真性能监控包装器
 */
export function withSimulationPerformance<T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T {
  return (async (...args: Parameters<T>) => {
    const startTime = performance.now();

    try {
      const result = await fn(...args);
      const endTime = performance.now();
      const duration = endTime - startTime;

      performanceMonitor.recordSimulationTime(duration);

      if (duration > 1000) { // 如果仿真时间超过1秒，打印警告
        console.warn(`[Performance] ${name} 仿真时间: ${duration.toFixed(2)}ms`);
      }

      return result;
    } catch (error) {
      console.error(`[Performance] ${name} 仿真失败:`, error);
      throw error;
    }
  }) as T;
}
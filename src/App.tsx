import { useEffect } from 'react';
import { ParameterPanel } from './components/ParameterPanel';
import { ControlPanel } from './components/ControlPanel';
import { ChartPanel } from './components/ChartPanel';
import { StatisticsTable } from './components/StatisticsTable';
// import { PerformanceChartsPanel } from './components/PerformanceChartsPanel';
import { ExportPanel } from './components/ExportPanel';
import { LanguageSwitch } from './components/LanguageSwitch';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useSimulationStore } from './stores/simulationStore';
import { motion } from 'framer-motion';
import { performanceMonitor } from './utils/performanceMonitor';
import { PerformanceMonitor as PerformanceMonitorComponent } from './components/PerformanceMonitor';

// 持久化测试工具已移除

function AppContent() {
  const {
    result,
    loadConfig,
    loadControlState,
    loadLastResult
  } = useSimulationStore();
  const { t } = useLanguage();

  // 初始化：加载所有保存的数据
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 启动性能监控
        performanceMonitor.startMonitoring();
        console.log('[Performance] 应用性能监控已启动');

        // 并行加载所有持久化数据
        await Promise.all([
          loadConfig(),
          loadControlState(),
          loadLastResult()
        ]);

        // 记录初始化完成时间
        const initTime = performance.now();
        performanceMonitor.recordMetric({
          renderTime: initTime
        });
        console.log('[Performance] 应用初始化完成');
      } catch (error) {
        console.error('应用初始化失败:', error);
      }
    };

    initializeApp();

    // 清理性能监控数据
    return () => {
      const report = performanceMonitor.exportPerformanceData();
      console.log('[Performance] 应用性能报告:', report);
      performanceMonitor.clear();
    };
  }, [loadConfig, loadControlState, loadLastResult]);

  // 动态更新网页标题
  useEffect(() => {
    document.title = t.pageTitle;
  }, [t]);
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-500">
      {/* 头部 */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 border-b border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="py-1 sm:py-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <div className="flex-1">
                <motion.div 
                  className="flex items-center gap-2"
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-[10px] flex items-center justify-center text-white text-lg font-bold shadow-lg transform hover:rotate-12 transition-all duration-300">
                    K
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {t.title}
                  </h1>
                </motion.div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 ml-10 font-medium">
                  {t.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <LanguageSwitch />
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* 主要内容 */}
      <main className="max-w-8xl mx-auto px-2 sm:px-4 py-1 sm:py-2">
        {/* 移动端提示 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:hidden mb-1"
        >
          <div className="bg-slate-600 text-white rounded-[10px] p-2 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-lg">📱</span>
              <p className="text-sm font-medium">{t.mobileWarning}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-1 sm:gap-2">
          {/* 参数设置面板 */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            <ParameterPanel />
          </motion.div>
          
          {/* 控制面板 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            {/* 控制面板 */}
            <div className="bg-white dark:bg-gray-800 rounded-[10px] border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden transition-all duration-300">
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-2 sm:p-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 bg-white/20 rounded-[10px] flex items-center justify-center text-sm">🎮</span>
                  {t.simulationControl}
                </h2>
                <p className="text-slate-200 text-xs mt-0.5">{t.simulationControlDesc}</p>
              </div>
              <div className="p-2 sm:p-3">
                <ControlPanel />
              </div>
            </div>

          </motion.div>
          
          {/* 结果展示 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full"
          >
            {result && result.summaries.length > 0 ? (
              <>
                {/* 策略绩效分析 - 包含所有折线图 */}
                <div className="bg-white dark:bg-gray-800 rounded-[10px] border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden transition-all duration-300">
                  <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-2 sm:p-3">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-6 h-6 bg-white/20 rounded-[10px] flex items-center justify-center text-sm">📈</span>
                      {t.performanceAnalysis}
                    </h2>
                    <p className="text-slate-200 text-xs mt-0.5">{t.performanceAnalysisDesc}</p>
                  </div>
                  <div className="p-2 sm:p-3">
                    <ChartPanel summaries={result.summaries} />
                  </div>
                </div>

                {/* 统计表格 */}
                <div className="mt-2 bg-white dark:bg-gray-800 rounded-[10px] border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden transition-all duration-300">
                  <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-2 sm:p-3">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-6 h-6 bg-white/20 rounded-[10px] flex items-center justify-center text-sm">📊</span>
                      {t.statistics}
                    </h2>
                    <p className="text-slate-200 text-xs mt-0.5">{t.statisticsDesc}</p>
                  </div>
                  <div className="p-2 sm:p-3 overflow-x-auto">
                    <StatisticsTable summaries={result.summaries} />
                  </div>
                </div>

                {/* 导出面板 */}
                <div className="mt-2 bg-white dark:bg-gray-800 rounded-[10px] border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden transition-all duration-300">
                  <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-2 sm:p-3">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-6 h-6 bg-white/20 rounded-[10px] flex items-center justify-center text-sm">📤</span>
                      {t.dataExport}
                    </h2>
                    <p className="text-slate-200 text-xs mt-0.5">{t.dataExportDesc}</p>
                  </div>
                  <div className="p-2 sm:p-3">
                    <ExportPanel />
                  </div>
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="bg-white dark:bg-gray-800 rounded-[10px] border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
              >
                <div className="bg-gray-600 p-2 sm:p-3">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 bg-white/20 rounded-[10px] flex items-center justify-center text-sm">📊</span>
                    {t.simulationResults}
                  </h2>
                  <p className="text-gray-200 text-xs mt-0.5">{t.waitingForSimulation}</p>
                </div>
                <div className="p-4 text-center">
                  <motion.div 
                    animate={{ 
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="w-16 h-16 mx-auto mb-3 bg-slate-100 dark:bg-slate-800 rounded-[10px] flex items-center justify-center text-2xl shadow-lg"
                  >
                    🚀
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">{t.readyToStart}</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-sm">
                    {t.setParametersAndStart}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      {/* 底部 */}
      <footer className="mt-2 py-2 border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2024 凯利公式计算器 - 量化投资风险管理工具
            </p>
          </div>
        </div>
      </footer>

      {/* 性能监控组件 */}
      <PerformanceMonitorComponent />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="light">
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;

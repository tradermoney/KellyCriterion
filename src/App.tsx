import { useEffect } from 'react';
import { ParameterPanel } from './components/ParameterPanel';
import { ControlPanel } from './components/ControlPanel';
import { ChartPanel } from './components/ChartPanel';
import { StatisticsTable } from './components/StatisticsTable';
import { ExportPanel } from './components/ExportPanel';
import { LanguageSwitch } from './components/LanguageSwitch';
import { ThemeSwitch } from './components/ThemeSwitch';
import { PersistenceStatus } from './components/PersistenceStatus';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useSimulationStore } from './stores/simulationStore';
import { motion } from 'framer-motion';

// 在开发环境下导入持久化测试工具
if (import.meta.env.DEV) {
  import('./utils/persistenceTest');
}

function AppContent() {
  const { 
    result, 
    loadConfig, 
    loadControlState, 
    loadLastResult 
  } = useSimulationStore();
  const { language, setLanguage, t } = useLanguage();
  
  // 初始化：加载所有保存的数据
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 并行加载所有持久化数据
        await Promise.all([
          loadConfig(),
          loadControlState(),
          loadLastResult()
        ]);
      } catch (error) {
        console.error('应用初始化失败:', error);
      }
    };
    
    initializeApp();
  }, [loadConfig, loadControlState, loadLastResult]);
  
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
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-md flex items-center justify-center text-white text-lg font-bold shadow-lg transform hover:rotate-12 transition-all duration-300">
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
                <LanguageSwitch
                  currentLanguage={language}
                  onLanguageChange={setLanguage}
                />
                <ThemeSwitch />
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
          <div className="bg-slate-600 text-white rounded-md p-2 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-lg">📱</span>
              <p className="text-sm font-medium">为了获得最佳体验效果，建议在桌面端访问此工具</p>
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
            <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden transition-all duration-300">
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-2 sm:p-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-sm">🎮</span>
                  仿真控制
                </h2>
                <p className="text-slate-200 text-xs mt-0.5">开始仿真和实时控制</p>
              </div>
              <div className="p-2 sm:p-3">
                <ControlPanel />
              </div>
            </div>

            {/* 导出面板 */}
            <div className="mt-2 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden transition-all duration-300">
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-2 sm:p-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-sm">📤</span>
                  数据导出
                </h2>
                <p className="text-slate-200 text-xs mt-0.5">导出仿真结果和图表</p>
              </div>
              <div className="p-2 sm:p-3">
                <ExportPanel />
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
                {/* 图表面板 */}
                <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden transition-all duration-300">
                  <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-2 sm:p-3">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-sm">📈</span>
                      图表分析
                    </h2>
                    <p className="text-slate-200 text-xs mt-0.5">可视化仿真结果</p>
                  </div>
                  <div className="p-2 sm:p-3">
                    <ChartPanel summaries={result.summaries} />
                  </div>
                </div>

                {/* 统计表格 */}
                <div className="mt-2 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden transition-all duration-300">
                  <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-2 sm:p-3">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-sm">📊</span>
                      统计数据
                    </h2>
                    <p className="text-slate-200 text-xs mt-0.5">详细的策略对比数据</p>
                  </div>
                  <div className="p-2 sm:p-3 overflow-x-auto">
                    <StatisticsTable summaries={result.summaries} />
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
                className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
              >
                <div className="bg-gray-600 p-2 sm:p-3">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-sm">📊</span>
                    仿真结果
                  </h2>
                  <p className="text-gray-200 text-xs mt-0.5">等待仿真开始</p>
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
                    className="w-16 h-16 mx-auto mb-3 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center text-2xl shadow-lg"
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

      {/* 持久化状态指示器 */}
      <PersistenceStatus />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider defaultLanguage="zh">
      <ThemeProvider defaultTheme="light">
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;

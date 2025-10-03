/**
 * 持久化功能测试工具
 * 用于验证IndexedDB存储是否正常工作
 */

import { storage, STORAGE_KEYS } from './storage';

export interface TestResult {
  testName: string;
  success: boolean;
  error?: string;
  data?: any;
}

export class PersistenceTester {
  private results: TestResult[] = [];

  async runAllTests(): Promise<TestResult[]> {
    this.results = [];
    
    console.log('🧪 开始持久化功能测试...');
    
    await this.testBasicStorage();
    await this.testSimulationConfig();
    await this.testControlState();
    await this.testExportSettings();
    await this.testThemeAndLanguage();
    
    console.log('✅ 持久化功能测试完成');
    this.printResults();
    
    return this.results;
  }

  private async testBasicStorage(): Promise<void> {
    try {
      const testKey = 'test_basic';
      const testData = { message: 'Hello IndexedDB!', timestamp: Date.now() };
      
      // 测试写入
      await storage.setItem(testKey, testData);
      
      // 测试读取
      const retrieved = await storage.getItem(testKey);
      
      if (JSON.stringify(retrieved) === JSON.stringify(testData)) {
        this.addResult('基础存储测试', true, undefined, retrieved);
      } else {
        this.addResult('基础存储测试', false, '数据不匹配');
      }
      
      // 清理测试数据
      await storage.removeItem(testKey);
    } catch (error) {
      this.addResult('基础存储测试', false, error instanceof Error ? error.message : '未知错误');
    }
  }

  private async testSimulationConfig(): Promise<void> {
    try {
      const testConfig = {
        initialWealth: 200,
        rounds: 50,
        winProb: 0.6,
        odds: 1.5,
        feeRate: 0.001,
        fMax: 0.8,
        ruinThreshold: 1,
        paths: 500,
        batchSize: 50,
        strategies: [
          { type: 'kelly' as const },
          { type: 'fractionalKelly' as const, params: { alpha: 0.5 } }
        ]
      };
      
      await storage.setItem(STORAGE_KEYS.SIMULATION_CONFIG, testConfig);
      const retrieved = await storage.getItem(STORAGE_KEYS.SIMULATION_CONFIG);
      
      if (retrieved && (retrieved as any).initialWealth === 200) {
        this.addResult('仿真配置存储测试', true, undefined, retrieved);
      } else {
        this.addResult('仿真配置存储测试', false, '配置数据不正确');
      }
    } catch (error) {
      this.addResult('仿真配置存储测试', false, error instanceof Error ? error.message : '未知错误');
    }
  }

  private async testControlState(): Promise<void> {
    try {
      const testState = {
        lastSimulationTime: Date.now(),
        autoSaveResults: true
      };
      
      await storage.setItem(STORAGE_KEYS.CONTROL_STATE, testState);
      const retrieved = await storage.getItem(STORAGE_KEYS.CONTROL_STATE);
      
      if (retrieved && (retrieved as any).autoSaveResults === true) {
        this.addResult('控制状态存储测试', true, undefined, retrieved);
      } else {
        this.addResult('控制状态存储测试', false, '控制状态数据不正确');
      }
    } catch (error) {
      this.addResult('控制状态存储测试', false, error instanceof Error ? error.message : '未知错误');
    }
  }

  private async testExportSettings(): Promise<void> {
    try {
      const testSettings = {
        includeMetadata: true,
        includeRawData: false,
        filenamePrefix: 'test_export',
        lastExportTime: Date.now()
      };
      
      await storage.setItem(STORAGE_KEYS.EXPORT_SETTINGS, testSettings);
      const retrieved = await storage.getItem(STORAGE_KEYS.EXPORT_SETTINGS);
      
      if (retrieved && (retrieved as any).filenamePrefix === 'test_export') {
        this.addResult('导出设置存储测试', true, undefined, retrieved);
      } else {
        this.addResult('导出设置存储测试', false, '导出设置数据不正确');
      }
    } catch (error) {
      this.addResult('导出设置存储测试', false, error instanceof Error ? error.message : '未知错误');
    }
  }

  private async testThemeAndLanguage(): Promise<void> {
    try {
      // 测试主题存储
      await storage.setItem(STORAGE_KEYS.THEME, 'dark');
      const theme = await storage.getItem(STORAGE_KEYS.THEME);
      
      // 测试语言存储
      await storage.setItem(STORAGE_KEYS.LANGUAGE, 'en');
      const language = await storage.getItem(STORAGE_KEYS.LANGUAGE);
      
      if (theme === 'dark' && language === 'en') {
        this.addResult('主题和语言存储测试', true, undefined, { theme, language });
      } else {
        this.addResult('主题和语言存储测试', false, '主题或语言数据不正确');
      }
    } catch (error) {
      this.addResult('主题和语言存储测试', false, error instanceof Error ? error.message : '未知错误');
    }
  }

  private addResult(testName: string, success: boolean, error?: string, data?: any): void {
    this.results.push({ testName, success, error, data });
  }

  private printResults(): void {
    console.log('\n📊 测试结果汇总:');
    console.log('='.repeat(50));
    
    this.results.forEach((result, index) => {
      const status = result.success ? '✅' : '❌';
      console.log(`${index + 1}. ${status} ${result.testName}`);
      
      if (!result.success && result.error) {
        console.log(`   错误: ${result.error}`);
      }
      
      if (result.data) {
        console.log(`   数据: ${JSON.stringify(result.data, null, 2)}`);
      }
    });
    
    const successCount = this.results.filter(r => r.success).length;
    const totalCount = this.results.length;
    
    console.log('='.repeat(50));
    console.log(`总计: ${successCount}/${totalCount} 测试通过`);
    
    if (successCount === totalCount) {
      console.log('🎉 所有持久化功能测试通过！');
    } else {
      console.log('⚠️  部分测试失败，请检查IndexedDB配置');
    }
  }

  // 清理所有测试数据
  async cleanup(): Promise<void> {
    try {
      await storage.clear();
      console.log('🧹 测试数据清理完成');
    } catch (error) {
      console.error('清理测试数据失败:', error);
    }
  }
}

// 导出测试器实例
export const persistenceTester = new PersistenceTester();

// 在开发环境下自动运行测试
if (import.meta.env.DEV) {
  // 延迟执行，确保应用完全加载
  setTimeout(() => {
    persistenceTester.runAllTests();
  }, 2000);
}

import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Database, Clock } from 'lucide-react';
import { storage } from '../utils/storage';

interface PersistenceStatusProps {
  className?: string;
}

interface StorageStatus {
  isAvailable: boolean;
  lastSaveTime: number | null;
  error: string | null;
}

export const PersistenceStatus: React.FC<PersistenceStatusProps> = ({ className = '' }) => {
  const [status, setStatus] = useState<StorageStatus>({
    isAvailable: false,
    lastSaveTime: null,
    error: null
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkStorageStatus = async () => {
      try {
        // 测试IndexedDB是否可用
        const testKey = 'storage_test';
        const testData = { test: true, timestamp: Date.now() };
        
        await storage.setItem(testKey, testData);
        const retrieved = await storage.getItem(testKey);
        
        if (retrieved && (retrieved as any).test === true) {
          setStatus({
            isAvailable: true,
            lastSaveTime: Date.now(),
            error: null
          });
          
          // 清理测试数据
          await storage.removeItem(testKey);
        } else {
          setStatus({
            isAvailable: false,
            lastSaveTime: null,
            error: '数据验证失败'
          });
        }
      } catch (error) {
        setStatus({
          isAvailable: false,
          lastSaveTime: null,
          error: error instanceof Error ? error.message : '存储不可用'
        });
      }
    };

    checkStorageStatus();
    
    // 定期检查存储状态
    const interval = setInterval(checkStorageStatus, 30000); // 每30秒检查一次
    
    return () => clearInterval(interval);
  }, []);

  // 监听存储变化
  useEffect(() => {
    const handleStorageChange = () => {
      setStatus(prev => ({
        ...prev,
        lastSaveTime: Date.now()
      }));
      
      // 显示状态提示
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 2000);
    };

    // 监听自定义存储事件
    window.addEventListener('storageChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('storageChange', handleStorageChange);
    };
  }, []);

  if (!status.isAvailable && !status.error) {
    return null; // 如果存储正常且没有错误，不显示状态
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${className}`}>
      {/* 存储状态指示器 */}
      <div className="flex items-center gap-2">
        {/* 主要状态指示器 */}
        <div className={`
          flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg border transition-all duration-300
          ${status.isAvailable 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-400'
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400'
          }
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}>
          {status.isAvailable ? (
            <CheckCircle size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          <span className="text-sm font-medium">
            {status.isAvailable ? '数据已保存' : '存储异常'}
          </span>
        </div>

        {/* 详细状态信息（仅在开发环境显示） */}
        {import.meta.env.DEV && (
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-2 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Database size={12} />
              <span>IndexedDB</span>
            </div>
            {status.lastSaveTime && (
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500 mt-1">
                <Clock size={10} />
                <span>{new Date(status.lastSaveTime).toLocaleTimeString()}</span>
              </div>
            )}
            {status.error && (
              <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                {status.error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

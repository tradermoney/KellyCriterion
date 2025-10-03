import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { StrategySummary } from '../types/simulation';
import { useLanguage } from '../contexts/LanguageContext';

interface PerformanceChartsPanelProps {
  summaries: StrategySummary[];
}

export const PerformanceChartsPanel: React.FC<PerformanceChartsPanelProps> = ({ summaries }) => {
  const { t } = useLanguage();

  if (!summaries || summaries.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p className="font-medium">{t.noData}</p>
          <p className="text-sm">{t.runSimulationFirst}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 收益指标 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="px-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
              <span className="text-2xl">📈</span>
              {t.charts.cumulativeReturn}
            </h3>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 p-4 shadow-lg">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[]} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-slate-600/30" />
                  <XAxis dataKey="round" stroke="#666" className="dark:stroke-slate-400" />
                  <YAxis stroke="#666" className="dark:stroke-slate-400" />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="px-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
              <span className="text-2xl">💰</span>
              {t.charts.wealthMultiple}
            </h3>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 p-4 shadow-lg">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[]} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-slate-600/30" />
                  <XAxis dataKey="round" stroke="#666" className="dark:stroke-slate-400" />
                  <YAxis stroke="#666" className="dark:stroke-slate-400" />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
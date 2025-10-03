import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import type { StrategySummary } from '../types/simulation';
import { calculateRiskReturnPoints } from '../utils/performanceAnalysis';
import { generateHighContrastColors } from '../utils/chartUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface RiskReturnScatterChartProps {
  summaries: StrategySummary[];
  height?: number;
}

export const RiskReturnScatterChart: React.FC<RiskReturnScatterChartProps> = ({ 
  summaries, 
  height = 400 
}) => {
  const { t } = useLanguage();
  const colors = generateHighContrastColors(summaries.length);
  const scatterData = calculateRiskReturnPoints(summaries, colors);

  if (!scatterData || scatterData.length === 0) {
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
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart
          data={scatterData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#f0f0f0" 
            className="dark:stroke-slate-600/30"
          />
          <XAxis 
            type="number"
            dataKey="risk"
            name={t.chartAxisLabels.risk}
            stroke="#666"
            tick={{ fontSize: 12 }}
            className="dark:stroke-slate-400"
            label={{
              value: t.chartAxisLabels.riskVolatility,
              position: 'bottom',
              offset: 40,
              className: 'fill-slate-600 dark:fill-slate-400 text-sm'
            }}
            tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
          />
          <YAxis 
            type="number"
            dataKey="return"
            name={t.chartAxisLabels.returnLabel}
            stroke="#666"
            tick={{ fontSize: 12 }}
            className="dark:stroke-slate-400"
            label={{
              value: t.chartAxisLabels.returnAnnualized,
              angle: -90,
              position: 'left',
              offset: 0,
              className: 'fill-slate-600 dark:fill-slate-400 text-sm'
            }}
            tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              return [
                `${(value * 100).toFixed(2)}%`,
                name === 'return' ? t.chartAxisLabels.returnLabel : t.chartAxisLabels.risk
              ];
            }}
            labelFormatter={(_label, payload) => {
              if (payload && payload.length > 0) {
                const data = payload[0].payload;
                return `${t.strategy}: ${data.strategy}`;
              }
              return '';
            }}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '12px 16px',
              fontSize: '14px'
            }}
            wrapperStyle={{
              zIndex: 1000
            }}
          />
          <Legend />
          
          <Scatter 
            name={t.strategy}
            dataKey="return"
            fill="#8884d8"
          >
            {scatterData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

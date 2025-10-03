import React from 'react';

interface ParameterSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  unit?: string;
  decimals?: number;
}

export const ParameterSlider: React.FC<ParameterSliderProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit = '',
  decimals = 0
}) => {
  const formatValue = (val: number) => {
    const formatted = decimals > 0 ? val.toFixed(decimals) : val.toString();
    return unit === '%' ? `${(val * 100).toFixed(decimals)}%` : `${formatted}${unit}`;
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-md p-2.5 border border-slate-200 dark:border-slate-600 transition-all hover:border-slate-300 dark:hover:border-slate-500">
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2 py-0.5 rounded-md text-xs font-semibold shadow-sm">
          {formatValue(value)}
        </div>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
            w-full h-1.5 bg-slate-200 dark:bg-slate-600 rounded-md appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-gradient-to-br
            [&::-webkit-slider-thumb]:from-orange-500
            [&::-webkit-slider-thumb]:to-orange-600
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:shadow-orange-500/30
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:hover:opacity-80
            [&::-webkit-slider-thumb]:hover:shadow-orange-500/50
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-gradient-to-br
            [&::-moz-range-thumb]:from-orange-500
            [&::-moz-range-thumb]:to-orange-600
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:shadow-md
          "
        />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1.5">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>
    </div>
  );
};
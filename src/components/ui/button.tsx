import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  title?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'default',
  size = 'default',
  className = '',
  title,
  disabled = false
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-400',
    ghost: 'hover:bg-gray-100 focus-visible:ring-gray-400'
  };

  const sizeClasses = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-2 py-1 text-xs',
    lg: 'px-6 py-3 text-base'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      onClick={onClick}
      className={classes}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
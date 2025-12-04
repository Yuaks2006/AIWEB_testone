import React from 'react';
import { NeoColor } from '../types';
import { NEO_COLORS } from '../constants';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: NeoColor;
  fullWidth?: boolean;
}

export const NeoButton: React.FC<NeoButtonProps> = ({ 
  children, 
  variant = 'cyan', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  return (
    <button
      className={`
        border-4 border-black 
        font-bold text-lg 
        py-2 px-6
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
        active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]
        transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${NEO_COLORS[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
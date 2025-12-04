import React from 'react';
import { NeoColor } from '../types';
import { NEO_COLORS } from '../constants';

interface NeoCardProps {
  children: React.ReactNode;
  color?: NeoColor;
  className?: string;
  onClick?: () => void;
  title?: string;
}

export const NeoCard: React.FC<NeoCardProps> = ({ 
  children, 
  color = 'white', 
  className = '', 
  onClick,
  title
}) => {
  const baseClasses = `
    border-4 border-black 
    shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
    rounded-none
    p-4
    transition-transform
    ${NEO_COLORS[color] || 'bg-white'}
    ${onClick ? 'cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : ''}
    ${className}
  `;

  return (
    <div className={baseClasses} onClick={onClick}>
      {title && (
        <div className="border-b-4 border-black pb-2 mb-4 font-black text-xl uppercase tracking-tighter">
          {title}
        </div>
      )}
      {children}
    </div>
  );
};
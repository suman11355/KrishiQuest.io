
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  icon: React.ReactNode;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 80,
  strokeWidth = 8,
  icon,
  className
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <svg className="absolute inset-0" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-white/10"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary transition-all duration-500 ease-out"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
};

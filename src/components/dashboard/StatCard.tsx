
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon: Icon, trend, className }: StatCardProps) => {
  return (
    <div className={cn(
      "bg-tactflux-gray rounded-xl p-6 shadow-card border border-white/5 transition-all hover:translate-y-[-2px] hover:shadow-glow animate-slide-up",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
          
          {trend && (
            <p className={cn(
              "text-xs flex items-center mt-2",
              trend.isPositive ? "text-green-500" : "text-tactflux-pink"
            )}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}% 
              <span className="text-gray-400 ml-1">vs. previous period</span>
            </p>
          )}
        </div>
        
        <div className="bg-gradient-to-br from-tactflux-turquoise/20 to-tactflux-violet/20 p-3 rounded-lg">
          <Icon className="h-7 w-7 text-tactflux-turquoise" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;


import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore: number;
  description: string;
  color: 'turquoise' | 'violet' | 'pink';
}

const colorVariants = {
  turquoise: "from-tactflux-turquoise to-blue-500",
  violet: "from-tactflux-violet to-purple-800",
  pink: "from-tactflux-pink to-red-500"
};

const ScoreCard = ({ title, score, maxScore, description, color }: ScoreCardProps) => {
  const [percentage, setPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    // Animate percentage on mount
    const timer = setTimeout(() => {
      setPercentage(Math.floor((score / maxScore) * 100));
    }, 300);
    
    return () => clearTimeout(timer);
  }, [score, maxScore]);
  
  return (
    <div 
      className="bg-tactflux-gray rounded-xl p-6 shadow-card border border-white/5 animate-fade-in transition-all duration-300 hover:shadow-glow hover:border-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-lg font-semibold transition-colors duration-300 hover:text-tactflux-turquoise">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      
      <div className="flex items-center justify-center my-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform transition-transform duration-500" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="#2A2A2A" 
              strokeWidth="8"
            />
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke={`url(#gradient-${color})`} 
              strokeWidth="8" 
              strokeDasharray="283" 
              strokeDashoffset={283 - (283 * percentage) / 100}
              transform="rotate(-90 50 50)"
              className="transition-all duration-1000 ease-out"
              style={{
                filter: isHovered ? 'drop-shadow(0 0 3px var(--color))' : 'none',
                // @ts-ignore - custom CSS property
                '--color': color === 'turquoise' ? '#00FFFF' : color === 'violet' ? '#8B5CF6' : '#FF007F'
              }}
            />
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={`stop-${color}-start`} />
                <stop offset="100%" className={`stop-${color}-end`} />
              </linearGradient>
            </defs>
          </svg>
          <div className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center",
            "transition-all duration-300",
            isHovered && "scale-110"
          )}>
            <span className="text-2xl font-bold">{score}</span>
            <span className="text-gray-400 text-xs">/{maxScore}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Performance</span>
          <span className={`font-semibold bg-gradient-to-r ${colorVariants[color]} bg-clip-text text-transparent transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}>
            {percentage}%
          </span>
        </div>
        <Progress 
          value={percentage} 
          className={cn(
            "h-2 bg-tactflux-black transition-all duration-500",
            isHovered && "h-3"
          )}
        />
      </div>
    </div>
  );
};

export default ScoreCard;

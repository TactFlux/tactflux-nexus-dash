
import React from 'react';
import { Progress } from '@/components/ui/progress';

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
  const percentage = Math.floor((score / maxScore) * 100);
  
  return (
    <div className="bg-tactflux-gray rounded-xl p-6 shadow-card border border-white/5 h-full animate-fade-in">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      
      <div className="flex items-center justify-center my-8">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
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
            />
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={`stop-${color}-start`} />
                <stop offset="100%" className={`stop-${color}-end`} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-3xl font-bold">{score}</span>
            <span className="text-gray-400 text-sm">/{maxScore}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Performance</span>
          <span className={`font-semibold bg-gradient-to-r ${colorVariants[color]} bg-clip-text text-transparent`}>
            {percentage}%
          </span>
        </div>
        <Progress 
          value={percentage} 
          className="h-2 bg-tactflux-black"
          indicatorClassName={`bg-gradient-to-r ${colorVariants[color]}`}
        />
      </div>
    </div>
  );
};

export default ScoreCard;

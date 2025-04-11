
import React from 'react';
import { cn } from '@/lib/utils';

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ElementType;
  gradient: 'turquoise-pink' | 'violet-pink' | 'turquoise-violet';
  onClick?: () => void;
}

const gradientClasses = {
  'turquoise-pink': 'from-tactflux-turquoise to-tactflux-pink',
  'violet-pink': 'from-tactflux-violet to-tactflux-pink',
  'turquoise-violet': 'from-tactflux-turquoise to-tactflux-violet'
};

const CTACard = ({ title, description, buttonText, icon: Icon, gradient, onClick }: CTAProps) => {
  return (
    <div className={cn(
      "rounded-xl p-6 shadow-card border border-white/10 relative overflow-hidden animate-fade-in h-full",
      "bg-gradient-to-br",
      gradientClasses[gradient]
    )}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0),rgba(0,0,0,0.4))]" />
      
      <div className="relative z-10">
        <div className="bg-black/20 rounded-full p-4 w-fit">
          <Icon className="h-6 w-6 text-white" />
        </div>
        
        <h3 className="text-xl font-bold mt-4 text-white">{title}</h3>
        <p className="text-white/80 mt-2 mb-6">{description}</p>
        
        <button 
          onClick={onClick}
          className={cn(
            "px-6 py-2.5 rounded-lg font-medium text-sm",
            "bg-white text-black",
            "hover:bg-opacity-90 transition-all",
            "shadow-[0_0_15px_rgba(255,255,255,0.3)]",
            "animate-pulse-glow"
          )}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CTACard;

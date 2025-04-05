
import React from 'react';
import { cn } from '@/lib/utils';

interface TechnologyCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const TechnologyCard = ({ name, description, icon, color }: TechnologyCardProps) => {
  return (
    <div className={cn(
      "bg-card rounded-xl p-6 border border-border shadow-card",
      "hover:translate-y-[-2px] transition-all duration-300",
      "animate-slide-up"
    )}>
      <div className={cn(
        "flex items-center justify-center w-12 h-12 rounded-lg mb-4",
        color.startsWith('bg-') ? color : `bg-${color}/20`
      )}>
        {icon}
      </div>
      <h3 className={cn(
        "text-lg font-semibold mb-2",
        color.startsWith('text-') ? color : `text-${color}`
      )}>
        {name}
      </h3>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default TechnologyCard;

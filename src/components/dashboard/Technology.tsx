
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TechnologyCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({
  name,
  description,
  icon,
  color
}) => {
  return (
    <Card className="border border-white/5 bg-card transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className={cn(
        "flex flex-row items-center space-y-0 pb-2",
        `text-${color}`
      )}>
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-semibold">{name}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default TechnologyCard;

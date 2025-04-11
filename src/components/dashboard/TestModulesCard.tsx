
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TestModule {
  id: string;
  name: string;
  completionRate: number;
  technology: string;
  color: string;
  description: string;
}

const modules: TestModule[] = [
  {
    id: '1',
    name: 'Problemlösungs-Assessment',
    completionRate: 78,
    technology: 'Next.js',
    color: 'bg-tactflux-turquoise',
    description: 'Modul basiert auf Next.js für UI-Interaktivität'
  },
  {
    id: '2',
    name: 'Kreativität & Innovation',
    completionRate: 65,
    technology: 'FastAPI',
    color: 'bg-tactflux-violet',
    description: 'Modul basiert auf FastAPI für schnelle Algorithmen'
  },
  {
    id: '3',
    name: 'Team-Kollaboration',
    completionRate: 92,
    technology: 'Docker',
    color: 'bg-tactflux-pink',
    description: 'Modul basiert auf Docker für Skalierbarkeit'
  },
  {
    id: '4',
    name: 'Technisches Wissen',
    completionRate: 45,
    technology: 'PostgreSQL',
    color: 'bg-blue-500',
    description: 'Modul basiert auf PostgreSQL für Datenanalyse'
  },
  {
    id: '5',
    name: 'Kommunikationsfähigkeiten',
    completionRate: 83,
    technology: 'Supabase',
    color: 'bg-green-500',
    description: 'Modul basiert auf Supabase für Echtzeitkommunikation'
  }
];

const TestModulesCard = () => {
  return (
    <div className="bg-tactflux-gray rounded-xl shadow-card border border-white/5 animate-slide-up">
      <div className="p-6 border-b border-white/5">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Test Module</h3>
          <button className="text-sm text-tactflux-turquoise hover:underline">Verwalten</button>
        </div>
      </div>
      
      <div className="p-6 space-y-5">
        <TooltipProvider>
          {modules.map((module) => (
            <div key={module.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="font-medium">{module.name}</p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center cursor-help">
                        <span className={cn(
                          "w-2 h-2 rounded-full mr-2",
                          module.color
                        )} />
                        <span className="text-xs text-gray-400">{module.technology}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{module.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-sm font-semibold">{module.completionRate}%</span>
              </div>
              
              <div className="w-full bg-tactflux-black rounded-full h-2 overflow-hidden">
                <div 
                  className={cn("h-full rounded-full", module.color)}
                  style={{ width: `${module.completionRate}%`, transition: 'width 1s ease-in-out' }}
                />
              </div>
            </div>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default TestModulesCard;

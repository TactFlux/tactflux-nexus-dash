
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TestModule {
  id: string;
  name: string;
  completionRate: number;
  technology: string;
  color: string;
}

const modules: TestModule[] = [
  {
    id: '1',
    name: 'Problem Solving Assessment',
    completionRate: 78,
    technology: 'Next.js',
    color: 'bg-tactflux-turquoise'
  },
  {
    id: '2',
    name: 'Creativity & Innovation',
    completionRate: 65,
    technology: 'FastAPI',
    color: 'bg-tactflux-violet'
  },
  {
    id: '3',
    name: 'Team Collaboration',
    completionRate: 92,
    technology: 'Docker',
    color: 'bg-tactflux-pink'
  },
  {
    id: '4',
    name: 'Technical Knowledge',
    completionRate: 45,
    technology: 'PostgreSQL',
    color: 'bg-blue-500'
  },
  {
    id: '5',
    name: 'Communication Skills',
    completionRate: 83,
    technology: 'Supabase',
    color: 'bg-green-500'
  }
];

const TestModulesCard = () => {
  return (
    <div className="bg-tactflux-gray rounded-xl shadow-card border border-white/5 animate-slide-up">
      <div className="p-6 border-b border-white/5">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Test Modules</h3>
          <button className="text-sm text-tactflux-turquoise hover:underline">Manage</button>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {modules.map((module) => (
          <div key={module.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="font-medium">{module.name}</p>
                <div className="flex items-center">
                  <span className={cn(
                    "w-2 h-2 rounded-full mr-2",
                    module.color
                  )} />
                  <span className="text-xs text-gray-400">{module.technology}</span>
                </div>
              </div>
              <span className="text-sm font-semibold">{module.completionRate}%</span>
            </div>
            
            <Progress 
              value={module.completionRate} 
              className="h-2 bg-tactflux-black"
              indicatorClassName={cn(module.color)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestModulesCard;

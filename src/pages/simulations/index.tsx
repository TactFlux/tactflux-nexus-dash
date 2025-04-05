
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileText, Users, Clock, Award } from 'lucide-react';

const mockSimulations = [
  {
    id: '1',
    name: 'Creative Problem Solving',
    description: 'Tests creative approaches to solving complex problems',
    completionRate: 78,
    avgTime: '24m 12s',
    difficulty: 'Medium',
    candidates: 342
  },
  {
    id: '2',
    name: 'Logical Reasoning',
    description: 'Evaluates logical thinking and pattern recognition',
    completionRate: 65,
    avgTime: '18m 45s',
    difficulty: 'Hard',
    candidates: 278
  },
  {
    id: '3',
    name: 'Design Thinking',
    description: 'Assesses design methodology and user-centered approach',
    completionRate: 82,
    avgTime: '35m 20s',
    difficulty: 'Medium',
    candidates: 156
  },
  {
    id: '4',
    name: 'Adaptive Communication',
    description: 'Measures ability to communicate effectively in changing scenarios',
    completionRate: 91,
    avgTime: '15m 08s',
    difficulty: 'Easy',
    candidates: 412
  },
  {
    id: '5',
    name: 'Strategic Planning',
    description: 'Tests ability to develop strategic plans under constraints',
    completionRate: 62,
    avgTime: '28m 33s',
    difficulty: 'Hard',
    candidates: 187
  }
];

const difficultyColors = {
  'Easy': 'text-green-400',
  'Medium': 'text-yellow-400',
  'Hard': 'text-red-400'
};

const SimulationsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Simulations & Challenges</h1>
            <p className="text-gray-400 mt-1">Manage and monitor all simulation modules</p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet rounded-md hover:opacity-90 transition-all">
            Create New
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSimulations.map((simulation) => (
            <Card key={simulation.id} className="bg-tactflux-gray border-white/5 shadow-card">
              <CardHeader className="pb-2">
                <h3 className="text-lg font-semibold">{simulation.name}</h3>
                <p className="text-sm text-gray-400">{simulation.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Rate</span>
                    <span>{simulation.completionRate}%</span>
                  </div>
                  <Progress 
                    value={simulation.completionRate} 
                    className="h-2 bg-white/10" 
                    indicatorClassName={`${
                      simulation.completionRate > 80 ? 'bg-green-500' : 
                      simulation.completionRate > 60 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-tactflux-turquoise" />
                    <span className="text-sm">{simulation.avgTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-tactflux-violet" />
                    <span className={`text-sm ${difficultyColors[simulation.difficulty as keyof typeof difficultyColors]}`}>
                      {simulation.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <Users className="h-4 w-4 text-tactflux-pink" />
                    <span className="text-sm">{simulation.candidates} candidates</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SimulationsPage;

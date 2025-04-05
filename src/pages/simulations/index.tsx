
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileText, Users, Clock, Award } from 'lucide-react';

const mockSimulations = [
  {
    id: '1',
    name: 'Kreatives Problemlösen',
    description: 'Testet kreative Ansätze zur Lösung komplexer Probleme',
    completionRate: 78,
    avgTime: '24m 12s',
    difficulty: 'Mittel',
    candidates: 342
  },
  {
    id: '2',
    name: 'Logisches Denken',
    description: 'Bewertet logisches Denken und Mustererkennung',
    completionRate: 65,
    avgTime: '18m 45s',
    difficulty: 'Schwer',
    candidates: 278
  },
  {
    id: '3',
    name: 'Design Thinking',
    description: 'Bewertet Design-Methodik und nutzerzentrierten Ansatz',
    completionRate: 82,
    avgTime: '35m 20s',
    difficulty: 'Mittel',
    candidates: 156
  },
  {
    id: '4',
    name: 'Adaptive Kommunikation',
    description: 'Misst die Fähigkeit, in wechselnden Szenarien effektiv zu kommunizieren',
    completionRate: 91,
    avgTime: '15m 08s',
    difficulty: 'Einfach',
    candidates: 412
  },
  {
    id: '5',
    name: 'Strategische Planung',
    description: 'Testet die Fähigkeit, strategische Pläne unter Einschränkungen zu entwickeln',
    completionRate: 62,
    avgTime: '28m 33s',
    difficulty: 'Schwer',
    candidates: 187
  }
];

const difficultyColors = {
  'Einfach': 'text-green-400',
  'Mittel': 'text-yellow-400',
  'Schwer': 'text-red-400'
};

const SimulationsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Simulationen & Herausforderungen</h1>
            <p className="text-gray-400 mt-1">Alle Simulationsmodule verwalten und überwachen</p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet rounded-md hover:opacity-90 transition-all">
            Neu erstellen
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
                    <span>Abschlussrate</span>
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
                    <span className="text-sm">{simulation.candidates} Kandidaten</span>
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

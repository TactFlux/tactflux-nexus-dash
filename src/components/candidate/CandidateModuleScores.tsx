
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface ModuleScore {
  name: string;
  score: number;
}

interface CandidateModuleScoresProps {
  moduleScores: ModuleScore[];
}

const CandidateModuleScores: React.FC<CandidateModuleScoresProps> = ({ moduleScores }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTextScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Modulergebnisse</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="lg:grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {moduleScores.map((module, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">{module.name}</p>
                  <p className={`font-mono font-bold ${getTextScoreColor(module.score)}`}>
                    {module.score}%
                  </p>
                </div>
                <Progress value={module.score} className={getScoreColor(module.score)} />
              </div>
            ))}
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Modul</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moduleScores.map((module, index) => (
                <TableRow key={index}>
                  <TableCell>{module.name}</TableCell>
                  <TableCell className={`text-right font-mono font-bold ${getTextScoreColor(module.score)}`}>
                    {module.score}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateModuleScores;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { X, FileText, ArrowLeft, Download } from 'lucide-react';
import { CandidateData } from '@/types/chart';
import { exportToCSV } from '@/utils/exportUtils';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for shortlisted candidates
const mockShortlistedCandidates: CandidateData[] = [
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    position: 'Frontend Developer',
    status: 'in-progress',
    score: 62,
    favorite: true,
    moduleScores: [
      { name: 'Kreativität', score: 75 },
      { name: 'Strategie', score: 60 },
      { name: 'Kommunikation', score: 55 },
      { name: 'Problemlösung', score: 68 },
      { name: 'Technisches Wissen', score: 80 }
    ]
  },
  {
    id: '6',
    name: 'Jana Müller',
    email: 'jana.m@example.com',
    position: 'Product Designer',
    status: 'interview',
    score: 83,
    favorite: true,
    moduleScores: [
      { name: 'Kreativität', score: 92 },
      { name: 'Strategie', score: 84 },
      { name: 'Kommunikation', score: 78 },
      { name: 'Problemlösung', score: 75 },
      { name: 'Technisches Wissen', score: 65 }
    ]
  }
];

// Extract all unique module names from the candidates
const getUniqueModules = (candidates: CandidateData[]): string[] => {
  const modules = new Set<string>();
  
  candidates.forEach(candidate => {
    candidate.moduleScores?.forEach(module => {
      modules.add(module.name);
    });
  });
  
  return Array.from(modules);
};

// Find the best score for a specific module across all candidates
const findBestScoreForModule = (candidates: CandidateData[], moduleName: string): number => {
  let bestScore = 0;
  
  candidates.forEach(candidate => {
    const moduleScore = candidate.moduleScores?.find(m => m.name === moduleName);
    if (moduleScore && moduleScore.score > bestScore) {
      bestScore = moduleScore.score;
    }
  });
  
  return bestScore;
};

// Get the score color based on value
const getScoreColor = (score: number, bestScore: number): string => {
  if (score === bestScore && score > 0) return 'bg-green-500/10 text-green-500';
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
};

const CandidateShortlistPage: React.FC = () => {
  const [shortlistedCandidates, setShortlistedCandidates] = useState<CandidateData[]>(mockShortlistedCandidates);
  const uniqueModules = getUniqueModules(shortlistedCandidates);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Remove candidate from shortlist
  const removeFromShortlist = (id: string) => {
    setShortlistedCandidates(prev => prev.filter(candidate => candidate.id !== id));
    toast({
      title: "Kandidat entfernt",
      description: "Der Kandidat wurde von der Shortlist entfernt.",
    });
  };
  
  // Export comparison as CSV
  const exportComparison = () => {
    // Transform data for export
    const exportData = shortlistedCandidates.map(candidate => {
      const data: Record<string, any> = {
        name: candidate.name,
        position: candidate.position,
        score: candidate.score
      };
      
      // Add module scores
      candidate.moduleScores?.forEach(module => {
        data[module.name] = module.score;
      });
      
      return data;
    });
    
    exportToCSV(exportData, 'kandidaten-vergleich');
    toast({
      title: "Export erfolgreich",
      description: "Der Vergleich wurde als CSV exportiert.",
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Kandidaten-Shortlist</h1>
            <p className="text-gray-400 mt-1">Vergleichen Sie favorisierte Kandidaten</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/candidates')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück
            </Button>
            
            {shortlistedCandidates.length > 0 && (
              <Button onClick={exportComparison}>
                <Download className="h-4 w-4 mr-2" />
                Vergleich exportieren
              </Button>
            )}
          </div>
        </div>
        
        {shortlistedCandidates.length === 0 ? (
          <Card className="mt-6">
            <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-12 gap-4">
              <p className="text-muted-foreground">Noch keine Kandidaten auf der Shortlist</p>
              <Button onClick={() => navigate('/candidates')}>
                Zu allen Kandidaten
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Vergleichsmatrix ({shortlistedCandidates.length} Kandidaten)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="w-full" orientation="horizontal">
                <div className={`min-w-[800px] ${isMobile ? 'pb-4' : ''}`}>
                  <div className="sticky top-0 z-10 bg-card border-b border-border">
                    <div className="grid grid-cols-[250px_repeat(auto-fill,minmax(100px,1fr))]">
                      <div className="p-4 font-medium">Kandidat</div>
                      {uniqueModules.map((module, index) => (
                        <div key={index} className="p-4 text-center font-medium">
                          {module}
                        </div>
                      ))}
                      <div className="p-4 text-center font-medium">Gesamt</div>
                      <div className="p-4 text-center font-medium">Aktion</div>
                    </div>
                  </div>
                  
                  <div>
                    {shortlistedCandidates.map((candidate) => {
                      return (
                        <div 
                          key={candidate.id} 
                          className="grid grid-cols-[250px_repeat(auto-fill,minmax(100px,1fr))] border-b border-border hover:bg-muted/50"
                        >
                          <div className="p-4">
                            <div>
                              <p className="font-medium">{candidate.name}</p>
                              <p className="text-xs text-muted-foreground">{candidate.position}</p>
                            </div>
                          </div>
                          
                          {uniqueModules.map((moduleName, index) => {
                            const moduleScore = candidate.moduleScores?.find(m => m.name === moduleName);
                            const score = moduleScore?.score || 0;
                            const bestScore = findBestScoreForModule(shortlistedCandidates, moduleName);
                            
                            return (
                              <div key={index} className="p-4 flex justify-center items-center">
                                <Badge variant="outline" className={`font-mono ${getScoreColor(score, bestScore)}`}>
                                  {score > 0 ? score : '-'}
                                </Badge>
                              </div>
                            );
                          })}
                          
                          <div className="p-4 flex justify-center items-center">
                            <Badge 
                              variant="outline" 
                              className={`font-mono ${
                                candidate.score > 80 ? 'text-green-500' : 
                                candidate.score > 60 ? 'text-yellow-500' : 
                                'text-red-500'
                              }`}
                            >
                              {candidate.score}
                            </Badge>
                          </div>
                          
                          <div className="p-4 flex justify-center items-center">
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0" 
                                onClick={() => removeFromShortlist(candidate.id)}
                                aria-label="Von Shortlist entfernen"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                asChild
                              >
                                <Link to={`/candidates/${candidate.id}/report`}>
                                  <FileText className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default CandidateShortlistPage;

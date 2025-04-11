import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  ArrowLeft, Users, Clock, Award, 
  Brain, LineChart, BarChart3, 
  Bot, ChevronRight, FileText
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface Simulation {
  id: string;
  name: string;
  description: string;
  completion_rate: number;
  avg_time_seconds: number;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  candidates_count: number;
  avg_score: number;
  gpt_detection_count: number;
  avg_gpt_probability: number;
  suspicious_answers_rate: number;
  target_role?: string;
  role?: string;
}

const difficultyColors = {
  'Einfach': 'text-green-400',
  'Mittel': 'text-yellow-400',
  'Schwer': 'text-red-400'
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m ${remainingSeconds.toString().padStart(2, '0')}s`;
};

const SimulationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSimulation = async () => {
      try {
        setLoading(true);
        
        // For now, we'll use dummy data
        // In a real app, this would fetch from your Supabase DB
        const dummyData: Simulation[] = [
          {
            id: '1',
            name: 'Kreatives Denken',
            description: 'Test für kreative Problemlösung',
            completion_rate: 78,
            avg_time_seconds: 1320, // 22 minutes
            difficulty: 'Mittel',
            candidates_count: 145,
            avg_score: 72,
            gpt_detection_count: 12,
            avg_gpt_probability: 28,
            suspicious_answers_rate: 15,
            target_role: 'Designer'
          },
          {
            id: '2',
            name: 'Logisches Denken',
            description: 'Test für analytische Fähigkeiten',
            completion_rate: 92,
            avg_time_seconds: 1500, // 25 minutes
            difficulty: 'Schwer',
            candidates_count: 203,
            avg_score: 68,
            gpt_detection_count: 45,
            avg_gpt_probability: 76,
            suspicious_answers_rate: 62,
            target_role: 'Entwickler'
          },
          {
            id: '3',
            name: 'Kommunikation',
            description: 'Test für kommunikative Fähigkeiten',
            completion_rate: 95,
            avg_time_seconds: 900, // 15 minutes
            difficulty: 'Einfach',
            candidates_count: 312,
            avg_score: 88,
            gpt_detection_count: 5,
            avg_gpt_probability: 12,
            suspicious_answers_rate: 8,
            target_role: 'Manager'
          }
        ];
        
        const sim = dummyData.find(s => s.id === id);
        
        if (sim) {
          setSimulation(sim);
        } else {
          setError('Simulation nicht gefunden');
          toast({
            title: "Nicht gefunden",
            description: "Die angeforderte Simulation existiert nicht.",
            variant: "destructive"
          });
        }
      } catch (err) {
        console.error('Error loading simulation:', err);
        setError('Fehler beim Laden der Simulation');
        toast({
          title: "Fehler",
          description: "Die Simulationsdaten konnten nicht geladen werden.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadSimulation();
  }, [id, toast]);

  if (loading) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
          
          <Skeleton className="h-[300px] w-full rounded-xl" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <Skeleton className="h-[200px] w-full rounded-xl" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !simulation) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Simulation nicht gefunden</h2>
          <p className="text-muted-foreground mb-6">{error || "Die angeforderte Simulation konnte nicht geladen werden."}</p>
          <Button 
            onClick={() => navigate('/simulations')}
            className="bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Übersicht
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/simulations')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Alle Simulationen
          </Button>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{simulation.name}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-tactflux-gray border-white/5 shadow-card lg:col-span-2">
            <CardHeader className="border-b border-white/5">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{simulation.name}</h1>
                  <p className="text-gray-400">{simulation.description}</p>
                </div>
                <Badge className={`${difficultyColors[simulation.difficulty as keyof typeof difficultyColors]} bg-transparent`}>
                  {simulation.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center p-4 bg-tactflux-gray/30 rounded-lg">
                  <Users className="h-6 w-6 mx-auto text-tactflux-turquoise mb-2" />
                  <div className="text-2xl font-bold">{simulation.candidates_count}</div>
                  <div className="text-xs text-gray-400">Teilnehmer</div>
                </div>
                
                <div className="text-center p-4 bg-tactflux-gray/30 rounded-lg">
                  <Award className="h-6 w-6 mx-auto text-tactflux-violet mb-2" />
                  <div className="text-2xl font-bold">{simulation.avg_score}%</div>
                  <div className="text-xs text-gray-400">Ø Score</div>
                </div>
                
                <div className="text-center p-4 bg-tactflux-gray/30 rounded-lg">
                  <Clock className="h-6 w-6 mx-auto text-tactflux-turquoise mb-2" />
                  <div className="text-2xl font-bold">{formatTime(simulation.avg_time_seconds)}</div>
                  <div className="text-xs text-gray-400">Ø Zeit</div>
                </div>
                
                <div className="text-center p-4 bg-tactflux-gray/30 rounded-lg">
                  <Bot className="h-6 w-6 mx-auto text-tactflux-pink mb-2" />
                  <div className="text-2xl font-bold">{simulation.avg_gpt_probability}%</div>
                  <div className="text-xs text-gray-400">KI-Verdacht</div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Abschlussrate</span>
                    <span className="text-sm font-medium">{simulation.completion_rate}%</span>
                  </div>
                  <Progress 
                    value={simulation.completion_rate} 
                    className="h-2" 
                    indicatorClassName="bg-tactflux-turquoise"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">KI-Erkennungsrate</span>
                    <span className="text-sm font-medium">{simulation.avg_gpt_probability}%</span>
                  </div>
                  <Progress 
                    value={simulation.avg_gpt_probability} 
                    className="h-2" 
                    indicatorClassName={`${
                      simulation.avg_gpt_probability > 80 ? 'bg-red-500' : 
                      simulation.avg_gpt_probability > 50 ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-tactflux-gray border-white/5 shadow-card">
            <CardHeader className="border-b border-white/5">
              <h2 className="text-xl font-semibold">Aktionen</h2>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Button className="w-full bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet">
                Kandidaten einladen
              </Button>
              
              <Button variant="outline" className="w-full">
                Simulation bearbeiten
              </Button>
              
              <Button variant="outline" className="w-full">
                Ergebnisse exportieren
              </Button>
              
              <Button variant="outline" className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10">
                Simulation löschen
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="results" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="results">Ergebnisse</TabsTrigger>
            <TabsTrigger value="questions">Fragen</TabsTrigger>
            <TabsTrigger value="settings">Einstellungen</TabsTrigger>
          </TabsList>
          
          <TabsContent value="results" className="space-y-6">
            <Card className="bg-tactflux-gray border-white/5 shadow-card">
              <CardHeader className="border-b border-white/5">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-tactflux-turquoise" />
                  Ergebnisübersicht
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground py-8">
                  Hier würden die detaillierten Ergebnisse und Statistiken angezeigt werden.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="questions" className="space-y-6">
            <Card className="bg-tactflux-gray border-white/5 shadow-card">
              <CardHeader className="border-b border-white/5">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-tactflux-violet" />
                  Fragenkatalog
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground py-8">
                  Hier würden die Fragen und Aufgaben der Simulation angezeigt werden.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-tactflux-gray border-white/5 shadow-card">
              <CardHeader className="border-b border-white/5">
                <h2 className="text-xl font-semibold">Simulationseinstellungen</h2>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground py-8">
                  Hier würden die Einstellungen und Konfigurationsoptionen angezeigt werden.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SimulationDetailPage;

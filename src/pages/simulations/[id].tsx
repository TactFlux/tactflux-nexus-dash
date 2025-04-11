
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Brain, Robot, Award, Clock, Users, BarChart, LineChart as LineChartIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

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
  created_at: string;
  target_role: string;
}

// Mock time series data (to be replaced with actual data from Supabase)
const mockTimeSeriesData = [
  { date: '2025-01-01', score: 72, candidates: 12, gptDetection: 15 },
  { date: '2025-02-01', score: 75, candidates: 18, gptDetection: 20 },
  { date: '2025-03-01', score: 68, candidates: 22, gptDetection: 25 },
  { date: '2025-04-01', score: 82, candidates: 30, gptDetection: 18 },
  { date: '2025-05-01', score: 85, candidates: 35, gptDetection: 15 },
  { date: '2025-06-01', score: 88, candidates: 42, gptDetection: 12 },
  { date: '2025-07-01', score: 91, candidates: 45, gptDetection: 10 },
];

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
    const checkUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }
      
      // Get user role from metadata
      const role = session.user?.user_metadata?.role || null;
      
      // Redirect if not a dev
      if (role !== 'dev') {
        navigate('/not-authorized');
        toast({
          title: "Zugriff verweigert",
          description: "Sie benötigen Entwicklerrechte, um auf diese Seite zuzugreifen.",
          variant: "destructive"
        });
      }
    };
    
    checkUserRole();
  }, [navigate, toast]);

  useEffect(() => {
    const fetchSimulation = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('simulations')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        setSimulation(data);
      } catch (err) {
        console.error('Error fetching simulation:', err);
        setError('Fehler beim Laden der Simulationsdetails');
        toast({
          title: "Fehler",
          description: "Die Simulationsdetails konnten nicht geladen werden.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSimulation();
  }, [id, toast]);

  // Format date strings for chart
  const formattedChartData = mockTimeSeriesData.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('de-DE', { month: 'short', year: '2-digit' })
  }));

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tactflux-turquoise"></div>
        </div>
      </Layout>
    );
  }

  if (error || !simulation) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h2 className="text-xl font-bold text-red-400 mb-4">
            {error || 'Simulation nicht gefunden'}
          </h2>
          <Button onClick={() => navigate('/simulations')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Übersicht
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => navigate('/simulations')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{simulation.name}</h1>
              <p className="text-gray-400 mt-1">{simulation.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-tactflux-violet/20 text-tactflux-violet border-tactflux-violet/30">
              {simulation.difficulty}
            </Badge>
            <Badge variant="outline" className="bg-tactflux-turquoise/20 text-tactflux-turquoise border-tactflux-turquoise/30">
              {simulation.target_role || 'Alle Rollen'}
            </Badge>
          </div>
        </div>
        
        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-tactflux-gray border-white/5 shadow-card">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Durchschnittlicher Score</p>
                  <h3 className="text-3xl font-bold mt-1">
                    <span className={`${
                      simulation.avg_score > 80 ? 'text-green-400' : 
                      simulation.avg_score > 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {simulation.avg_score}%
                    </span>
                  </h3>
                </div>
                <div className="bg-gradient-to-br from-tactflux-turquoise/20 to-tactflux-violet/20 p-2 rounded-lg">
                  <Award className="h-5 w-5 text-tactflux-turquoise" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-tactflux-gray border-white/5 shadow-card">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Kandidaten</p>
                  <h3 className="text-3xl font-bold mt-1">{simulation.candidates_count}</h3>
                </div>
                <div className="bg-gradient-to-br from-tactflux-turquoise/20 to-tactflux-violet/20 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-tactflux-violet" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-tactflux-gray border-white/5 shadow-card">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Ø Bearbeitungszeit</p>
                  <h3 className="text-2xl font-bold mt-1">{formatTime(simulation.avg_time_seconds)}</h3>
                </div>
                <div className="bg-gradient-to-br from-tactflux-turquoise/20 to-tactflux-violet/20 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-tactflux-turquoise" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-tactflux-gray border-white/5 shadow-card">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">KI-Verdacht</p>
                  <h3 className="text-3xl font-bold mt-1">
                    <span className={`${
                      simulation.avg_gpt_probability > 80 ? 'text-red-400' : 
                      simulation.avg_gpt_probability > 50 ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {simulation.avg_gpt_probability}%
                    </span>
                  </h3>
                </div>
                <div className="bg-gradient-to-br from-tactflux-turquoise/20 to-tactflux-violet/20 p-2 rounded-lg">
                  <Robot className="h-5 w-5 text-tactflux-pink" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Score Trend Chart */}
        <Card className="bg-tactflux-gray border-white/5 shadow-card">
          <CardHeader className="border-b border-white/5">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <LineChartIcon className="h-5 w-5 text-tactflux-violet" />
              Score & Teilnehmer-Entwicklung
            </h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80">
              <ChartContainer
                config={{
                  score: { color: "#00FFFF", label: "Score" },
                  candidates: { color: "#BE5CFF", label: "Kandidaten" },
                  gptDetection: { color: "#FF007F", label: "KI-Verdacht" }
                }}
              >
                <LineChart data={formattedChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    stroke="#6b7280" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="#6b7280" 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                  />
                  <ChartTooltip 
                    content={
                      <ChartTooltipContent 
                        labelFormatter={(label) => `Datum: ${label}`}
                      />
                    } 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    name="Score %" 
                    stroke="var(--color-score)" 
                    yAxisId="left"
                    strokeWidth={2}
                    dot={{ fill: 'var(--color-score)', strokeWidth: 0, r: 4 }} 
                    activeDot={{ r: 6, stroke: 'var(--color-score)', strokeWidth: 2 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="candidates" 
                    name="Kandidaten" 
                    stroke="var(--color-candidates)" 
                    yAxisId="right"
                    strokeWidth={2}
                    dot={{ fill: 'var(--color-candidates)', strokeWidth: 0, r: 4 }} 
                    activeDot={{ r: 6, stroke: 'var(--color-candidates)', strokeWidth: 2 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="gptDetection" 
                    name="KI-Verdacht %" 
                    stroke="var(--color-gptDetection)" 
                    yAxisId="left"
                    strokeWidth={2}
                    dot={{ fill: 'var(--color-gptDetection)', strokeWidth: 0, r: 4 }} 
                    activeDot={{ r: 6, stroke: 'var(--color-gptDetection)', strokeWidth: 2 }} 
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Analysis */}
        <Card className="bg-tactflux-gray border-white/5 shadow-card">
          <CardHeader className="border-b border-white/5">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Robot className="h-5 w-5 text-tactflux-pink" />
              KI-Analyse
            </h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">KI-Erkennungsrate</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Erkennungsrate</span>
                      <span className={`${
                        simulation.avg_gpt_probability > 80 ? 'text-red-400' : 
                        simulation.avg_gpt_probability > 50 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {simulation.avg_gpt_probability}%
                      </span>
                    </div>
                    <Progress 
                      value={simulation.avg_gpt_probability} 
                      className="h-3 bg-white/10" 
                      indicatorClassName={`${
                        simulation.avg_gpt_probability > 80 ? 'bg-red-500' : 
                        simulation.avg_gpt_probability > 50 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Auffällige Antworten</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Auffälligkeitsrate</span>
                      <span className={`${
                        simulation.suspicious_answers_rate > 50 ? 'text-red-400' : 
                        simulation.suspicious_answers_rate > 25 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {simulation.suspicious_answers_rate}%
                      </span>
                    </div>
                    <Progress 
                      value={simulation.suspicious_answers_rate} 
                      className="h-3 bg-white/10" 
                      indicatorClassName={`${
                        simulation.suspicious_answers_rate > 50 ? 'bg-red-500' : 
                        simulation.suspicious_answers_rate > 25 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-tactflux-black/30 rounded-lg p-5 border border-white/5">
                <h3 className="text-lg font-medium mb-3">KI-Analysebericht</h3>
                <p className="text-gray-400 mb-4">
                  Automatische Analyse der KI-Nutzungsmuster in diesem Modul:
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <span className="text-tactflux-turquoise">•</span>
                    <span>Dieses Modul zeigt {simulation.avg_gpt_probability > 50 ? 'erhöhte' : 'geringe'} KI-Aktivität</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-tactflux-turquoise">•</span>
                    <span>Insgesamt {simulation.gpt_detection_count} KI-Erkennungen in den Antworten</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-tactflux-turquoise">•</span>
                    <span>{simulation.suspicious_answers_rate}% der Antworten zeigen auffällige Muster</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-tactflux-turquoise">•</span>
                    <span>Durchschnittlicher KI-Wahrscheinlichkeitswert: {simulation.avg_gpt_probability}%</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <h4 className="font-medium mb-2">Empfehlungen:</h4>
                  <p className="text-sm text-gray-400">
                    {simulation.avg_gpt_probability > 80 
                      ? 'Dringender Handlungsbedarf: KI-Erkennungsmaßnahmen verstärken und Moduldesign prüfen.' 
                      : simulation.avg_gpt_probability > 50 
                        ? 'Beobachten: Erhöhte KI-Aktivität festgestellt. Moduldesign auf KI-Resistenz prüfen.' 
                        : 'Kein Handlungsbedarf: Die KI-Aktivität bei diesem Modul liegt im normalen Bereich.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SimulationDetailPage;

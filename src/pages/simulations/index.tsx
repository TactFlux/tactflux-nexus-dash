
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, Users, Clock, Award, 
  Brain, BarChart3 as BarChartIcon, LineChart as LineChartIcon, 
  Filter, Bot, AlertTriangle
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, Line, LineChart } from 'recharts';
import { useAuth } from '@/hooks/useAuth';

// Type definitions
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
  role?: string; // Add optional role field
}

interface ChartData {
  name: string;
  avgScore: number;
  completionRate: number;
  candidates: number;
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

const SimulationsPage = () => {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState('30'); // days
  const [moduleFilter, setModuleFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }
      
      // Get user role from metadata
      const role = session.user?.user_metadata?.role || null;
      setUserRole(role);
      
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
    const fetchSimulations = async () => {
      try {
        setLoading(true);
        
        // Convert timeFilter to date
        let dateFilter = new Date();
        if (timeFilter !== 'all') {
          dateFilter.setDate(dateFilter.getDate() - parseInt(timeFilter));
        }
        
        // For now, we'll use dummy data as the table doesn't exist yet
        // In a real app, this would query the actual database
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
            role: 'Designer'
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
            role: 'Entwickler'
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
            role: 'Manager'
          }
        ];
        
        // Apply filters to dummy data
        let filteredData = [...dummyData];
        
        // Apply module filter if not 'all'
        if (moduleFilter !== 'all') {
          filteredData = filteredData.filter(sim => sim.id === moduleFilter);
        }
        
        // Apply role filter if not 'all'
        if (roleFilter !== 'all') {
          filteredData = filteredData.filter(sim => sim.role === roleFilter);
        }
        
        setSimulations(filteredData);
      } catch (err) {
        console.error('Error fetching simulations:', err);
        setError('Fehler beim Laden der Simulationen');
        toast({
          title: "Fehler",
          description: "Die Simulationsdaten konnten nicht geladen werden.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (userRole === 'dev') {
      fetchSimulations();
    }
  }, [timeFilter, moduleFilter, roleFilter, toast, userRole]);

  // Convert simulation data for charts
  const chartData: ChartData[] = simulations.map(sim => ({
    name: sim.name,
    avgScore: sim.avg_score,
    completionRate: sim.completion_rate,
    candidates: sim.candidates_count
  }));

  // Get unique role options for filter
  const roleOptions = Array.from(new Set(simulations.map(sim => sim.role || 'Unbekannt')));

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Simulationen & Analysen</h1>
            <p className="text-gray-400 mt-1">Umfassende Auswertung aller Testmodule</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Zeitraum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 Tage</SelectItem>
                <SelectItem value="30">30 Tage</SelectItem>
                <SelectItem value="90">90 Tage</SelectItem>
                <SelectItem value="all">Alle Zeit</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={moduleFilter} onValueChange={setModuleFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Modul" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Module</SelectItem>
                {simulations.map(sim => (
                  <SelectItem key={sim.id} value={sim.id}>
                    {sim.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Jobrolle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Rollen</SelectItem>
                {roleOptions.map(role => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="default" 
              className="bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet"
              onClick={() => navigate('/simulations/create')}
            >
              Neues Modul
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tactflux-turquoise"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-red-500 mb-3" />
            <h3 className="text-xl font-medium">Fehler beim Laden</h3>
            <p className="text-gray-400 mt-2">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Erneut versuchen
            </Button>
          </div>
        ) : simulations.length === 0 ? (
          <div className="bg-tactflux-gray/30 border border-white/5 rounded-lg p-12 text-center">
            <Brain className="h-16 w-16 mx-auto text-tactflux-turquoise mb-4 opacity-50" />
            <h3 className="text-xl font-medium">Keine Simulationen gefunden</h3>
            <p className="text-gray-400 mt-2">
              Es wurden keine Simulationen für die ausgewählten Filter gefunden.
            </p>
          </div>
        ) : (
          <>
            {/* Module Overview Table */}
            <Card className="bg-tactflux-gray border-white/5 shadow-card">
              <CardHeader className="border-b border-white/5">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BarChartIcon className="h-5 w-5 text-tactflux-turquoise" />
                  Modulübersicht
                </h2>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Modulname</TableHead>
                      <TableHead className="text-right">Durchläufe</TableHead>
                      <TableHead className="text-right">Ø Score</TableHead>
                      <TableHead className="text-right">Ø Zeit</TableHead>
                      <TableHead className="text-right">KI-Verdacht</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {simulations.map((sim) => (
                      <TableRow key={sim.id} className="cursor-pointer hover:bg-white/5" onClick={() => navigate(`/simulations/${sim.id}`)}>
                        <TableCell className="font-medium">{sim.name}</TableCell>
                        <TableCell className="text-right">{sim.candidates_count}</TableCell>
                        <TableCell className="text-right">
                          <span className={`font-semibold ${
                            sim.avg_score > 80 ? 'text-green-400' : 
                            sim.avg_score > 50 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {sim.avg_score}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{formatTime(sim.avg_time_seconds)}</TableCell>
                        <TableCell className="text-right">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center justify-end gap-2">
                                  <Bot className="h-4 w-4 text-tactflux-pink" />
                                  <span className={`${
                                    sim.avg_gpt_probability > 80 ? 'text-red-400' : 
                                    sim.avg_gpt_probability > 50 ? 'text-yellow-400' : 'text-green-400'
                                  }`}>
                                    {sim.avg_gpt_probability}%
                                  </span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>KI-Einsatz vermutet: {sim.avg_gpt_probability}%</p>
                                <p>Auffällige Antworten: {sim.suspicious_answers_rate}%</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* Score Chart */}
            <Card className="bg-tactflux-gray border-white/5 shadow-card">
              <CardHeader className="border-b border-white/5">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5 text-tactflux-violet" />
                  Score-Verlauf & Modulauslastung
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80">
                  <ChartContainer
                    config={{
                      avgScore: { color: "#00FFFF", label: "Ø Score" },
                      completionRate: { color: "#BE5CFF", label: "Abschlussrate" },
                      candidates: { color: "#FF007F", label: "Kandidaten" }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="name" 
                          stroke="#6b7280" 
                          tick={{ fill: '#6b7280', fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={70}
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
                              labelFormatter={(label) => `Modul: ${label}`}
                            />
                          } 
                        />
                        <Legend />
                        <Bar 
                          dataKey="avgScore" 
                          name="Ø Score" 
                          yAxisId="left"
                          fill="var(--color-avgScore)" 
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar 
                          dataKey="completionRate" 
                          name="Abschlussrate" 
                          yAxisId="left"
                          fill="var(--color-completionRate)" 
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar 
                          dataKey="candidates" 
                          name="Kandidaten" 
                          yAxisId="right"
                          fill="var(--color-candidates)" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* AI Analysis Cards */}
            <h2 className="text-xl font-semibold mt-8 mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5 text-tactflux-pink" />
              KI-Analysen pro Modul
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {simulations.map((simulation) => (
                <Card key={simulation.id} className="bg-tactflux-gray border-white/5 shadow-card">
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold">{simulation.name}</h3>
                    <p className="text-sm text-gray-400">{simulation.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>KI-Erkennungsrate</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className={`${
                                simulation.avg_gpt_probability > 80 ? 'text-red-400' : 
                                simulation.avg_gpt_probability > 50 ? 'text-yellow-400' : 'text-green-400'
                              }`}>
                                {simulation.avg_gpt_probability}%
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>KI-Einsatz vermutet: {simulation.avg_gpt_probability}%</p>
                              <p>{simulation.gpt_detection_count} Erkennungen</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Progress 
                        value={simulation.avg_gpt_probability} 
                        className="h-2 bg-white/10" 
                        indicatorClassName={`${
                          simulation.avg_gpt_probability > 80 ? 'bg-red-500' : 
                          simulation.avg_gpt_probability > 50 ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Auffällige Antworten</span>
                        <span className={`${
                          simulation.suspicious_answers_rate > 50 ? 'text-red-400' : 
                          simulation.suspicious_answers_rate > 25 ? 'text-yellow-400' : 
                          'text-green-400'
                        }`}>
                          {simulation.suspicious_answers_rate}%
                        </span>
                      </div>
                      <Progress 
                        value={simulation.suspicious_answers_rate} 
                        className="h-2 bg-white/10" 
                        indicatorClassName={`${
                          simulation.suspicious_answers_rate > 50 ? 'bg-red-500' : 
                          simulation.suspicious_answers_rate > 25 ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-tactflux-turquoise" />
                        <span className="text-sm">{simulation.candidates_count} Kandidaten</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-tactflux-violet" />
                        <span className={`text-sm ${difficultyColors[simulation.difficulty as keyof typeof difficultyColors]}`}>
                          {simulation.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-tactflux-turquoise" />
                        <span className="text-sm">{formatTime(simulation.avg_time_seconds)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-tactflux-pink" />
                        <span className="text-sm">{simulation.avg_score}% Score</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default SimulationsPage;

import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  Calendar, 
  Clock, 
  Copy,
  Download, 
  Edit2, 
  Mail, 
  MessageCircle, 
  MoreHorizontal, 
  Play, 
  User, 
  Users 
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChartData } from '@/types/chart';
import ProFeature from '@/components/tier/ProFeature';
import EnterpriseFeature from '@/components/tier/EnterpriseFeature';
import { exportToCSV, exportToPDF } from '@/utils/exportUtils';
import { useToast } from '@/components/ui/use-toast';

const simulationData = {
  id: 'sim-001',
  title: 'Frontend Developer Assessment',
  description: 'Comprehensive assessment for frontend developer candidates, focusing on React, JavaScript, and CSS skills.',
  date: '2025-04-10',
  status: 'completed',
  score: 87,
  timeLimit: '45 minutes',
  candidates: [
    { id: 'c1', name: 'Anna Schmidt', avatar: '', score: 92, status: 'completed' },
    { id: 'c2', name: 'Max Müller', avatar: '', score: 85, status: 'completed' },
    { id: 'c3', name: 'Sarah Fischer', avatar: '', score: 78, status: 'completed' },
    { id: 'c4', name: 'Thomas Weber', avatar: '', score: 90, status: 'completed' },
    { id: 'c5', name: 'Julia Becker', avatar: '', score: 65, status: 'completed' },
    { id: 'c6', name: 'David Schneider', avatar: '', score: 88, status: 'completed' },
    { id: 'c7', name: 'Laura Meyer', avatar: '', score: 72, status: 'completed' },
    { id: 'c8', name: 'Felix Wagner', avatar: '', score: 95, status: 'completed' },
  ],
  modules: [
    { id: 'm1', name: 'JavaScript Fundamentals', weight: 25, avgScore: 82 },
    { id: 'm2', name: 'React Components', weight: 30, avgScore: 85 },
    { id: 'm3', name: 'CSS & Styling', weight: 20, avgScore: 90 },
    { id: 'm4', name: 'State Management', weight: 15, avgScore: 78 },
    { id: 'm5', name: 'Performance Optimization', weight: 10, avgScore: 72 },
  ],
  skillDistribution: [
    { name: 'JavaScript', score: 85 },
    { name: 'React', score: 88 },
    { name: 'CSS', score: 92 },
    { name: 'HTML', score: 95 },
    { name: 'Git', score: 80 },
    { name: 'Testing', score: 75 },
  ],
  timeDistribution: [
    { time: '0-10', value: 22 },
    { time: '10-20', value: 28 },
    { time: '20-30', value: 35 },
    { time: '30-40', value: 12 },
    { time: '40+', value: 3 },
  ],
  resultDistribution: [
    { name: 'Passed', value: 18 },
    { name: 'Failed', value: 5 },
  ],
  feedbacks: [
    { id: 'f1', candidate: 'Anna Schmidt', content: 'The test was challenging but fair. I especially liked the React component exercises.', date: '2025-04-11' },
    { id: 'f2', candidate: 'Max Müller', content: 'Good assessment overall. Some questions were a bit ambiguous though.', date: '2025-04-12' },
    { id: 'f3', candidate: 'Thomas Weber', content: 'Very comprehensive test. It covered all aspects of frontend development.', date: '2025-04-10' },
  ]
};

const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6'];
const RESULT_COLORS = ['#10B981', '#EF4444'];

const SimulationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const handleExportCSV = () => {
    exportToCSV(simulationData.candidates, `tactflux-kandidaten-${id}`);
    toast({
      title: "Export erfolgreich",
      description: "Die Kandidatendaten wurden als CSV exportiert",
    });
  };

  const handleExportPDF = () => {
    const pdfData = simulationData.candidates.map(candidate => ({
      id: candidate.id,
      name: candidate.name,
      status: candidate.status,
      score: candidate.score,
      date: new Date().toISOString().split('T')[0]
    }));
    
    exportToPDF(pdfData, `tactflux-simulation-${id}`);
    toast({
      title: "Export erfolgreich",
      description: "Der Simulationsbericht wurde als PDF exportiert",
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{simulationData.title}</h1>
              <Badge 
                variant="outline" 
                className="bg-green-500/10 text-green-500 border-green-500/20"
              >
                <Calendar className="w-3 h-3 mr-1" />
                Abgeschlossen
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Erstellt am {new Date(simulationData.date).toLocaleDateString('de-DE')} • 
              {simulationData.candidates.length} Kandidaten
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <EnterpriseFeature>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Ergebnisse senden
              </Button>
            </EnterpriseFeature>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet">
                  <Download className="h-4 w-4 mr-2" />
                  Report exportieren
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportCSV}>
                  CSV Export (Pro)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportPDF}>
                  PDF Export (Enterprise)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Bearbeiten
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Play className="h-4 w-4 mr-2" />
                  Neu starten
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-tactflux-gray border-white/5 shadow-card lg:col-span-2">
            <CardHeader className="border-b border-white/5">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Simulation Übersicht</CardTitle>
                  <CardDescription>Details und Leistungskennzahlen</CardDescription>
                </div>
                <div className="flex items-center gap-1 bg-foreground/5 px-2 py-1 rounded-md text-sm font-mono">
                  ID: {simulationData.id}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card/50 p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm mb-1 flex items-center">
                    <Users className="h-3.5 w-3.5 mr-1.5" />
                    Kandidaten
                  </div>
                  <div className="text-2xl font-bold">{simulationData.candidates.length}</div>
                </div>
                
                <div className="bg-card/50 p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm mb-1 flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    Zeitlimit
                  </div>
                  <div className="text-2xl font-bold">{simulationData.timeLimit}</div>
                </div>
                
                <div className="bg-card/50 p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm mb-1 flex items-center">
                    <div className="h-3.5 w-3.5 mr-1.5 flex items-center justify-center text-xs">%</div>
                    Durchschn. Score
                  </div>
                  <div className="text-2xl font-bold">{simulationData.score}%</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Leistungsverteilung</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={simulationData.skillDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" tick={{ fill: '#888' }} />
                    <YAxis tick={{ fill: '#888' }} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Zeit pro Module (Minuten)</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={simulationData.timeDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="time" tick={{ fill: '#888' }} />
                      <YAxis tick={{ fill: '#888' }} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8B5CF6" 
                        fill="url(#colorGradient)" 
                        fillOpacity={0.6} 
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Abschlussquote</h3>
                  <div className="flex items-center justify-center h-[200px]">
                    <ChartContainer
                      config={{
                        passed: { label: "Bestanden", color: "#10B981" },
                        failed: { label: "Nicht bestanden", color: "#EF4444" }
                      }}
                    >
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={simulationData.resultDistribution as ChartData[]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {simulationData.resultDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={RESULT_COLORS[index % RESULT_COLORS.length]} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-tactflux-gray border-white/5 shadow-card">
            <CardHeader className="border-b border-white/5">
              <h2 className="text-xl font-semibold">Aktionen</h2>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <User className="h-4 w-4 mr-2" />
                Kandidaten hinzufügen
              </Button>
              
              <EnterpriseFeature lockMessage="Nachrichtenfunktion nur für Enterprise">
                <Button className="w-full justify-start" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Nachrichten senden
                </Button>
              </EnterpriseFeature>
              
              <Button className="w-full justify-start" variant="outline">
                <Edit2 className="h-4 w-4 mr-2" />
                Simulation bearbeiten
              </Button>
              
              <Button className="w-full justify-start" variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Simulation neu starten
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="results" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="results">Ergebnisse</TabsTrigger>
            <TabsTrigger value="candidates">Kandidaten</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="settings">Einstellungen</TabsTrigger>
          </TabsList>
          
          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Module Ergebnisse</CardTitle>
                <CardDescription>
                  Performance der Kandidaten in den verschiedenen Modulen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Modul</TableHead>
                      <TableHead>Gewichtung</TableHead>
                      <TableHead>Durchschn. Score</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {simulationData.modules.map((module) => (
                      <TableRow key={module.id}>
                        <TableCell className="font-medium">{module.name}</TableCell>
                        <TableCell>{module.weight}%</TableCell>
                        <TableCell>{module.avgScore}%</TableCell>
                        <TableCell className="w-[300px]">
                          <div className="flex items-center gap-2">
                            <Progress value={module.avgScore} className="h-2" />
                            <span className="text-xs text-muted-foreground w-10">
                              {module.avgScore}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <ProFeature>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Erweiterte Modulanalyse</CardTitle>
                    <CardDescription>
                      Detaillierte Analyse der Modulergebnisse
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-r from-tactflux-turquoise/20 to-tactflux-violet/20 rounded flex items-center justify-center">
                      <p className="text-sm text-center text-muted-foreground">
                        Erweiterte Modulanalyse und Leistungsvergleich<br />
                        (Pro-Feature aktiviert)
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Kompetenzanalyse</CardTitle>
                    <CardDescription>
                      Detaillierte Kompetenzauswertung
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-r from-tactflux-turquoise/20 to-tactflux-violet/20 rounded flex items-center justify-center">
                      <p className="text-sm text-center text-muted-foreground">
                        Verteilung der Kompetenzen und Fähigkeiten<br />
                        (Pro-Feature aktiviert)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ProFeature>
          </TabsContent>
          
          <TabsContent value="candidates">
            <Card>
              <CardHeader>
                <CardTitle>Kandidaten Liste</CardTitle>
                <CardDescription>
                  Alle Teilnehmer dieser Simulation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Bewertung</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {simulationData.candidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={candidate.avatar} />
                              <AvatarFallback className="bg-tactflux-turquoise text-white">
                                {candidate.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span>{candidate.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                            Abgeschlossen
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono">{candidate.score}%</TableCell>
                        <TableCell className="w-[300px]">
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={candidate.score} 
                              className={`h-2 ${
                                candidate.score >= 80 ? 'bg-green-200' : 
                                candidate.score >= 60 ? 'bg-yellow-200' : 'bg-red-200'
                              }`} 
                            />
                            <span className="text-xs text-muted-foreground w-10">
                              {candidate.score}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Kandidaten Feedback</CardTitle>
                <CardDescription>
                  Feedback der Teilnehmer zur Simulation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {simulationData.feedbacks.map((feedback) => (
                      <div key={feedback.id} className="border border-border/50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">{feedback.candidate}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(feedback.date).toLocaleDateString('de-DE')}
                          </div>
                        </div>
                        <p className="text-sm">{feedback.content}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Simulation Einstellungen</CardTitle>
                <CardDescription>
                  Konfiguriere die Parameter der Simulation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Einstellungen für diese Simulation sind in der aktuellen Version nicht verfügbar.
                </p>
              </CardContent>
            </Card>

            <EnterpriseFeature>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>API-Zugriff</CardTitle>
                  <CardDescription>
                    API-Endpunkte für diese Simulation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                      <div>
                        <p className="text-sm font-medium">Simulation Daten</p>
                        <code className="text-xs text-muted-foreground">/api/v1/simulations/{id}</code>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                      <div>
                        <p className="text-sm font-medium">Kandidaten Daten</p>
                        <code className="text-xs text-muted-foreground">/api/v1/simulations/{id}/candidates</code>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                      <div>
                        <p className="text-sm font-medium">Ergebnisexport</p>
                        <code className="text-xs text-muted-foreground">/api/v1/simulations/{id}/export</code>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </EnterpriseFeature>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SimulationDetailPage;

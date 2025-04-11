
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { 
  Check, 
  Clock, 
  FileText, 
  Plus, 
  Search, 
  Users,
  Calendar 
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ChartData, SimulationData } from '@/types/chart';
import ExportButtons from '@/components/export/ExportButtons';
import ProFeature from '@/components/tier/ProFeature';
import EnterpriseFeature from '@/components/tier/EnterpriseFeature';
import APIEndpoints from '@/components/tier/APIEndpoints';
import { exportToCSV, exportToPDF } from '@/utils/exportUtils';
import { useToast } from '@/components/ui/use-toast';

// Dummy data for simulations
const simulationsData: SimulationData[] = [
  {
    id: "sim-001",
    title: "Frontend Developer Assessment",
    date: "2025-04-10",
    status: "completed",
    score: 87,
    candidates: 12,
    chartData: [
      { name: "Passed", value: 8 },
      { name: "Failed", value: 4 }
    ]
  },
  {
    id: "sim-002",
    title: "Backend Engineer Technical Interview",
    date: "2025-04-15",
    status: "scheduled",
    candidates: 8
  },
  {
    id: "sim-003",
    title: "Full Stack Developer Skills Test",
    date: "2025-04-05",
    status: "completed",
    score: 92,
    candidates: 15,
    chartData: [
      { name: "Passed", value: 13 },
      { name: "Failed", value: 2 }
    ]
  },
  {
    id: "sim-004",
    title: "DevOps Specialist Assessment",
    date: "2025-04-12",
    status: "in-progress",
    candidates: 6
  },
  {
    id: "sim-005",
    title: "Junior Developer Screening",
    date: "2025-04-03",
    status: "completed",
    score: 76,
    candidates: 20,
    chartData: [
      { name: "Passed", value: 14 },
      { name: "Failed", value: 6 }
    ]
  }
];

// Helper function to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('de-DE', options);
};

// Status badge component
const StatusBadge = ({ status }: { status: SimulationData['status'] }) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
          <Check className="w-3 h-3 mr-1" />
          Abgeschlossen
        </Badge>
      );
    case "in-progress":
      return (
        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
          <Clock className="w-3 h-3 mr-1" />
          In Bearbeitung
        </Badge>
      );
    case "scheduled":
      return (
        <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
          <Calendar className="w-3 h-3 mr-1" />
          Geplant
        </Badge>
      );
    default:
      return null;
  }
};

// PieChart component
const SimulationPieChart = ({ data }: { data: ChartData[] }) => {
  const COLORS = ['#10B981', '#EF4444'];
  
  return (
    <ResponsiveContainer width="100%" height={100}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={25}
          outerRadius={40}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

const SimulationsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  
  // Filter simulations based on search term and active tab
  const filteredSimulations = simulationsData.filter(simulation => {
    const matchesSearch = simulation.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || simulation.status === activeTab;
    return matchesSearch && matchesTab;
  });
  
  const handleExportCSV = () => {
    exportToCSV(filteredSimulations, 'tactflux-simulationen');
    toast({
      title: "Export erfolgreich",
      description: "Die Simulationsdaten wurden als CSV exportiert",
    });
  };

  const handleExportPDF = () => {
    exportToPDF(filteredSimulations, 'tactflux-simulationen');
    toast({
      title: "Export erfolgreich",
      description: "Die Simulationsdaten wurden als PDF exportiert",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Simulationen</h1>
            <p className="text-muted-foreground">Verwalte und analysiere deine Assessment-Simulationen</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate('/simulations/new')} 
              className="bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet"
            >
              <Plus className="mr-2 h-4 w-4" />
              Neue Simulation
            </Button>

            <ExportButtons 
              onExportCSV={handleExportCSV}
              onExportPDF={handleExportPDF}
              label="Exportieren"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Gesamt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-tactflux-turquoise mr-2" />
                <span className="text-2xl font-bold">{simulationsData.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Bewerbungen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-tactflux-violet mr-2" />
                <span className="text-2xl font-bold">
                  {simulationsData.reduce((sum, sim) => sum + sim.candidates, 0)}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Durchschnittl. Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-5 w-5 text-tactflux-pink mr-2 flex items-center justify-center">%</div>
                <span className="text-2xl font-bold">
                  {Math.round(
                    simulationsData
                      .filter(sim => sim.score !== undefined)
                      .reduce((sum, sim) => sum + (sim.score || 0), 0) / 
                    simulationsData.filter(sim => sim.score !== undefined).length
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <Tabs 
            defaultValue="all" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList>
              <TabsTrigger value="all">Alle</TabsTrigger>
              <TabsTrigger value="scheduled">Geplant</TabsTrigger>
              <TabsTrigger value="in-progress">In Bearbeitung</TabsTrigger>
              <TabsTrigger value="completed">Abgeschlossen</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bewerber</TableHead>
                  <TableHead>Ergebnis</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSimulations.map((simulation) => (
                  <TableRow 
                    key={simulation.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => navigate(`/simulations/${simulation.id}`)}
                  >
                    <TableCell className="font-medium">{simulation.title}</TableCell>
                    <TableCell>{formatDate(simulation.date)}</TableCell>
                    <TableCell>
                      <StatusBadge status={simulation.status} />
                    </TableCell>
                    <TableCell>{simulation.candidates}</TableCell>
                    <TableCell>
                      {simulation.chartData ? (
                        <ChartContainer
                          config={{
                            passed: { label: "Bestanden", color: "#10B981" },
                            failed: { label: "Nicht bestanden", color: "#EF4444" }
                          }}
                        >
                          <SimulationPieChart data={simulation.chartData} />
                        </ChartContainer>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {simulation.score ? (
                        <span className="font-mono text-sm bg-foreground/5 px-2 py-1 rounded">
                          {simulation.score}%
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredSimulations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Keine Simulationen gefunden.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ProFeature>
            <div className="bg-card p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-4">Erweiterte Analysen</h3>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Simulationsvergleich</h4>
                  <div className="h-40 bg-gradient-to-r from-tactflux-turquoise/20 to-tactflux-violet/20 rounded flex items-center justify-center">
                    <p className="text-sm text-center text-muted-foreground">
                      Vergleich von Simulationseffektivität und Leistungstrends<br />
                      (Pro-Feature aktiviert)
                    </p>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Ergebniskorrelation</h4>
                  <div className="h-40 bg-gradient-to-r from-tactflux-turquoise/20 to-tactflux-violet/20 rounded flex items-center justify-center">
                    <p className="text-sm text-center text-muted-foreground">
                      Korrelationsanalyse zwischen Simulationstypen und Ergebnissen<br />
                      (Pro-Feature aktiviert)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ProFeature>

          <EnterpriseFeature>
            <APIEndpoints />
          </EnterpriseFeature>
        </div>
      </div>
    </Layout>
  );
};

export default SimulationsPage;

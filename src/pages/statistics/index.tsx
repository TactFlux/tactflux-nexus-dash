
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartTooltip, ChartLegendContent } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { Users, Target, TrendingUp, Zap, Brain, Sparkles } from 'lucide-react';

// Score distribution data
const scoreDistributionData = [
  { name: '0-20', value: 8, color: '#FF007F' },
  { name: '21-40', value: 15, color: '#FF6B9E' },
  { name: '41-60', value: 35, color: '#8B5CF6' },
  { name: '61-80', value: 28, color: '#00BBFF' },
  { name: '81-100', value: 14, color: '#00FFFF' },
];

// Module usage data
const moduleUsageData = [
  { name: 'Kreatives Problemlösen', value: 342, color: '#00FFFF' },
  { name: 'Logisches Denken', value: 278, color: '#8B5CF6' },
  { name: 'Design Thinking', value: 156, color: '#FF007F' },
  { name: 'Adaptive Kommunikation', value: 412, color: '#00BBFF' },
];

// Trend data
const trendData = [
  { month: 'Jan', score: 71, tests: 120 },
  { month: 'Feb', score: 73, tests: 150 },
  { month: 'Mar', score: 74, tests: 180 },
  { month: 'Apr', score: 72, tests: 190 },
  { month: 'Mai', score: 76, tests: 210 },
  { month: 'Jun', score: 79, tests: 250 },
];

// New detailed candidate performance data
const candidatePerformanceData = [
  { skill: 'Kreativität', average: 78, top: 92, min: 62 },
  { skill: 'Problemlösung', average: 72, top: 89, min: 58 },
  { skill: 'Kommunikation', average: 82, top: 95, min: 65 },
  { skill: 'Anpassungsfähigkeit', average: 75, top: 88, min: 60 },
  { skill: 'Kritisches Denken', average: 68, top: 85, min: 52 },
  { skill: 'Teamarbeit', average: 81, top: 93, min: 64 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 border border-border rounded-md shadow-lg">
        <p className="text-sm font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-xs" style={{ color: entry.fill || entry.color || entry.stroke }}>
            {`${entry.name || 'Wert'}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const StatisticsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Statistiken</h1>
            <p className="text-gray-400 mt-1">Übersicht aller Bewerberdaten und Kennzahlen</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Badge variant="outline" className="bg-tactflux-gray px-3 py-1.5 text-xs">
                Zeige Daten von 1.245 Kandidaten
              </Badge>
            </div>
          </div>
        </div>
        
        {/* New Feature: Main Performance Overview Card */}
        <Card className="bg-tactflux-gray border-white/5 shadow-card overflow-hidden">
          <div className="bg-gradient-to-r from-tactflux-violet/10 via-tactflux-pink/10 to-tactflux-turquoise/10 px-6 py-4 border-b border-white/5">
            <h2 className="text-xl font-bold">Kandidatenleistung im Detail</h2>
            <p className="text-sm text-gray-400">Detaillierte Analyse der Fähigkeiten aller Bewerber</p>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Performance metrics */}
              <div className="space-y-4 lg:col-span-2">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={candidatePerformanceData}
                      layout="vertical"
                      margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
                      barGap={8}
                      barSize={20}
                    >
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis 
                        dataKey="skill" 
                        type="category" 
                        width={120}
                        tick={{ fill: '#E5E7EB', fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="average" 
                        name="Durchschnitt" 
                        fill="#8B5CF6" 
                        radius={[0, 4, 4, 0]}
                      />
                      <Bar 
                        dataKey="top" 
                        name="Topwert" 
                        fill="#00FFFF" 
                        radius={[0, 4, 4, 0]}
                      />
                      <Bar 
                        dataKey="min" 
                        name="Minimalwert" 
                        fill="#FF007F" 
                        radius={[0, 4, 4, 0]}
                        opacity={0.8}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-tactflux-violet"></div>
                    <span className="text-xs text-gray-300">Durchschnitt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-tactflux-turquoise"></div>
                    <span className="text-xs text-gray-300">Topwert</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-tactflux-pink"></div>
                    <span className="text-xs text-gray-300">Minimalwert</span>
                  </div>
                </div>
              </div>
              
              {/* Right: Key metrics */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-tactflux-turquoise" />
                        <span className="text-sm font-medium">Durchschnittlicher Score</span>
                      </div>
                      <span className="text-xl font-bold text-tactflux-turquoise">76.3</span>
                    </div>
                    <Progress value={76.3} className="h-2 bg-white/10" indicatorClassName="bg-gradient-to-r from-tactflux-turquoise to-blue-400" />
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-tactflux-violet" />
                        <span className="text-sm font-medium">Top Skill</span>
                      </div>
                      <span className="text-xl font-bold text-tactflux-violet">Kommunikation</span>
                    </div>
                    <Progress value={82} className="h-2 bg-white/10" indicatorClassName="bg-gradient-to-r from-tactflux-violet to-purple-400" />
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-tactflux-pink" />
                        <span className="text-sm font-medium">Verbesserungspotential</span>
                      </div>
                      <span className="text-xl font-bold text-tactflux-pink">Kritisches Denken</span>
                    </div>
                    <Progress value={68} className="h-2 bg-white/10" indicatorClassName="bg-gradient-to-r from-tactflux-pink to-red-400" />
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-400" />
                        <span className="text-sm font-medium">Trend</span>
                      </div>
                      <span className="text-xl font-bold text-blue-400">+8.2%</span>
                    </div>
                    <Progress value={58} className="h-2 bg-white/10" indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-300" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Chart Section */}
        <Card className="bg-tactflux-gray border-white/5 shadow-card">
          <CardHeader>
            <h3 className="text-lg font-semibold">Score-Verteilung nach Punktzahlbereich</h3>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scoreDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={200}
                    animationDuration={1500}
                  >
                    {scoreDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {scoreDistributionData.map((entry, index) => (
                <div key={index} className="flex items-center p-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs">{entry.name} Punkte: <span className="font-medium">{entry.value}%</span></span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Module Usage Chart */}
          <Card className="bg-tactflux-gray border-white/5 shadow-card">
            <CardHeader>
              <h3 className="text-lg font-semibold">Modulnutzung</h3>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={moduleUsageData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {moduleUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Trend Data */}
          <Card className="bg-tactflux-gray border-white/5 shadow-card">
            <CardHeader>
              <h3 className="text-lg font-semibold">Score-Trend (Letzte 6 Monate)</h3>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trendData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="score"
                      stroke="#00FFFF"
                      strokeWidth={2}
                      name="Durchschnittsscore"
                      dot={{ fill: '#00FFFF', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="tests"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      name="Anzahl Tests"
                      dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-tactflux-gray border-white/5 shadow-card">
            <CardHeader>
              <h3 className="text-lg font-semibold">Bewerberstatistiken</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gesamt Bewerber</span>
                  <span className="font-medium">1,245</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Abgeschlossene Tests</span>
                  <span className="font-medium">876</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Durchschnittliche Punktzahl</span>
                  <span className="font-medium">72.4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Erfolgsquote</span>
                  <span className="font-medium">68%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-tactflux-gray border-white/5 shadow-card">
            <CardHeader>
              <h3 className="text-lg font-semibold">Zeitstatistiken</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Durchschnittliche Testzeit</span>
                  <span className="font-medium">24m 18s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Schnellste Abschlusszeit</span>
                  <span className="font-medium">12m 05s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Längste Abschlusszeit</span>
                  <span className="font-medium">48m 32s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Abbruchrate</span>
                  <span className="font-medium">14%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-tactflux-gray border-white/5 shadow-card">
            <CardHeader>
              <h3 className="text-lg font-semibold">Top Skills</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kreatives Denken</span>
                  <span className="font-medium text-tactflux-turquoise">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kommunikation</span>
                  <span className="font-medium text-tactflux-violet">82%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stressresistenz</span>
                  <span className="font-medium text-tactflux-pink">79%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Teamarbeit</span>
                  <span className="font-medium text-blue-500">76%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StatisticsPage;

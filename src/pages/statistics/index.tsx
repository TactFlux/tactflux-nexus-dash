
import React from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Beispieldaten für die Statistiken
const activityData = [
  { name: 'Jan', bewerbungen: 20, simulationen: 18, bestanden: 12 },
  { name: 'Feb', bewerbungen: 40, simulationen: 35, bestanden: 23 },
  { name: 'Mär', bewerbungen: 30, simulationen: 28, bestanden: 18 },
  { name: 'Apr', bewerbungen: 50, simulationen: 45, bestanden: 30 },
  { name: 'Mai', bewerbungen: 70, simulationen: 65, bestanden: 42 },
  { name: 'Jun', bewerbungen: 60, simulationen: 55, bestanden: 38 },
  { name: 'Jul', bewerbungen: 80, simulationen: 73, bestanden: 50 },
  { name: 'Aug', bewerbungen: 90, simulationen: 80, bestanden: 61 },
  { name: 'Sep', bewerbungen: 100, simulationen: 92, bestanden: 70 },
  { name: 'Okt', bewerbungen: 85, simulationen: 78, bestanden: 55 },
  { name: 'Nov', bewerbungen: 95, simulationen: 88, bestanden: 68 },
  { name: 'Dez', bewerbungen: 110, simulationen: 100, bestanden: 75 },
];

const scoreData = [
  { name: 'Jan', durchschnitt: 72 },
  { name: 'Feb', durchschnitt: 68 },
  { name: 'Mär', durchschnitt: 74 },
  { name: 'Apr', durchschnitt: 75 },
  { name: 'Mai', durchschnitt: 77 },
  { name: 'Jun', durchschnitt: 80 },
  { name: 'Jul', durchschnitt: 79 },
  { name: 'Aug', durchschnitt: 81 },
  { name: 'Sep', durchschnitt: 83 },
  { name: 'Okt', durchschnitt: 82 },
  { name: 'Nov', durchschnitt: 85 },
  { name: 'Dez', durchschnitt: 87 },
];

const timeData = [
  { name: 'Problem 1', durchschnitt: 15 },
  { name: 'Problem 2', durchschnitt: 25 },
  { name: 'Problem 3', durchschnitt: 18 },
  { name: 'Problem 4', durchschnitt: 30 },
  { name: 'Problem 5', durchschnitt: 22 },
  { name: 'Problem 6', durchschnitt: 28 },
];

const categoryScores = [
  { name: 'Kreativität', value: 78 },
  { name: 'Problemlösung', value: 82 },
  { name: 'Logik', value: 85 },
  { name: 'Kommunikation', value: 72 },
  { name: 'Originalität', value: 76 },
];

const weekdayData = [
  { name: 'Mo', wert: 120 },
  { name: 'Di', wert: 150 },
  { name: 'Mi', wert: 180 },
  { name: 'Do', wert: 170 },
  { name: 'Fr', wert: 190 },
  { name: 'Sa', wert: 80 },
  { name: 'So', wert: 60 },
];

const COLORS = ['#00FFFF', '#8B5CF6', '#FF007F', '#6EE7B7', '#FCD34D'];

const StatisticsPage = () => {
  return (
    <Layout>
      <div className="space-y-8 pb-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Statistiken & Trends</h1>
            <p className="text-sm text-muted-foreground">Detaillierte Analyse aller Daten und Trends</p>
          </div>
          <div>
            <Tabs defaultValue="monat">
              <TabsList>
                <TabsTrigger value="woche">Woche</TabsTrigger>
                <TabsTrigger value="monat">Monat</TabsTrigger>
                <TabsTrigger value="jahr">Jahr</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Aktivitätsübersicht */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivitätsübersicht</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={activityData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorBewerbungen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00FFFF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSimulationen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBestanden" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF007F" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF007F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip contentStyle={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Area type="monotone" dataKey="bewerbungen" stroke="#00FFFF" fillOpacity={1} fill="url(#colorBewerbungen)" />
                <Area type="monotone" dataKey="simulationen" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorSimulationen)" />
                <Area type="monotone" dataKey="bestanden" stroke="#FF007F" fillOpacity={1} fill="url(#colorBestanden)" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Erweiterte Analysen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Creative Fit Score Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={scoreData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[50, 100]} />
                  <Tooltip contentStyle={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Line type="monotone" dataKey="durchschnitt" stroke="#00FFFF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Bearbeitungszeit pro Aufgabe</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={timeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Minuten', angle: -90, position: 'insideLeft' }} />
                  <Tooltip contentStyle={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Bar dataKey="durchschnitt" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Verteilung der Creative Fit Scores</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryScores}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryScores.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Aktivität nach Wochentag</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={weekdayData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip contentStyle={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Bar dataKey="wert">
                    {weekdayData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StatisticsPage;


import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const StatisticsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Kandidatenverwaltung</h1>
            <p className="text-gray-400 mt-1">Bewerbungen prüfen und verwalten</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Badge variant="outline" className="bg-white/5 px-3 py-1.5 text-xs">
                Zeige 7 von 1.245 Kandidaten
              </Badge>
            </div>
            
            <div className="flex w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-3 py-2 border border-white/10 rounded-l-md hover:bg-white/5 text-sm min-h-[44px]">
                Vorherige
              </button>
              <button className="flex-1 sm:flex-none px-3 py-2 border-y border-r border-white/10 rounded-r-md hover:bg-white/5 text-sm min-h-[44px]">
                Nächste
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <h3 className="text-lg font-semibold">Modulnutzung</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kreatives Problemlösen</span>
                  <span className="font-medium">342</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Logisches Denken</span>
                  <span className="font-medium">278</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Design Thinking</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Adaptive Kommunikation</span>
                  <span className="font-medium">412</span>
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
        </div>
      </div>
    </Layout>
  );
};

export default StatisticsPage;

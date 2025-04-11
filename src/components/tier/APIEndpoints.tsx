
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const APIEndpoints: React.FC = () => {
  const { toast } = useToast();

  const apiEndpoints = [
    {
      name: 'Alle Kandidaten exportieren',
      endpoint: '/api/v1/candidates/export',
      method: 'GET'
    },
    {
      name: 'Alle Simulationen exportieren',
      endpoint: '/api/v1/simulations/export',
      method: 'GET'
    },
    {
      name: 'Testergebnisse exportieren',
      endpoint: '/api/v1/results/export',
      method: 'GET'
    }
  ];

  const handleCopyEndpoint = (endpoint: string) => {
    navigator.clipboard.writeText(`https://api.tactflux.com${endpoint}`);
    toast({
      title: "In Zwischenablage kopiert",
      description: `Endpoint wurde in die Zwischenablage kopiert.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API-Endpunkte</CardTitle>
        <CardDescription>
          Verwende diese Endpunkte für Bulk-Exporte und Integrationen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {apiEndpoints.map((api) => (
          <div 
            key={api.endpoint} 
            className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
          >
            <div>
              <p className="text-sm font-medium">{api.name}</p>
              <div className="flex items-center mt-1">
                <span className="text-xs font-mono bg-background px-2 py-1 rounded mr-2">{api.method}</span>
                <span className="text-xs font-mono text-muted-foreground">{api.endpoint}</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleCopyEndpoint(api.endpoint)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            <Code className="h-4 w-4 inline mr-1" />
            Für API-Dokumentation und Zugangsschlüssel kontaktiere unseren Support.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default APIEndpoints;

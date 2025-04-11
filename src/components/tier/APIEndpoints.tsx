
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Copy, Key, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useUserTier } from '@/contexts/UserTierContext';

const APIEndpoints: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isEnterprise } = useUserTier();
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);

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
    setIsLoading(endpoint);
    
    // Simulate loading for a smoother UX
    setTimeout(() => {
      navigator.clipboard.writeText(`https://api.tactflux.com${endpoint}`);
      setIsLoading(null);
      setCopiedEndpoint(endpoint);
      
      toast({
        title: "In Zwischenablage kopiert",
        description: `Endpoint wurde in die Zwischenablage kopiert.`,
      });
      
      // Reset copy icon after 2 seconds
      setTimeout(() => {
        setCopiedEndpoint(null);
      }, 2000);
    }, 400);
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-md border-opacity-50 hover:border-opacity-100">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span>API-Endpunkte</span>
          <div className="ml-2 h-2 w-2 rounded-full bg-green-500 animate-pulse" title="Alle Endpunkte sind online"></div>
        </CardTitle>
        <CardDescription>
          Verwende diese Endpunkte für Bulk-Exporte und Integrationen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {apiEndpoints.map((api) => (
          <div 
            key={api.endpoint} 
            className="flex items-center justify-between p-3 bg-muted/50 rounded-md transition-all duration-300 hover:bg-muted hover:shadow-sm group"
          >
            <div>
              <p className="text-sm font-medium group-hover:text-tactflux-turquoise transition-colors duration-300">{api.name}</p>
              <div className="flex items-center mt-1">
                <span className="text-xs font-mono bg-background px-2 py-1 rounded mr-2 transition-colors duration-300 group-hover:bg-tactflux-violet/20 group-hover:text-tactflux-violet">{api.method}</span>
                <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors duration-300">{api.endpoint}</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleCopyEndpoint(api.endpoint)}
              className="transition-all duration-300 hover:bg-muted/80 hover:scale-105 active:scale-95"
              disabled={isLoading === api.endpoint}
            >
              {isLoading === api.endpoint ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : copiedEndpoint === api.endpoint ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
        
        {isEnterprise && (
          <div className="mt-6 p-4 border border-tactflux-turquoise/30 bg-tactflux-turquoise/5 rounded-md transition-all duration-300 hover:border-tactflux-turquoise/50 hover:shadow-[0_0_10px_rgba(0,255,255,0.1)] hover:bg-tactflux-turquoise/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium flex items-center">
                  <Key className="h-4 w-4 mr-2 text-tactflux-turquoise" />
                  Enterprise API-Zugang
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Als Enterprise-Nutzer hast du Zugriff auf unsere erweiterte REST API
                </p>
              </div>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => navigate('/admin/api-keys')}
              >
                API-Keys verwalten
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground group transition-all duration-300 hover:text-foreground cursor-help">
            <Code className="h-4 w-4 inline mr-1 group-hover:text-tactflux-turquoise transition-colors duration-300" />
            Für API-Dokumentation und Zugangsschlüssel kontaktiere unseren Support.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default APIEndpoints;

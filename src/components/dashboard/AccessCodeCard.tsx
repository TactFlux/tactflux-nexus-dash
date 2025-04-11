
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AccessCode {
  id: string;
  code: string;
  expiresAt: string;
  isActive: boolean;
}

const mockCodes: AccessCode[] = [
  {
    id: '1',
    code: 'TF-DEV-2025-ALPHA',
    expiresAt: '2025-05-15',
    isActive: true
  },
  {
    id: '2',
    code: 'TF-DESIGN-2025-BETA',
    expiresAt: '2025-06-01',
    isActive: true
  },
  {
    id: '3',
    code: 'TF-MANAGER-2025-GAMMA',
    expiresAt: '2025-04-30',
    isActive: false
  }
];

const AccessCodeCard = () => {
  return (
    <div className="bg-card rounded-xl shadow-card border border-border h-full animate-fade-in">
      <div className="p-6 border-b border-border">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Zugangscodes</h3>
          <Button 
            variant="ghost" 
            className="h-8 px-3 gap-1 bg-gradient-to-r from-tactflux-turquoise/20 to-tactflux-violet/20 hover:from-tactflux-turquoise/30 hover:to-tactflux-violet/30 border border-border"
          >
            <span>+</span> Neuer Code
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {mockCodes.map((code) => (
            <div 
              key={code.id}
              className="p-4 border border-border rounded-lg flex justify-between items-center hover:bg-muted/20 transition-colors"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-medium">{code.code}</span>
                  <Badge className={code.isActive 
                    ? "bg-green-500/20 text-green-500 border-green-500/20" 
                    : "bg-gray-500/20 text-gray-400 border-gray-500/20"
                  }>
                    {code.isActive ? 'Aktiv' : 'Inaktiv'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Läuft ab: {code.expiresAt}</p>
              </div>
              
              <div className="flex gap-2">
                <button className="text-xs text-muted-foreground hover:text-foreground">Kopieren</button>
                <button className="text-xs text-tactflux-pink hover:text-red-500">Löschen</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessCodeCard;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

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
  const { toast } = useToast();
  const [hoverCodeId, setHoverCodeId] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code kopiert",
      description: "Der Zugangscode wurde in die Zwischenablage kopiert.",
    });
  };

  const handleDeleteCode = (id: string) => {
    toast({
      title: "Code gelöscht",
      description: "Der Zugangscode wurde erfolgreich gelöscht.",
    });
  };

  return (
    <div className="bg-card rounded-xl shadow-card border border-border h-full animate-fade-in transition-all duration-300 hover:shadow-md">
      <div className="p-6 border-b border-border">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Zugangscodes</h3>
          <Button 
            variant="ghost" 
            className="h-8 px-3 gap-1 bg-gradient-to-r from-tactflux-turquoise/20 to-tactflux-violet/20 hover:from-tactflux-turquoise/30 hover:to-tactflux-violet/30 hover:scale-[1.05] active:scale-[0.98] border border-border transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span>Neuer Code</span>
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {mockCodes.map((code) => (
            <div 
              key={code.id}
              className="p-4 border border-border rounded-lg flex justify-between items-center hover:bg-muted/20 transition-all duration-300 hover:shadow-md group"
              onMouseEnter={() => setHoverCodeId(code.id)}
              onMouseLeave={() => setHoverCodeId(null)}
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-medium transition-all duration-300 group-hover:text-tactflux-turquoise">{code.code}</span>
                  <Badge className={cn(
                    "transition-all duration-300",
                    code.isActive 
                      ? "bg-green-500/20 text-green-500 border-green-500/20 group-hover:bg-green-500/30" 
                      : "bg-gray-500/20 text-gray-400 border-gray-500/20"
                  )}>
                    {code.isActive ? 'Aktiv' : 'Inaktiv'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Läuft ab: {code.expiresAt}</p>
              </div>
              
              <div className="flex gap-2">
                <button 
                  className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] p-1 rounded-md hover:bg-muted/30"
                  onClick={() => handleCopyCode(code.code)}
                >
                  <Copy className={`h-3.5 w-3.5 mr-1 ${hoverCodeId === code.id ? 'animate-pulse' : ''}`} />
                  Kopieren
                </button>
                <button 
                  className="flex items-center text-xs text-tactflux-pink hover:text-red-500 transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] p-1 rounded-md hover:bg-red-500/10"
                  onClick={() => handleDeleteCode(code.id)}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessCodeCard;

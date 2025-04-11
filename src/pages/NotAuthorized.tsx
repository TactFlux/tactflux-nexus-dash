
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotAuthorized = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-lg border border-border shadow-lg text-center">
        <ShieldAlert className="h-16 w-16 text-tactflux-pink mx-auto mb-4" />
        
        <h1 className="text-2xl font-bold mb-2">Zugriff verweigert</h1>
        
        <p className="text-gray-400 mb-6">
          Sie haben keine Berechtigung, auf diese Seite zuzugreifen. 
          Diese Seite erfordert spezielle Berechtigungen.
        </p>
        
        <div className="space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zum Dashboard
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/login')}
          >
            Anmelden mit anderem Konto
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;

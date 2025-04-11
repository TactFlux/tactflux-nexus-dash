
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { LockKeyhole, Mail } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { UserRole } from '@/types/team';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('admin');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!email || !password) {
      toast({
        title: "Fehler",
        description: "Bitte gebe E-Mail und Passwort ein",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Check admin credentials (in a real app, this would be done server-side)
    if (email === 'liam.ts@icloud.com' && password === 'hesk-hueu-jrjd') {
      // Set authentication in local storage with correct role and plan mapping
      const planMapping = {
        admin: 'enterprise',
        hr: 'pro',
        viewer: 'free'
      };
      
      localStorage.setItem('tactflux-admin', JSON.stringify({ 
        isAdmin: true, 
        role,
        id: 'admin-user',
        email: 'liam.ts@icloud.com',
        companyId: 'default-company',
        company: {
          id: 'default-company',
          name: 'TactFlux Admin',
          plan: planMapping[role],
          logoUrl: '/lovable-uploads/79b93f56-97fe-416b-9625-4bf78b87f33f.png',
          primaryColor: '#6E59A5',
          accentColor: '#1EAEDB',
          welcomeMessage: 'Willkommen im TactFlux Admin-Dashboard'
        }
      }));
      
      // Show success message
      toast({
        title: "Anmeldung erfolgreich",
        description: `Willkommen im TactFlux Admin-Dashboard (${role.toUpperCase()})`,
      });

      // Navigate to dashboard
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      toast({
        title: "Authentifizierung fehlgeschlagen",
        description: "Ungültige E-Mail oder Passwort",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8 mt-6 sm:mt-12">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64">
              <img 
                src="/lovable-uploads/79b93f56-97fe-416b-9625-4bf78b87f33f.png" 
                alt="TactFlux Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
          <p className="text-muted-foreground">Gib deine Anmeldedaten ein, um auf das Admin-Dashboard zuzugreifen</p>
        </div>
        
        <div className="bg-card p-6 sm:p-8 rounded-xl border border-border shadow-card">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium block">
                E-Mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tactflux.com"
                  className="pl-10 bg-background border-input focus:border-primary focus:ring-primary h-12"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium block">
                Passwort
              </label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="pl-10 bg-background border-input focus:border-primary focus:ring-primary h-12"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium block">
                Rolle
              </label>
              <Select 
                value={role} 
                onValueChange={(value: UserRole) => setRole(value)}
              >
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Wähle eine Rolle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator (Enterprise)</SelectItem>
                  <SelectItem value="hr">HR Manager (Pro)</SelectItem>
                  <SelectItem value="viewer">Betrachter (Free)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Wähle die Rolle, mit der du dich anmelden möchtest. Die Rolle bestimmt deine Zugriffsrechte im System.
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet hover:opacity-90 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Authentifiziere..." : "Anmelden"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Noch kein Account?{' '}
                <a href="/signup" className="text-tactflux-turquoise hover:underline">
                  Jetzt registrieren
                </a>
              </p>
            </div>
          </form>
        </div>
        
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TactFlux. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

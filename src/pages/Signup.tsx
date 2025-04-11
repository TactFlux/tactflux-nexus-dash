import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Building, Mail, LockKeyhole } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateRandomId } from '@/utils/idGenerator';

const Signup = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState<'free' | 'pro' | 'enterprise'>('free');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!companyName || !email || !password) {
      toast({
        title: "Fehler",
        description: "Bitte fülle alle Pflichtfelder aus",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Generate unique IDs for company and user
      const companyId = generateRandomId();
      const userId = generateRandomId();
      
      // Create a new company object
      const company = {
        id: companyId,
        name: companyName,
        plan: plan,
        logoUrl: '/lovable-uploads/79b93f56-97fe-416b-9625-4bf78b87f33f.png', // Default logo
        primaryColor: plan === 'free' ? '#6E59A5' : plan === 'pro' ? '#8B5CF6' : '#D946EF',
        accentColor: plan === 'free' ? '#1EAEDB' : plan === 'pro' ? '#0EA5E9' : '#F97316',
        welcomeMessage: `Willkommen bei ${companyName}!`
      };
      
      // In a real application, this would be a server-side call to create accounts
      localStorage.setItem('tactflux-admin', JSON.stringify({
        id: userId,
        email,
        isAdmin: true,
        role: 'admin',
        companyId,
        company
      }));
      
      // Show success message
      toast({
        title: "Registrierung erfolgreich",
        description: `Ihr ${companyName} Account wurde erstellt!`,
      });

      // Navigate to dashboard
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registrierung fehlgeschlagen",
        description: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
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
          <h2 className="text-2xl font-bold mb-2">Neuen Account erstellen</h2>
          <p className="text-muted-foreground">Registrieren Sie Ihr Unternehmen bei TactFlux</p>
        </div>
        
        <Card className="border border-border shadow-card">
          <CardHeader>
            <CardTitle>Unternehmensregistrierung</CardTitle>
            <CardDescription>Geben Sie Ihre Unternehmensdaten ein</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Firmenname</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="companyName" 
                    type="text" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ihre Firma GmbH"
                    className="pl-10 bg-background border-input focus:border-primary focus:ring-primary h-12"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@ihrefirma.de"
                    className="pl-10 bg-background border-input focus:border-primary focus:ring-primary h-12"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
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
                <Label htmlFor="plan">Preisplan</Label>
                <Select 
                  value={plan} 
                  onValueChange={(value: 'free' | 'pro' | 'enterprise') => setPlan(value)}
                >
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Bitte wählen Sie einen Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free (5 Kandidaten)</SelectItem>
                    <SelectItem value="pro">Pro (100 Kandidaten, CSV Export)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (Unbegrenzt, API, PDF)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Jeder Plan bietet unterschiedliche Funktionen und Limits.
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet hover:opacity-90 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Registriere..." : "Account erstellen"}
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Bereits registriert?{' '}
                  <a href="/login" className="text-tactflux-turquoise hover:underline">
                    Zur Anmeldung
                  </a>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TactFlux. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

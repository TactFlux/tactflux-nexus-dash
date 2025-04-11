import React, { useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Check, X } from 'lucide-react';

const CompanySettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [companyName, setCompanyName] = useState(user?.company?.name || '');
  const [plan, setPlan] = useState<'free' | 'pro' | 'enterprise'>(
    (user?.company?.plan as 'free' | 'pro' | 'enterprise') || 'free'
  );
  const [primaryColor, setPrimaryColor] = useState(user?.company?.primaryColor || '#6E59A5');
  const [accentColor, setAccentColor] = useState(user?.company?.accentColor || '#1EAEDB');
  const [welcomeMessage, setWelcomeMessage] = useState(user?.company?.welcomeMessage || '');
  const [logoPreview, setLogoPreview] = useState(user?.company?.logoUrl || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoPreview(event.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    if (!user || !user.company) return;
    
    setIsLoading(true);
    
    const updatedCompany = {
      ...user.company,
      name: companyName,
      plan,
      primaryColor,
      accentColor,
      welcomeMessage,
      logoUrl: logoPreview
    };
    
    const updatedUser = {
      ...user,
      company: updatedCompany
    };
    
    localStorage.setItem('tactflux-admin', JSON.stringify(updatedUser));
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Einstellungen gespeichert",
        description: "Die Unternehmenseinstellungen wurden aktualisiert.",
      });
    }, 1000);
  };

  if (!user || user.role !== 'admin') {
    return (
      <Layout>
        <div className="py-10 text-center">
          <h1 className="text-2xl font-bold">Zugriff verweigert</h1>
          <p className="mt-2 text-muted-foreground">
            Sie benötigen Administratorrechte, um auf diese Seite zuzugreifen.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Unternehmenseinstellungen</h1>
            <p className="text-muted-foreground">
              Verwalten Sie Ihre Unternehmenseinstellungen und Branding
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Allgemeine Informationen</CardTitle>
              <CardDescription>
                Grundlegende Informationen zu Ihrem Unternehmen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Firmenname</label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ihre Firma GmbH"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Preisplan</label>
                <Select 
                  value={plan}
                  onValueChange={(value: 'free' | 'pro' | 'enterprise') => setPlan(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie einen Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free (5 Kandidaten)</SelectItem>
                    <SelectItem value="pro">Pro (100 Kandidaten, CSV Export)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (Unbegrenzt, API, PDF)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Willkommensnachricht</label>
                <Textarea
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  placeholder="Willkommen bei unserer Plattform!"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>
                Passen Sie das Erscheinungsbild Ihrer Plattform an
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Firmenlogo</label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 border border-border rounded-md overflow-hidden bg-background flex items-center justify-center">
                    {logoPreview ? (
                      <img 
                        src={logoPreview} 
                        alt="Firmenlogo" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-muted-foreground text-xs">Kein Logo</span>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleLogoChange}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Logo hochladen
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Primärfarbe</label>
                <div className="flex space-x-2">
                  <div 
                    className="w-10 h-10 rounded-md border border-border"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <Input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full h-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Akzentfarbe</label>
                <div className="flex space-x-2">
                  <div 
                    className="w-10 h-10 rounded-md border border-border"
                    style={{ backgroundColor: accentColor }}
                  />
                  <Input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-full h-10"
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                  className="w-full"
                  style={{ 
                    background: `linear-gradient(to right, ${primaryColor}, ${accentColor})` 
                  }}
                >
                  {isLoading ? "Speichere..." : "Einstellungen speichern"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Vorschau</CardTitle>
              <CardDescription>
                So wird Ihr Branding auf der Plattform aussehen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-border rounded-lg p-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 border border-border rounded-md overflow-hidden bg-background flex items-center justify-center">
                    {logoPreview ? (
                      <img 
                        src={logoPreview} 
                        alt="Firmenlogo" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-muted-foreground text-xs">Logo</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{companyName || 'Ihre Firma GmbH'}</h3>
                    <p className="text-sm text-muted-foreground">
                      {plan === 'free' ? 'Free Plan' : plan === 'pro' ? 'Pro Plan' : 'Enterprise Plan'}
                    </p>
                  </div>
                </div>
                
                <div 
                  className="p-4 rounded-md"
                  style={{ backgroundColor: primaryColor + '20' }}
                >
                  <h4 
                    className="font-medium mb-2"
                    style={{ color: primaryColor }}
                  >
                    Willkommensnachricht
                  </h4>
                  <p className="text-sm">
                    {welcomeMessage || 'Willkommen bei unserer Plattform!'}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    style={{ 
                      background: primaryColor 
                    }}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Primärbutton
                  </Button>
                  <Button
                    variant="outline"
                    style={{ 
                      borderColor: accentColor,
                      color: accentColor 
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Sekundärbutton
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CompanySettingsPage;

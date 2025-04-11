
import React, { useState, useEffect } from 'react';
import { useUserTier } from '@/contexts/UserTierContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Plus, Trash2, Key, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import EnterpriseFeature from '@/components/tier/EnterpriseFeature';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ApiKey {
  id: string;
  api_key: string;
  description: string | null;
  created_at: string;
  last_used_at: string | null;
}

const ApiKeysPage = () => {
  const { isEnterprise, isLoading } = useUserTier();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading1, setIsLoading1] = useState(true);
  const [description, setDescription] = useState('');
  const [newKey, setNewKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isLoading && !isEnterprise) {
      navigate('/not-authorized');
      return;
    }
    
    fetchApiKeys();
  }, [isEnterprise, isLoading, navigate]);

  const fetchApiKeys = async () => {
    setIsLoading1(true);
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setApiKeys(data || []);
    } catch (error: any) {
      console.error('Fehler beim Laden der API-Keys:', error);
      toast({
        title: 'Fehler',
        description: 'API-Keys konnten nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading1(false);
    }
  };

  const createApiKey = async () => {
    try {
      setIsGenerating(true);
      
      // Generate a random API key (this is just for demo purposes)
      // In a real application, this would be done server-side
      const randomKey = Array(32)
        .fill(0)
        .map(() => Math.random().toString(36).charAt(2))
        .join('');
      
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error('Nicht angemeldet');
      
      // Insert the new API key into the database
      const { data, error } = await supabase
        .from('api_keys')
        .insert({
          api_key: randomKey,
          description: description || null,
          user_id: userData.user.id
        })
        .select();
      
      if (error) throw error;
      
      setNewKey(randomKey);
      setDescription('');
      fetchApiKeys();
      
      toast({
        title: 'API-Key erstellt',
        description: 'Dein neuer API-Key wurde erfolgreich erstellt.',
      });
    } catch (error: any) {
      console.error('Fehler beim Erstellen des API-Keys:', error);
      toast({
        title: 'Fehler',
        description: error.message || 'API-Key konnte nicht erstellt werden.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteApiKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setApiKeys(apiKeys.filter(key => key.id !== id));
      toast({
        title: 'API-Key gelöscht',
        description: 'Der API-Key wurde erfolgreich gelöscht.',
      });
    } catch (error) {
      console.error('Fehler beim Löschen des API-Keys:', error);
      toast({
        title: 'Fehler',
        description: 'API-Key konnte nicht gelöscht werden.',
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Kopiert!',
      description: 'In die Zwischenablage kopiert.',
    });
  };

  return (
    <Layout>
      <EnterpriseFeature>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">API-Key Verwaltung</h1>
            <Button className="bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet"
                    onClick={() => navigate('/admin/api-docs')}>
              API-Dokumentation
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Neuen API-Key erstellen</CardTitle>
              <CardDescription>
                API-Keys ermöglichen externen Anwendungen den Zugriff auf die TactFlux-API.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <Label htmlFor="description">Beschreibung (optional)</Label>
                    <Input
                      id="description"
                      placeholder="z.B. Integration mit HR-System"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={createApiKey} 
                      className="w-full" 
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generiere...
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          API-Key erstellen
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {newKey && (
                  <div className="mt-4 p-4 bg-muted rounded-md border border-border animate-fade-in">
                    <div className="flex justify-between items-center">
                      <div className="max-w-[80%]">
                        <p className="text-sm font-medium mb-1">Dein neuer API-Key (nur einmal sichtbar):</p>
                        <p className="font-mono text-xs bg-background p-2 rounded break-all">{newKey}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(newKey)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Kopiere diesen Key jetzt! Er wird aus Sicherheitsgründen nicht mehr angezeigt.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deine API-Keys</CardTitle>
              <CardDescription>
                Verwalte deine aktiven API-Keys.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading1 ? (
                <div className="flex justify-center py-8">
                  <div className="animate-pulse h-8 w-8 rounded-full bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet"></div>
                </div>
              ) : apiKeys.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Key className="mx-auto h-12 w-12 mb-3 opacity-20" />
                  <p>Keine API-Keys vorhanden.</p>
                  <p className="text-sm">Erstelle deinen ersten API-Key oben.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">
                            {key.description || "Kein Titel"}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <span>Erstellt am {format(new Date(key.created_at), 'dd. MMMM yyyy', { locale: de })}</span>
                          {key.last_used_at && (
                            <span> • Zuletzt verwendet am {format(new Date(key.last_used_at), 'dd. MMMM yyyy', { locale: de })}</span>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteApiKey(key.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Alert className="bg-muted border border-border">
            <AlertDescription>
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-tactflux-turquoise" />
                <span className="text-sm">
                  API-Keys sind nur für Enterprise-Kunden verfügbar und ermöglichen automatisierte Integrationen mit deinen bestehenden Systemen.
                </span>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </EnterpriseFeature>
    </Layout>
  );
};

export default ApiKeysPage;

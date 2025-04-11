
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnterpriseFeature } from '@/components/tier';
import ReportRecipientForm from '@/components/reports/ReportRecipientForm';
import ReportRecipientsList from '@/components/reports/ReportRecipientsList';
import AutomatedReportInfo from '@/components/reports/AutomatedReportInfo';
import { supabase } from '@/integrations/supabase/client';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, FileText, BarChart3, CircleCheck, Loader2 } from 'lucide-react';

interface ReportRecipient {
  id: string;
  email: string;
  company_name: string | null;
  active: boolean;
  created_at: string;
}

const ReportSettingsPage = () => {
  const { toast } = useToast();
  const [recipients, setRecipients] = useState<ReportRecipient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecipients = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('report_recipients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecipients(data || []);
    } catch (error) {
      console.error('Error fetching recipients:', error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Die Empfängerliste konnte nicht geladen werden.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipients();
  }, []);

  // Generate delivery history mockup data
  const deliveryHistory = [
    {
      id: '1',
      date: '07.04.2025',
      recipients: 12,
      tests: 128,
      completed: 94,
      status: 'success'
    },
    {
      id: '2',
      date: '31.03.2025',
      recipients: 12,
      tests: 112,
      completed: 86,
      status: 'success'
    },
    {
      id: '3',
      date: '24.03.2025',
      recipients: 10,
      tests: 98,
      completed: 72,
      status: 'success'
    }
  ];

  return (
    <Layout>
      <div className="container max-w-6xl py-8">
        <h1 className="text-2xl font-bold mb-2">Reporting Einstellungen</h1>
        <p className="text-muted-foreground mb-6">Verwalte automatische Berichte und deren Empfänger</p>
        
        <EnterpriseFeature>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Tabs defaultValue="recipients" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="recipients" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Empfänger
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Versandverlauf
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="recipients" className="space-y-6 animate-fade-in">
                  <div className="bg-card p-4 rounded-md border">
                    <h3 className="text-lg font-medium mb-4">Neuen Empfänger hinzufügen</h3>
                    <ReportRecipientForm onSuccess={fetchRecipients} />
                  </div>
                  
                  <div className="bg-card rounded-md border">
                    <h3 className="text-lg font-medium p-4 border-b">Empfängerliste</h3>
                    {isLoading ? (
                      <div className="p-8 text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 opacity-50" />
                        <p className="text-muted-foreground">Empfänger werden geladen...</p>
                      </div>
                    ) : (
                      <ReportRecipientsList 
                        recipients={recipients} 
                        onRecipientDeleted={fetchRecipients} 
                      />
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="animate-fade-in">
                  <div className="bg-card rounded-md border">
                    <h3 className="text-lg font-medium p-4 border-b">Versandhistorie</h3>
                    
                    <div className="p-4">
                      {deliveryHistory.length > 0 ? (
                        <div className="space-y-4">
                          {deliveryHistory.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                              <div>
                                <div className="flex items-center">
                                  <CircleCheck className="h-4 w-4 mr-2 text-green-500" />
                                  <p className="font-medium">Wochenbericht {item.date}</p>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {item.recipients} Empfänger • {item.tests} Tests • {item.completed} abgeschlossen
                                </div>
                              </div>
                              <button className="text-xs px-2 py-1 bg-muted rounded-full hover:bg-muted/80 transition-colors">
                                Anzeigen
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center">
                          <p className="text-muted-foreground">Der Versandverlauf wird nach dem ersten Versand hier angezeigt.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <AutomatedReportInfo recipientCount={recipients.length} />
              
              <Alert>
                <Info className="h-4 w-4 mr-2 text-tactflux-turquoise" />
                <AlertDescription className="text-sm">
                  Die Wochenreports werden jeden Freitag um 09:00 Uhr (UTC) automatisch erstellt und an alle aktiven Empfänger versendet.
                </AlertDescription>
              </Alert>
              
              <div className="bg-card p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-2">Enthaltene Daten</h3>
                <Separator className="my-2" />
                <ul className="space-y-1 text-sm">
                  <li className="text-muted-foreground">• Top 10 Kandidaten nach Score</li>
                  <li className="text-muted-foreground">• Abgeschlossene Tests der letzten 7 Tage</li>
                  <li className="text-muted-foreground">• DSGVO-konform (nur Vornamen)</li>
                  <li className="text-muted-foreground">• PDF und CSV Formate</li>
                </ul>
              </div>
            </div>
          </div>
        </EnterpriseFeature>
      </div>
    </Layout>
  );
};

export default ReportSettingsPage;

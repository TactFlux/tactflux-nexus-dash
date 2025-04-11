
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
import { Info } from 'lucide-react';

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

  return (
    <Layout>
      <div className="container max-w-6xl py-8">
        <h1 className="text-2xl font-bold mb-6">Reporting Einstellungen</h1>
        
        <EnterpriseFeature>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Tabs defaultValue="recipients" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="recipients">Empfänger</TabsTrigger>
                  <TabsTrigger value="history">Versandverlauf</TabsTrigger>
                </TabsList>
                
                <TabsContent value="recipients" className="space-y-6">
                  <div className="bg-card p-4 rounded-md border">
                    <h3 className="text-lg font-medium mb-4">Neuen Empfänger hinzufügen</h3>
                    <ReportRecipientForm onSuccess={fetchRecipients} />
                  </div>
                  
                  <div className="bg-card rounded-md border">
                    <h3 className="text-lg font-medium p-4 border-b">Empfängerliste</h3>
                    {isLoading ? (
                      <div className="p-4 text-center">
                        <p className="text-muted-foreground">Wird geladen...</p>
                      </div>
                    ) : (
                      <ReportRecipientsList 
                        recipients={recipients} 
                        onRecipientDeleted={fetchRecipients} 
                      />
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="history">
                  <div className="bg-card p-4 rounded-md border h-[400px] flex items-center justify-center">
                    <p className="text-muted-foreground">Der Versandverlauf wird nach dem ersten Versand hier angezeigt.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <AutomatedReportInfo recipientCount={recipients.length} />
              
              <Alert>
                <Info className="h-4 w-4 mr-2" />
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

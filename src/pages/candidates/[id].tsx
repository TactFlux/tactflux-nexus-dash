
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CandidateData } from '@/types/chart';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { generateCandidatePDF } from '@/utils/pdfUtils';
import { formatDate } from '@/utils/dateUtils';
import { FileText, ArrowLeft, Star, StarOff } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useUserTier } from '@/contexts/UserTierContext';
import { ProFeature } from '@/components/tier';
import CandidateModuleScores from '@/components/candidate/CandidateModuleScores';

const CandidateDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isProOrHigher } = useUserTier();
  const [feedback, setFeedback] = useState('');
  const [favorite, setFavorite] = useState(false);

  // Fetch candidate data
  const { data: candidate, isLoading, error } = useQuery({
    queryKey: ['candidate', id],
    queryFn: async () => {
      // This is just a mock API call for now
      // In a real implementation, you would fetch from Supabase
      const mockCandidate: CandidateData = {
        id: id || '1',
        name: 'Max Mustermann',
        email: 'max.mustermann@beispiel.de',
        position: 'Frontend Developer',
        status: 'completed',
        score: 82,
        date: new Date().toISOString(),
        favorite: Math.random() > 0.5,
        moduleScores: [
          { name: 'Kreativität', score: 85 },
          { name: 'Strategie', score: 78 },
          { name: 'Kommunikation', score: 92 },
          { name: 'Stressresistenz', score: 75 },
          { name: 'Problemlösung', score: 88 }
        ],
        gptDetectionScore: 22,
        feedback: 'Der Kandidat hat sehr gut abgeschnitten und zeigt großes Potenzial.'
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockCandidate;
    }
  });

  useEffect(() => {
    if (candidate?.feedback) {
      setFeedback(candidate.feedback);
    }
    if (candidate?.favorite !== undefined) {
      setFavorite(candidate.favorite);
    }
  }, [candidate]);

  const handleExportPDF = () => {
    if (!candidate) return;
    
    try {
      generateCandidatePDF(candidate, feedback);
      toast({
        title: "PDF erfolgreich erstellt",
        description: "Die PDF-Datei wurde erfolgreich erstellt und heruntergeladen.",
      });
    } catch (error) {
      console.error("Fehler beim Erstellen der PDF:", error);
      toast({
        title: "Fehler beim Erstellen der PDF",
        description: "Es gab ein Problem beim Erstellen der PDF-Datei.",
        variant: "destructive",
      });
    }
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
    // In a real implementation, you would save this to Supabase
    toast({
      title: !favorite ? "Zu Favoriten hinzugefügt" : "Aus Favoriten entfernt",
      description: !favorite 
        ? "Dieser Kandidat wurde zu Ihren Favoriten hinzugefügt."
        : "Dieser Kandidat wurde aus Ihren Favoriten entfernt.",
    });
  };

  const handleSaveFeedback = () => {
    // In a real implementation, you would save this to Supabase
    toast({
      title: "Feedback gespeichert",
      description: "Das Feedback wurde erfolgreich gespeichert.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      case 'interview': return 'bg-purple-500';
      case 'hired': return 'bg-teal-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Abgeschlossen';
      case 'in-progress': return 'In Bearbeitung';
      case 'pending': return 'Ausstehend';
      case 'rejected': return 'Abgelehnt';
      case 'interview': return 'Interview';
      case 'hired': return 'Eingestellt';
      default: return status;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Fehler beim Laden der Kandidatendaten</h1>
            <p className="mb-4">Es ist ein Fehler aufgetreten. Der Kandidat konnte nicht gefunden werden.</p>
            <Button onClick={() => navigate('/candidates')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zur Übersicht
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/candidates')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Übersicht
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={toggleFavorite}
              className={favorite ? "text-yellow-500" : ""}
            >
              {favorite ? <Star className="h-5 w-5" /> : <StarOff className="h-5 w-5" />}
            </Button>
            
            <ProFeature>
              <Button 
                onClick={handleExportPDF}
                disabled={!isProOrHigher}
                className="bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet"
              >
                <FileText className="mr-2 h-4 w-4" />
                Als PDF exportieren
              </Button>
            </ProFeature>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : candidate ? (
          <>
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl font-bold">{candidate.name}</CardTitle>
                    <CardDescription className="text-lg">{candidate.position}</CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(candidate.status)} text-white px-3 py-1`}>
                    {getStatusLabel(candidate.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">E-Mail</p>
                    <p className="font-medium">{candidate.email}</p>
                    
                    <p className="text-sm text-muted-foreground mt-4 mb-1">Testdatum</p>
                    <p className="font-medium">{formatDate(candidate.date || '')}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Gesamt-Score</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-2xl font-bold ${
                        candidate.score >= 80 ? 'text-green-500' : 
                        candidate.score >= 60 ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {candidate.score}%
                      </span>
                    </div>
                    <Progress value={candidate.score} className={getScoreColor(candidate.score)} />
                    
                    {candidate.gptDetectionScore !== undefined && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground mb-1">KI-Erkennung</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-lg font-medium ${
                            candidate.gptDetectionScore <= 30 ? 'text-green-500' : 
                            candidate.gptDetectionScore <= 70 ? 'text-yellow-500' : 'text-red-500'
                          }`}>
                            {candidate.gptDetectionScore}%
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {candidate.gptDetectionScore <= 30 
                              ? '(Wahrscheinlich originaler Inhalt)' 
                              : candidate.gptDetectionScore <= 70 
                                ? '(Möglicherweise KI-unterstützt)' 
                                : '(Wahrscheinlich KI-generiert)'}
                          </span>
                        </div>
                        <Progress 
                          value={candidate.gptDetectionScore} 
                          className={
                            candidate.gptDetectionScore <= 30 ? 'bg-green-500' : 
                            candidate.gptDetectionScore <= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          } 
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {candidate.moduleScores && candidate.moduleScores.length > 0 && (
              <CandidateModuleScores moduleScores={candidate.moduleScores} />
            )}

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>HR-Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Geben Sie hier Ihr Feedback zum Kandidaten ein..."
                  className="min-h-[150px] mb-4"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <Button onClick={handleSaveFeedback}>Feedback speichern</Button>
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>
    </Layout>
  );
};

export default CandidateDetailPage;

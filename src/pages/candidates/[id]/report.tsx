
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CandidateReport from '@/components/candidate/CandidateReport';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ProFeature } from '@/components/tier';
import { generateCandidatePDF } from '@/utils/pdfUtils';
import { useToast } from '@/components/ui/use-toast';
import { CandidateData } from '@/types/chart';

// Mock data - in a real application, this would come from an API
const mockCandidateData: Record<string, CandidateData> = {
  '1': {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    position: 'UX Designer',
    status: 'completed',
    score: 87,
    date: '2023-11-15T10:30:00.000Z',
    moduleScores: [
      { name: 'UX Grundlagen', score: 92 },
      { name: 'Wireframing', score: 85 },
      { name: 'User Testing', score: 90 },
      { name: 'Visual Design', score: 82 }
    ],
    gptDetectionScore: 15,
    feedback: 'Sarah zeigt außergewöhnliche Fähigkeiten im Bereich UX Design mit einem starken Fokus auf Benutzerforschung und Problemlösung.'
  },
  '2': {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    position: 'Frontend Developer',
    status: 'in-progress',
    score: 62,
    date: '2023-12-03T14:15:00.000Z',
    moduleScores: [
      { name: 'JavaScript', score: 75 },
      { name: 'CSS & HTML', score: 80 },
      { name: 'React', score: 55 },
      { name: 'Testing', score: 40 }
    ],
    gptDetectionScore: 68
  },
  '3': {
    id: '3',
    name: 'Alex Rodriguez',
    email: 'alex@example.com',
    position: 'Product Manager',
    status: 'pending',
    score: 0,
    date: '2023-12-20T09:00:00.000Z'
  },
  '4': {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    position: 'Data Scientist',
    status: 'completed',
    score: 92,
    date: '2023-11-05T11:45:00.000Z',
    moduleScores: [
      { name: 'Datenanalyse', score: 95 },
      { name: 'Statistik', score: 90 },
      { name: 'Machine Learning', score: 94 },
      { name: 'Visualisierung', score: 88 }
    ],
    gptDetectionScore: 22,
    feedback: 'Emma hat hervorragende analytische Fähigkeiten und ein tiefes Verständnis für komplexe statistische Modelle.'
  },
  '5': {
    id: '5',
    name: 'David Park',
    email: 'david@example.com',
    position: 'Backend Developer',
    status: 'rejected',
    score: 45,
    date: '2023-10-18T15:30:00.000Z',
    moduleScores: [
      { name: 'Datenbankdesign', score: 35 },
      { name: 'API-Entwicklung', score: 50 },
      { name: 'Sicherheit', score: 42 },
      { name: 'Performance', score: 52 }
    ],
    gptDetectionScore: 75
  }
};

const CandidateReportPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real application, fetch candidate data from an API
  const candidate = id ? mockCandidateData[id] : undefined;

  const handleExportPDF = (feedback: string) => {
    if (!candidate) return;
    
    try {
      // Update feedback if provided
      const candidateWithFeedback = {
        ...candidate,
        feedback
      };
      
      // Generate and download the PDF
      generateCandidatePDF(candidateWithFeedback, feedback);
      
      toast({
        title: "PDF erfolgreich erstellt",
        description: "Der Kandidatenreport wurde als PDF heruntergeladen.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Fehler beim Erstellen des PDFs",
        description: "Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container max-w-6xl py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/candidates')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück
          </Button>
          <h1 className="text-2xl font-bold">Kandidatenreport</h1>
        </div>

        <ProFeature>
          {candidate ? (
            <CandidateReport 
              candidate={candidate} 
              onExportPDF={handleExportPDF} 
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-lg text-muted-foreground">
                Kandidat nicht gefunden
              </p>
              <Button
                onClick={() => navigate('/candidates')}
                className="mt-4"
              >
                Zurück zur Kandidatenliste
              </Button>
            </div>
          )}
        </ProFeature>
      </div>
    </Layout>
  );
};

export default CandidateReportPage;

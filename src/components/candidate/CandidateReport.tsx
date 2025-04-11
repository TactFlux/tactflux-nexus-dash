
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { CandidateData } from '@/types/chart';
import { formatDate } from '@/utils/dateUtils';

interface CandidateReportProps {
  candidate: CandidateData;
  onExportPDF: (feedback: string) => void;
}

const CandidateReport: React.FC<CandidateReportProps> = ({ candidate, onExportPDF }) => {
  const [feedback, setFeedback] = useState(candidate.feedback || '');

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getGptDetectionColor = (score?: number) => {
    if (!score) return 'bg-gray-300';
    if (score <= 30) return 'bg-green-500';
    if (score <= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full max-w-4xl mx-auto" id="candidate-report">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">Kandidatenreport</h1>
          <p className="text-muted-foreground">
            Erstellt am {formatDate(new Date().toISOString())}
          </p>
        </div>
        <div className="flex justify-end mb-4">
          <img 
            src="/lovable-uploads/79b93f56-97fe-416b-9625-4bf78b87f33f.png" 
            alt="TactFlux Logo" 
            className="h-12 object-contain" 
          />
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Kandidateninformation</CardTitle>
            <Badge className={`bg-${candidate.status === 'completed' ? 'green' : candidate.status === 'in-progress' ? 'blue' : candidate.status === 'pending' ? 'yellow' : 'red'}-500/20 text-${candidate.status === 'completed' ? 'green' : candidate.status === 'in-progress' ? 'blue' : candidate.status === 'pending' ? 'yellow' : 'red'}-500`}>
              {candidate.status === 'completed' ? 'Abgeschlossen' : 
               candidate.status === 'in-progress' ? 'In Bearbeitung' : 
               candidate.status === 'pending' ? 'Ausstehend' : 'Abgelehnt'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{candidate.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Position</p>
              <p className="font-medium">{candidate.position}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{candidate.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Testdatum</p>
              <p className="font-medium">{formatDate(candidate.date || new Date().toISOString())}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Testergebnisse</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">Gesamt-Score</p>
              <p className={`font-bold ${candidate.score >= 80 ? 'text-green-500' : candidate.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                {candidate.score}%
              </p>
            </div>
            <Progress value={candidate.score} className={getScoreColor(candidate.score)} />
          </div>

          {candidate.moduleScores && candidate.moduleScores.length > 0 && (
            <div className="space-y-4 mt-8">
              <h3 className="font-semibold">Modulergebnisse</h3>
              {candidate.moduleScores.map((module, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <p>{module.name}</p>
                    <p className={`font-mono ${module.score >= 80 ? 'text-green-500' : module.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                      {module.score}%
                    </p>
                  </div>
                  <Progress value={module.score} className={getScoreColor(module.score)} />
                </div>
              ))}
            </div>
          )}

          {typeof candidate.gptDetectionScore !== 'undefined' && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">GPT-Detektionswert</p>
                <p className={`font-bold ${candidate.gptDetectionScore <= 30 ? 'text-green-500' : candidate.gptDetectionScore <= 70 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {candidate.gptDetectionScore}%
                </p>
              </div>
              <Progress value={candidate.gptDetectionScore} className={getGptDetectionColor(candidate.gptDetectionScore)} />
              <p className="text-sm text-muted-foreground mt-2">
                {candidate.gptDetectionScore <= 30 
                  ? 'Hohe Wahrscheinlichkeit von originellem Inhalt' 
                  : candidate.gptDetectionScore <= 70 
                    ? 'Mögliche Verwendung von KI-Werkzeugen' 
                    : 'Hohe Wahrscheinlichkeit von KI-generiertem Inhalt'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>HR-Kommentar</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Geben Sie hier Ihren Kommentar zum Kandidaten ein..."
            className="min-h-[150px]"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end mt-6">
        <Button 
          onClick={() => onExportPDF(feedback)}
          className="bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet"
        >
          <FileText className="mr-2 h-4 w-4" />
          Als PDF exportieren
        </Button>
      </div>
    </div>
  );
};

export default CandidateReport;

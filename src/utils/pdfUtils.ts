
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CandidateData } from '@/types/chart';
import { formatDate } from './dateUtils';

const getScoreColor = (score: number) => {
  if (score >= 80) return '#10b981'; // green-500
  if (score >= 60) return '#f59e0b'; // yellow-500
  return '#ef4444'; // red-500
};

const getGptDetectionText = (score?: number) => {
  if (!score) return 'Nicht verfügbar';
  if (score <= 30) return 'Hohe Wahrscheinlichkeit von originellem Inhalt';
  if (score <= 70) return 'Mögliche Verwendung von KI-Werkzeugen';
  return 'Hohe Wahrscheinlichkeit von KI-generiertem Inhalt';
};

export const generateCandidatePDF = (candidate: CandidateData, feedback: string) => {
  // Create a new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  // Add TactFlux logo
  try {
    const img = new Image();
    img.src = '/lovable-uploads/79b93f56-97fe-416b-9625-4bf78b87f33f.png';
    doc.addImage(img, 'PNG', pageWidth - 60, margin, 40, 15);
  } catch (error) {
    console.error('Error adding logo:', error);
  }

  // Add title
  doc.setFontSize(24);
  doc.setTextColor(33, 33, 33);
  doc.text('Kandidatenreport', margin, margin + 10);

  // Add creation date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Erstellt am: ${formatDate(new Date().toISOString())}`, margin, margin + 18);

  // Add candidate information
  doc.setFontSize(12);
  doc.setTextColor(33, 33, 33);
  doc.text('Kandidateninformation', margin, margin + 30);
  
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, margin + 32, pageWidth - margin, margin + 32);

  const candidateInfoY = margin + 40;
  doc.setFontSize(10);
  
  // Left column
  doc.setTextColor(100, 100, 100);
  doc.text('Name:', margin, candidateInfoY);
  doc.text('Email:', margin, candidateInfoY + 10);
  
  doc.setTextColor(33, 33, 33);
  doc.setFont(undefined, 'bold');
  doc.text(candidate.name, margin + 30, candidateInfoY);
  doc.setFont(undefined, 'normal');
  doc.text(candidate.email, margin + 30, candidateInfoY + 10);
  
  // Right column
  doc.setTextColor(100, 100, 100);
  doc.text('Position:', pageWidth / 2, candidateInfoY);
  doc.text('Testdatum:', pageWidth / 2, candidateInfoY + 10);
  
  doc.setTextColor(33, 33, 33);
  doc.setFont(undefined, 'bold');
  doc.text(candidate.position, pageWidth / 2 + 30, candidateInfoY);
  doc.setFont(undefined, 'normal');
  doc.text(formatDate(candidate.date || new Date().toISOString()), pageWidth / 2 + 30, candidateInfoY + 10);
  
  // Add test results
  const resultsY = candidateInfoY + 30;
  doc.setFontSize(12);
  doc.setTextColor(33, 33, 33);
  doc.text('Testergebnisse', margin, resultsY);
  
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, resultsY + 2, pageWidth - margin, resultsY + 2);
  
  // Score bar
  const scoreY = resultsY + 15;
  doc.setFontSize(10);
  doc.text('Gesamt-Score:', margin, scoreY);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(getScoreColor(candidate.score).replace('#', '0x'));
  doc.text(`${candidate.score}%`, pageWidth - margin - 10, scoreY, { align: 'right' });
  doc.setFont(undefined, 'normal');
  
  // Draw score bar
  const barY = scoreY + 5;
  const barHeight = 5;
  doc.setDrawColor(220, 220, 220);
  doc.setFillColor(220, 220, 220);
  doc.roundedRect(margin, barY, contentWidth, barHeight, 1, 1, 'F');
  
  doc.setFillColor(getScoreColor(candidate.score).replace('#', '0x'));
  const scoreWidth = (candidate.score / 100) * contentWidth;
  doc.roundedRect(margin, barY, scoreWidth, barHeight, 1, 1, 'F');
  
  // Module scores
  let currentY = barY + 20;
  if (candidate.moduleScores && candidate.moduleScores.length > 0) {
    doc.setFontSize(11);
    doc.setTextColor(33, 33, 33);
    doc.text('Modulergebnisse', margin, currentY);
    currentY += 10;
    
    candidate.moduleScores.forEach((module, index) => {
      // Module name and score
      doc.setFontSize(9);
      doc.setTextColor(70, 70, 70);
      doc.text(module.name, margin, currentY);
      doc.setTextColor(getScoreColor(module.score).replace('#', '0x'));
      doc.setFont(undefined, 'bold');
      doc.text(`${module.score}%`, pageWidth - margin - 10, currentY, { align: 'right' });
      doc.setFont(undefined, 'normal');
      
      // Draw module score bar
      currentY += 5;
      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(220, 220, 220);
      doc.roundedRect(margin, currentY, contentWidth, 3, 1, 1, 'F');
      
      doc.setFillColor(getScoreColor(module.score).replace('#', '0x'));
      const moduleScoreWidth = (module.score / 100) * contentWidth;
      doc.roundedRect(margin, currentY, moduleScoreWidth, 3, 1, 1, 'F');
      
      currentY += 10;
    });
  }
  
  // GPT Detection Score
  if (typeof candidate.gptDetectionScore !== 'undefined') {
    currentY += 5;
    doc.setFontSize(10);
    doc.setTextColor(33, 33, 33);
    doc.text('GPT-Detektionswert:', margin, currentY);
    doc.setFont(undefined, 'bold');
    const gptColor = candidate.gptDetectionScore <= 30 ? '#10b981' : 
                     candidate.gptDetectionScore <= 70 ? '#f59e0b' : '#ef4444';
    doc.setTextColor(gptColor.replace('#', '0x'));
    doc.text(`${candidate.gptDetectionScore}%`, pageWidth - margin - 10, currentY, { align: 'right' });
    doc.setFont(undefined, 'normal');
    
    // Draw GPT detection bar
    currentY += 5;
    doc.setDrawColor(220, 220, 220);
    doc.setFillColor(220, 220, 220);
    doc.roundedRect(margin, currentY, contentWidth, barHeight, 1, 1, 'F');
    
    doc.setFillColor(gptColor.replace('#', '0x'));
    const gptScoreWidth = (candidate.gptDetectionScore / 100) * contentWidth;
    doc.roundedRect(margin, currentY, gptScoreWidth, barHeight, 1, 1, 'F');
    
    // Add GPT detection explanation
    currentY += 8;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(getGptDetectionText(candidate.gptDetectionScore), margin, currentY);
  }
  
  // HR comment
  currentY += 20;
  doc.setFontSize(12);
  doc.setTextColor(33, 33, 33);
  doc.text('HR-Kommentar', margin, currentY);
  
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);
  
  currentY += 10;
  doc.setFontSize(10);
  doc.setTextColor(70, 70, 70);
  
  // Split feedback into lines
  const textLines = doc.splitTextToSize(feedback || 'Kein Kommentar vorhanden.', contentWidth);
  doc.text(textLines, margin, currentY);
  
  // Add status footer
  currentY = doc.internal.pageSize.getHeight() - 20;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(`Status: ${
    candidate.status === 'completed' ? 'Abgeschlossen' : 
    candidate.status === 'in-progress' ? 'In Bearbeitung' : 
    candidate.status === 'pending' ? 'Ausstehend' : 'Abgelehnt'
  }`, margin, currentY);
  
  // Save the PDF
  doc.save(`Kandidatenreport_${candidate.name.replace(/\s+/g, '_')}.pdf`);
};

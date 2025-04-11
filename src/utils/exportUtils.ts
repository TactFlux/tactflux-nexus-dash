
import { SimulationData } from '@/types/chart';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// CSV Export Funktion
export const exportToCSV = (data: any[], filename: string) => {
  // Bestimme die Headers aus dem ersten Datensatz
  const headers = Object.keys(data[0] || {}).filter(key => 
    typeof data[0][key] !== 'object' && key !== 'chartData'
  );
  
  // Erstelle die CSV-Zeilen
  const csvRows = [
    // Header-Zeile
    headers.join(','),
    // Daten-Zeilen
    ...data.map(row => 
      headers.map(header => {
        const cell = row[header];
        // Entferne Kommas aus Zellen und füge Anführungszeichen hinzu, wenn nötig
        const formatted = cell !== undefined && cell !== null ? String(cell) : '';
        return formatted.includes(',') ? `"${formatted}"` : formatted;
      }).join(',')
    )
  ];
  
  // Verbinde alle Zeilen mit Zeilenumbrüchen
  const csvString = csvRows.join('\n');
  
  // Erstelle einen Blob und starte den Download
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}.csv`);
};

// PDF Export Funktion für Simulationen
export const exportToPDF = (data: SimulationData[], filename: string) => {
  // Erstelle ein neues PDF-Dokument
  const doc = new jsPDF();
  
  // Füge einen Titel hinzu
  doc.setFontSize(18);
  doc.text('TactFlux - Simulationsübersicht', 14, 22);
  
  // Füge das Datum hinzu
  doc.setFontSize(10);
  doc.text(`Erstellt am: ${new Date().toLocaleDateString('de-DE')}`, 14, 30);
  
  // Bereite die Tabellendaten vor
  const tableHeaders = [['Titel', 'Datum', 'Status', 'Kandidaten', 'Score']];
  const tableData = data.map(sim => [
    sim.title,
    new Date(sim.date).toLocaleDateString('de-DE'),
    sim.status === 'completed' ? 'Abgeschlossen' : 
      sim.status === 'in-progress' ? 'In Bearbeitung' : 'Geplant',
    String(sim.candidates),
    sim.score ? `${sim.score}%` : '-'
  ]);
  
  // Füge die Tabelle hinzu
  (doc as any).autoTable({
    head: tableHeaders,
    body: tableData,
    startY: 40,
    styles: { fontSize: 10, cellPadding: 5 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] }
  });
  
  // Speichere das PDF
  doc.save(`${filename}.pdf`);
};

// PDF Export Funktion für Kandidaten
export const exportCandidatesToPDF = (candidates: any[], filename: string) => {
  // Erstelle ein neues PDF-Dokument
  const doc = new jsPDF();
  
  // Füge einen Titel hinzu
  doc.setFontSize(18);
  doc.text('TactFlux - Kandidatenübersicht', 14, 22);
  
  // Füge das Datum hinzu
  doc.setFontSize(10);
  doc.text(`Erstellt am: ${new Date().toLocaleDateString('de-DE')}`, 14, 30);
  
  // Bereite die Tabellendaten vor
  const tableHeaders = [['Name', 'E-Mail', 'Position', 'Status', 'Score']];
  const tableData = candidates.map(candidate => [
    candidate.name,
    candidate.email,
    candidate.position,
    candidate.status === 'completed' ? 'Abgeschlossen' : 
      candidate.status === 'in-progress' ? 'In Bearbeitung' : 
      candidate.status === 'pending' ? 'Ausstehend' : 'Abgelehnt',
    candidate.score > 0 ? `${candidate.score}%` : '-'
  ]);
  
  // Füge die Tabelle hinzu
  (doc as any).autoTable({
    head: tableHeaders,
    body: tableData,
    startY: 40,
    styles: { fontSize: 10, cellPadding: 5 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] }
  });
  
  // Speichere das PDF
  doc.save(`${filename}.pdf`);
};

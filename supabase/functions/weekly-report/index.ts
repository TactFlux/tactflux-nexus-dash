
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { jsPDF } from "https://esm.sh/jspdf@2.5.1";
import { autoTable } from "https://esm.sh/jspdf-autotable@3.7.1";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Umgebungsvariablen
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

// Supabase Client initialisieren
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Hilfsfunktion: Formatiert ein Datum
const formatDate = (date: Date): string => {
  return date.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// Hilfsfunktion: Gibt den Namen für eine statusbeschreibung zurück
const getStatusText = (status: string): string => {
  switch (status) {
    case "completed":
      return "Abgeschlossen";
    case "in-progress":
      return "In Bearbeitung";
    case "pending":
      return "Ausstehend";
    default:
      return "Abgelehnt";
  }
};

// Hilfsfunktion: Erstellt das PDF
const generatePDF = (data: any[], fromDate: string, toDate: string): Uint8Array => {
  const doc = new jsPDF();
  
  // Logo und Titel
  // Wir können hier nur Text verwenden, da wir kein Bild in Deno haben
  doc.setFontSize(22);
  doc.setTextColor(41, 128, 185);
  doc.text("TactFlux", 14, 20);
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("Wochenreport", 14, 30);

  // Datumsbereich
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Zeitraum: ${fromDate} bis ${toDate}`, 14, 40);
  
  // Tabellendaten vorbereiten
  const tableColumn = [
    "Name",
    "Position",
    "Score",
    "Status",
    "GPT-Detektion"
  ];
  
  const tableRows = data.map((item) => [
    // Nur Vornamen anzeigen (DSGVO-konform)
    item.name?.split(" ")[0] || "N/A",
    item.position || "N/A",
    item.score ? `${item.score}%` : "-",
    getStatusText(item.status),
    item.gptDetectionScore !== undefined ? `${item.gptDetectionScore}%` : "-"
  ]);
  
  // Tabelle hinzufügen
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 50,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  });
  
  // Footer hinzufügen
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    const today = new Date();
    const generatedText = `Generiert am ${formatDate(today)} automatisch`;
    doc.text(
      generatedText,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }
  
  return doc.output("arraybuffer");
};

// Hilfsfunktion: Erstellt CSV-Daten
const generateCSV = (data: any[]): string => {
  // Header
  const headers = ["Name", "Position", "Score", "Status", "GPT-Detektion", "Datum"];
  const csvRows = [headers.join(",")];
  
  // Zeilen
  for (const item of data) {
    const row = [
      // DSGVO-konform: Nur Vorname
      `"${item.name?.split(" ")[0] || "N/A"}"`,
      `"${item.position || "N/A"}"`,
      item.score ? item.score : "",
      `"${getStatusText(item.status)}"`,
      item.gptDetectionScore !== undefined ? item.gptDetectionScore : "",
      item.date ? formatDate(new Date(item.date)) : ""
    ];
    csvRows.push(row.join(","));
  }
  
  return csvRows.join("\n");
};

// Funktion zum Versenden der E-Mails
const sendEmailReports = async (
  recipients: any[],
  pdfData: Uint8Array,
  csvData: string,
  stats: { total: number, completed: number },
  reportDate: string
) => {
  // In einer realen Anwendung würde hier die E-Mail-Versand-Logik stehen
  // z.B. mit Resend, SendGrid, etc.
  console.log(`Sending report to ${recipients.length} recipients`);
  
  // Speichern Sie das Versand-Log
  await supabase.from("report_delivery_logs").insert({
    report_date: new Date().toISOString(),
    recipients_count: recipients.length,
    tests_count: stats.total,
    completed_tests_count: stats.completed
  });
  
  // Hier würde in einer echten Implementierung der E-Mail-Versand erfolgen
  // Für dieses Beispiel loggen wir nur die Informationen
  return {
    sent: recipients.length,
    testStats: stats,
    reportDate
  };
};

// Die Hauptfunktion für den wöchentlichen Report
const generateWeeklyReport = async () => {
  try {
    // Datumsbereich der letzten 7 Tage bestimmen
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - 7);
    
    console.log(`Generating report from ${fromDate.toISOString()} to ${toDate.toISOString()}`);
    
    // Abrufen aller Tests der letzten 7 Tage (mock data in diesem Beispiel)
    // In einer realen Anwendung würden wir Daten aus einer Tabelle abrufen
    // Hier simulieren wir den Abruf mit mock-Daten
    const { data: testData, error: testError } = {
      data: [
        {
          id: "1",
          name: "Sarah Johnson",
          email: "sarah@example.com",
          position: "UX Designer",
          status: "completed",
          score: 87,
          date: new Date(2023, 11, 15).toISOString(),
          gptDetectionScore: 15
        },
        {
          id: "2",
          name: "Michael Chen",
          email: "michael@example.com",
          position: "Frontend Developer",
          status: "completed",
          score: 62,
          date: new Date(2023, 12, 3).toISOString(),
          gptDetectionScore: 68
        },
        {
          id: "4",
          name: "Emma Wilson",
          email: "emma@example.com",
          position: "Data Scientist",
          status: "completed",
          score: 92,
          date: new Date(2023, 11, 5).toISOString(),
          gptDetectionScore: 22
        },
      ],
      error: null
    };
    
    if (testError) {
      throw new Error(`Error fetching test data: ${testError.message}`);
    }
    
    // Extrahiere nur die abgeschlossenen Tests und sortiere nach Score (absteigend)
    const completedTests = testData
      .filter(test => test.status === "completed")
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Top 10
    
    const stats = {
      total: testData.length,
      completed: completedTests.length
    };
    
    // Reales Datum im Format DD.MM.YYYY
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);
    
    // Report-Dateien generieren
    const pdfData = generatePDF(completedTests, formattedFromDate, formattedToDate);
    const csvData = generateCSV(completedTests);
    
    // Empfänger abrufen
    const { data: recipients, error: recipientsError } = await supabase
      .from("report_recipients")
      .select("*")
      .eq("active", true);
    
    if (recipientsError) {
      throw new Error(`Error fetching recipients: ${recipientsError.message}`);
    }
    
    // E-Mails senden
    const result = await sendEmailReports(
      recipients || [],
      pdfData,
      csvData,
      stats,
      `${formattedFromDate} - ${formattedToDate}`
    );
    
    return result;
  } catch (error) {
    console.error("Error generating weekly report:", error);
    throw error;
  }
};

// Handler für die Edge-Funktion
serve(async (req) => {
  // CORS-Anfragen behandeln
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Nur POST-Anfragen zulassen
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { 
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
  
  try {
    // Report generieren
    const result = await generateWeeklyReport();
    
    // Erfolgreiche Antwort zurückgeben
    return new Response(
      JSON.stringify(result),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    // Fehler behandeln
    console.error("Error in weekly report function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});

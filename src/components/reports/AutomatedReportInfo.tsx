
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock, MailCheck, BarChart3 } from 'lucide-react';

const getNextFriday = (): Date => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sonntag, 5 = Freitag
  const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 5 + (7 - dayOfWeek);
  
  const nextFriday = new Date(now);
  nextFriday.setDate(now.getDate() + daysUntilFriday);
  nextFriday.setHours(9, 0, 0, 0); // 09:00 Uhr UTC
  
  return nextFriday;
};

const formatDateTime = (date: Date): string => {
  return date.toLocaleString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const AutomatedReportInfo: React.FC<{recipientCount: number}> = ({ recipientCount }) => {
  const nextRunDate = getNextFriday();
  const formattedNextRun = formatDateTime(nextRunDate);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <CalendarClock className="h-5 w-5 mr-2 text-tactflux-turquoise" />
          Automatisiertes Wochenreporting
        </CardTitle>
        <CardDescription>
          Jeden Freitag um 09:00 Uhr werden Reports automatisch erstellt und versendet
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="bg-muted/50 p-2 rounded">
              <MailCheck className="h-5 w-5 text-tactflux-violet" />
            </div>
            <div>
              <p className="text-sm font-medium">Aktive Empfänger</p>
              <p className="text-2xl font-bold">{recipientCount}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-muted/50 p-2 rounded">
              <BarChart3 className="h-5 w-5 text-tactflux-violet" />
            </div>
            <div>
              <p className="text-sm font-medium">Berichtsumfang</p>
              <p className="text-sm text-muted-foreground">Tests der letzten 7 Tage</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">Nächster geplanter Versand:</p>
          <p className="font-medium">{formattedNextRun} Uhr</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomatedReportInfo;

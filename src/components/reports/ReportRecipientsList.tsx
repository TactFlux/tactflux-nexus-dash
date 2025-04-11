
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface ReportRecipient {
  id: string;
  email: string;
  company_name: string | null;
  active: boolean;
  created_at: string;
}

interface ReportRecipientsListProps {
  recipients: ReportRecipient[];
  onRecipientDeleted: () => void;
}

const ReportRecipientsList: React.FC<ReportRecipientsListProps> = ({
  recipients,
  onRecipientDeleted
}) => {
  const { toast } = useToast();

  const handleDelete = async (id: string, email: string) => {
    try {
      const { error } = await supabase
        .from('report_recipients')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Empfänger entfernt",
        description: `${email} wurde von der Empfängerliste entfernt.`,
      });

      onRecipientDeleted();
    } catch (error) {
      console.error('Error deleting recipient:', error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Der Empfänger konnte nicht entfernt werden.",
      });
    }
  };

  if (recipients.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">Keine Empfänger vorhanden.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>E-Mail</TableHead>
          <TableHead>Firma</TableHead>
          <TableHead>Hinzugefügt am</TableHead>
          <TableHead className="w-[80px]">Aktionen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recipients.map((recipient) => (
          <TableRow key={recipient.id}>
            <TableCell>{recipient.email}</TableCell>
            <TableCell>{recipient.company_name || '-'}</TableCell>
            <TableCell>
              {new Date(recipient.created_at).toLocaleDateString('de-DE')}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(recipient.id, recipient.email)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReportRecipientsList;


import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TeamMember } from '@/types/team';
import { AlertTriangle } from 'lucide-react';

interface RemoveUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: TeamMember;
  onRemove: (memberId: string) => void;
}

const RemoveUserDialog: React.FC<RemoveUserDialogProps> = ({
  open,
  onOpenChange,
  member,
  onRemove,
}) => {
  const handleRemove = () => {
    onRemove(member.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
            Benutzer entfernen
          </DialogTitle>
          <DialogDescription>
            Möchten Sie diesen Benutzer wirklich aus Ihrem Team entfernen?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="p-4 border border-border rounded-md">
            <p className="font-medium">{member.name}</p>
            <p className="text-sm text-muted-foreground">{member.email}</p>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Der Benutzer verliert sofort den Zugriff auf Ihr TactFlux-Dashboard und alle damit verbundenen Daten.
          </p>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Abbrechen
          </Button>
          <Button 
            variant="destructive"
            onClick={handleRemove}
          >
            Benutzer entfernen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveUserDialog;

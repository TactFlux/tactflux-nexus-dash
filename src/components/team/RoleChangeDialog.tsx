
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TeamMember, UserRole } from '@/types/team';
import { useState } from 'react';

interface RoleChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: TeamMember;
  onChangeRole: (memberId: string, newRole: UserRole) => void;
}

const RoleChangeDialog: React.FC<RoleChangeDialogProps> = ({
  open,
  onOpenChange,
  member,
  onChangeRole,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(member.role);

  const handleSubmit = () => {
    onChangeRole(member.id, selectedRole);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rolle ändern</DialogTitle>
          <DialogDescription>
            Ändern Sie die Rolle von {member.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Benutzer</p>
            <div className="text-sm text-muted-foreground">
              {member.name} ({member.email})
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Neue Rolle</p>
            <Select 
              value={selectedRole} 
              onValueChange={(value: UserRole) => setSelectedRole(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Rolle auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="hr">HR Manager</SelectItem>
                <SelectItem value="viewer">Betrachter</SelectItem>
              </SelectContent>
            </Select>
            
            <p className="text-xs text-muted-foreground mt-2">
              {selectedRole === 'admin' && 
                "Administratoren haben vollständigen Zugriff auf alle Funktionen, einschließlich der Einladung neuer Benutzer und der Verwaltung von Unternehmenseinstellungen."}
              {selectedRole === 'hr' && 
                "HR-Manager können Kandidaten verwalten, Bewerber zur Shortlist hinzufügen und Berichte exportieren."}
              {selectedRole === 'viewer' && 
                "Betrachter haben nur Lesezugriff auf Kandidaten und Berichte."}
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Abbrechen
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-gradient-to-r from-[var(--company-primary)] to-[var(--company-accent)]"
          >
            Rolle ändern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoleChangeDialog;

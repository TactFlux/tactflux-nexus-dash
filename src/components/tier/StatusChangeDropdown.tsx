
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUserTier } from "@/contexts/UserTierContext";

interface StatusChangeDropdownProps {
  currentStatus: string;
  candidateId: string;
  onStatusChange: (id: string, newStatus: string) => void;
}

const StatusChangeDropdown = ({ currentStatus, candidateId, onStatusChange }: StatusChangeDropdownProps) => {
  const { isProOrHigher } = useUserTier();
  const { toast } = useToast();

  const statusOptions = [
    { value: 'pending', label: 'Ausstehend' },
    { value: 'interview', label: 'Interview' },
    { value: 'hired', label: 'Eingestellt' },
    { value: 'rejected', label: 'Abgelehnt' },
  ];

  const handleStatusChange = (status: string) => {
    if (!isProOrHigher) {
      toast({
        title: "Nur Pro oder Enterprise",
        description: "Status-Änderungen sind nur für Pro- oder Enterprise-Nutzer verfügbar",
        variant: "destructive"
      });
      return;
    }

    onStatusChange(candidateId, status);
    toast({
      title: "Status aktualisiert",
      description: `Der Status wurde erfolgreich auf "${statusOptions.find(opt => opt.value === status)?.label}" geändert.`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 data-[state=open]:bg-muted">
          Status ändern
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px] bg-tactflux-gray border-white/10">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            className={`${currentStatus === option.value ? 'bg-white/5' : ''} cursor-pointer`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusChangeDropdown;

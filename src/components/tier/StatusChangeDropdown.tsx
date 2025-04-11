
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUserTier } from "@/contexts/UserTierContext";
import { cn } from "@/lib/utils";

interface StatusChangeDropdownProps {
  currentStatus: string;
  candidateId: string;
  onStatusChange: (id: string, newStatus: string) => void;
}

const StatusChangeDropdown = ({ currentStatus, candidateId, onStatusChange }: StatusChangeDropdownProps) => {
  const { isProOrHigher } = useUserTier();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      onStatusChange(candidateId, status);
      setIsLoading(false);
      
      toast({
        title: "Status aktualisiert",
        description: `Der Status wurde erfolgreich auf "${statusOptions.find(opt => opt.value === status)?.label}" geändert.`,
        icon: <Check className="h-4 w-4 text-green-500" />
      });
    }, 600);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "h-8 data-[state=open]:bg-muted transition-all duration-300 group",
            "hover:bg-muted/80 hover:scale-[1.02] active:scale-[0.98]",
            isHovering && "ring-1 ring-muted-foreground/20"
          )}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
              <span>Wird aktualisiert...</span>
            </>
          ) : (
            <>
              Status ändern
              <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[160px] bg-tactflux-gray border-white/10 animate-fade-in shadow-lg"
      >
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:bg-white/10 focus:bg-white/15 hover:scale-[1.02] active:scale-[0.98]",
              currentStatus === option.value && "bg-white/5 text-tactflux-turquoise"
            )}
          >
            {currentStatus === option.value && (
              <Check className="mr-2 h-4 w-4 text-tactflux-turquoise" />
            )}
            {option.label}
          </DropdownMenuItem>
        ))}
        
        {!isProOrHigher && (
          <div className="px-2 py-1.5 text-xs text-tactflux-pink flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            Benötigt Pro-Plan
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusChangeDropdown;

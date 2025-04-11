
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, FileText, FileType } from 'lucide-react';
import { useUserTier } from '@/contexts/UserTierContext';
import { useToast } from '@/components/ui/use-toast';

interface ExportButtonsProps {
  onExportCSV: () => void;
  onExportPDF: () => void;
  label?: string;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ 
  onExportCSV, 
  onExportPDF, 
  label = "Exportieren" 
}) => {
  const { isProOrHigher, isEnterprise } = useUserTier();
  const { toast } = useToast();

  const handleProFeatureClick = () => {
    if (!isProOrHigher) {
      toast({
        title: "Eingeschränkte Funktion",
        description: "Diese Funktion ist nur für Pro- und Enterprise-Benutzer verfügbar.",
        variant: "destructive"
      });
      return;
    }
    onExportCSV();
  };

  const handleEnterpriseFeatureClick = () => {
    if (!isEnterprise) {
      toast({
        title: "Eingeschränkte Funktion",
        description: "PDF-Export ist nur für Enterprise-Benutzer verfügbar.",
        variant: "destructive"
      });
      return;
    }
    onExportPDF();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={handleProFeatureClick}
          className={!isProOrHigher ? "text-muted-foreground" : ""}
        >
          <FileType className="h-4 w-4 mr-2" />
          Als CSV exportieren
          {!isProOrHigher && <span className="ml-2 text-xs">(Pro)</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleEnterpriseFeatureClick}
          className={!isEnterprise ? "text-muted-foreground" : ""}
        >
          <FileText className="h-4 w-4 mr-2" />
          Als PDF exportieren
          {!isEnterprise && <span className="ml-2 text-xs">(Enterprise)</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButtons;

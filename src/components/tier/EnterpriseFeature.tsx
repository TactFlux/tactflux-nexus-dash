
import React, { ReactNode } from 'react';
import { useUserTier } from '@/contexts/UserTierContext';
import { Card, CardContent } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface EnterpriseFeatureProps {
  children: ReactNode;
  lockMessage?: string;
}

const EnterpriseFeature: React.FC<EnterpriseFeatureProps> = ({ 
  children, 
  lockMessage = "Diese Funktion ist nur für Enterprise-Benutzer verfügbar"
}) => {
  const { isEnterprise, isLoading } = useUserTier();
  const { user } = useAuth();
  
  // For debugging purposes
  console.log('EnterpriseFeature check:', { 
    isEnterprise, 
    isLoading, 
    userRole: user?.role,
    companyPlan: user?.company?.plan 
  });

  if (isLoading) {
    return <div className="animate-pulse bg-muted h-24 rounded-md"></div>;
  }

  // Check both from UserTier context and directly from user data
  const hasEnterpriseAccess = isEnterprise || 
                             (user?.role === 'admin') || 
                             (user?.company?.plan === 'enterprise');

  if (!hasEnterpriseAccess) {
    return (
      <Card className="bg-muted/30 border-dashed relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 bg-muted/80 backdrop-blur-[1px] z-10">
          <Lock className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center px-6">{lockMessage}</p>
        </div>
        <CardContent className="opacity-30 p-6">
          {children}
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};

export default EnterpriseFeature;

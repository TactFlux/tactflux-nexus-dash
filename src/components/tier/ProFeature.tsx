
import React, { ReactNode } from 'react';
import { useUserTier } from '@/contexts/UserTierContext';
import { Card, CardContent } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ProFeatureProps {
  children: ReactNode;
  lockMessage?: string;
}

const ProFeature: React.FC<ProFeatureProps> = ({ 
  children, 
  lockMessage = "Diese Funktion ist nur für Pro- und Enterprise-Benutzer verfügbar"
}) => {
  const { isProOrHigher, isLoading } = useUserTier();
  const { user } = useAuth();
  
  // For debugging
  console.log('ProFeature check:', { 
    isProOrHigher, 
    isLoading, 
    userRole: user?.role,
    companyPlan: user?.company?.plan 
  });

  if (isLoading) {
    return <div className="animate-pulse bg-muted h-24 rounded-md"></div>;
  }

  // Check both from UserTier context and directly from user data
  const hasProAccess = isProOrHigher || 
                      (user?.role === 'admin' || user?.role === 'hr') || 
                      (user?.company?.plan === 'pro' || user?.company?.plan === 'enterprise');

  if (!hasProAccess) {
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

export default ProFeature;

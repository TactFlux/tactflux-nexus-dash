
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle } from 'lucide-react';

interface PlanFeatureProps {
  children: React.ReactNode;
  requiredPlan: 'free' | 'pro' | 'enterprise';
  fallback?: React.ReactNode;
}

const PlanFeature: React.FC<PlanFeatureProps> = ({ 
  children, 
  requiredPlan, 
  fallback 
}) => {
  const { user } = useAuth();
  
  const planLevels = {
    'free': 0,
    'pro': 1,
    'enterprise': 2
  };
  
  // If no user or company, don't render anything
  if (!user || !user.company) {
    return null;
  }
  
  const userPlan = user.company.plan || 'free';
  const userPlanLevel = planLevels[userPlan];
  const requiredPlanLevel = planLevels[requiredPlan];
  
  // Check if user has access to this feature
  if (userPlanLevel >= requiredPlanLevel) {
    return <>{children}</>;
  }
  
  // If fallback is provided, render it instead
  if (fallback) {
    return <>{fallback}</>;
  }
  
  // Default fallback for when no custom fallback is provided
  return (
    <div className="p-4 border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 rounded-md">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-amber-800 dark:text-amber-400">
            {requiredPlan === 'pro' ? 'Pro' : 'Enterprise'} Feature
          </h4>
          <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">
            Diese Funktion ist nur im {requiredPlan === 'pro' ? 'Pro' : 'Enterprise'} Plan verfügbar.
            Aktualisieren Sie Ihren Plan, um Zugriff zu erhalten.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanFeature;

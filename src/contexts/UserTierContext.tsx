
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

// Definiere die möglichen Benutzerrollen
export type UserRole = 'basic' | 'pro' | 'enterprise';

// Interface für den Context-Wert
interface UserTierContextType {
  userRole: UserRole;
  isProOrHigher: boolean;
  isEnterprise: boolean;
  isLoading: boolean;
}

// Erstelle den Context mit Default-Werten
const UserTierContext = createContext<UserTierContextType>({
  userRole: 'basic',
  isProOrHigher: false,
  isEnterprise: false,
  isLoading: true,
});

// Hook zum Verwenden des Contexts
export const useUserTier = () => useContext(UserTierContext);

// Props für den Provider
interface UserTierProviderProps {
  children: ReactNode;
}

// Dieses Mapping wird verwendet, um vom "plan" im Unternehmen auf die UserRole zu mappen
const planToRoleMapping = {
  'free': 'basic' as UserRole,
  'pro': 'pro' as UserRole,
  'enterprise': 'enterprise' as UserRole
};

// Provider-Komponente
export const UserTierProvider: React.FC<UserTierProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('basic');
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    // Wenn der Auth-Loading-Status beendet ist und Benutzerdaten vorhanden sind
    if (!authLoading) {
      if (user?.company?.plan) {
        // Konvertiere den Unternehmensplan in eine UserRole
        const mappedRole = planToRoleMapping[user.company.plan as 'free' | 'pro' | 'enterprise'] || 'basic';
        setUserRole(mappedRole);
      } else if (user?.role) {
        // Fallback zur Benutzerrolle, wenn kein Unternehmensplan vorhanden ist
        setUserRole(user.role as UserRole);
      } else {
        // Standardmäßig auf basic setzen
        setUserRole('basic');
      }
      setIsLoading(false);
    }
  }, [user, authLoading]);

  // Berechnete Eigenschaften
  const isProOrHigher = userRole === 'pro' || userRole === 'enterprise';
  const isEnterprise = userRole === 'enterprise';

  return (
    <UserTierContext.Provider
      value={{
        userRole,
        isProOrHigher,
        isEnterprise,
        isLoading
      }}
    >
      {children}
    </UserTierContext.Provider>
  );
};

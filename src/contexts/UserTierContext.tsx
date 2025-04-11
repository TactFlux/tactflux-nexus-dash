
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

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

// Provider-Komponente
export const UserTierProvider: React.FC<UserTierProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('basic');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lade die Benutzerrolle aus dem sessionStorage oder localStorage
    const loadUserRole = () => {
      try {
        const adminData = localStorage.getItem('tactflux-admin');
        
        if (adminData) {
          const parsed = JSON.parse(adminData);
          // Wir lesen die Rolle aus dem gespeicherten Admin-Objekt
          // Falls keine Rolle vorhanden ist, verwenden wir 'basic' als Standard
          const role = parsed.role || 'basic';
          setUserRole(role as UserRole);
        } else {
          setUserRole('basic');
        }
      } catch (error) {
        console.error('Fehler beim Laden der Benutzerrolle:', error);
        setUserRole('basic');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserRole();
  }, []);

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

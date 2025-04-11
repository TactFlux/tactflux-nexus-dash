
import { useState, useEffect } from 'react';

export interface Company {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  logoUrl?: string;
  primaryColor?: string;
  accentColor?: string;
  welcomeMessage?: string;
}

export interface User {
  id: string;
  isAdmin: boolean;
  email?: string;
  role: 'admin' | 'user';
  companyId: string;
  company?: Company;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

export const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null
  });

  useEffect(() => {
    // Check for auth in localStorage
    const checkAuth = () => {
      const adminData = localStorage.getItem('tactflux-admin');
      
      if (adminData) {
        try {
          const parsed = JSON.parse(adminData);
          setAuthState({
            isAuthenticated: !!parsed.isAdmin,
            isLoading: false,
            user: {
              id: parsed.id || 'default-user-id',
              isAdmin: !!parsed.isAdmin,
              email: parsed.email || '',
              role: parsed.role || 'admin',
              companyId: parsed.companyId || '',
              company: parsed.company || undefined
            }
          });
        } catch (error) {
          // Invalid JSON in localStorage
          localStorage.removeItem('tactflux-admin');
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            user: null
          });
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null
        });
      }
    };

    checkAuth();
  }, []);

  return authState;
};

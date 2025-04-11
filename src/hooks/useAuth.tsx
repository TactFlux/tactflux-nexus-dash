
import { useState, useEffect } from 'react';

interface User {
  id: string;
  isAdmin: boolean;
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
              isAdmin: !!parsed.isAdmin
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

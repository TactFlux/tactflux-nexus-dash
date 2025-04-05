
import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
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
          });
        } catch (error) {
          // Invalid JSON in localStorage
          localStorage.removeItem('tactflux-admin');
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  return authState;
};

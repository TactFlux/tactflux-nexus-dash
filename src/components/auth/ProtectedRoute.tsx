
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles = ['admin', 'hr', 'viewer'] 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show loading state while checking authentication
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet"></div>
          <p className="mt-4 text-foreground">Lädt...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role
  const hasRequiredRole = user && requiredRoles.includes(user.role);
  
  if (!hasRequiredRole) {
    console.log('Access denied: User role', user?.role, 'not in', requiredRoles);
    // Redirect to unauthorized page if user doesn't have required role
    return <Navigate to="/not-authorized" replace />;
  }

  // If authenticated and has required role, show the protected content
  return <>{children}</>;
};

export default ProtectedRoute;

'use client';

import { useUser } from '../contexts/UserContext';
import { UserRole } from '../types/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface UseAuthOptions {
  requiredRole?: UserRole;
  redirectTo?: string;
}

export function useAuth(options: UseAuthOptions = {}) {
  const { isAuthenticated, isLoading, role } = useUser();
  const router = useRouter();
  const { requiredRole, redirectTo = '/auth/signin' } = options;

  useEffect(() => {
    // If not loading anymore and either not authenticated or doesn't have required role
    if (!isLoading && 
        (!isAuthenticated || (requiredRole && role !== requiredRole))) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, requiredRole, redirectTo, role, router]);

  return {
    isAuthenticated,
    isLoading,
    role,
    hasRequiredRole: !requiredRole || role === requiredRole,
    isAuthorized: isAuthenticated && (!requiredRole || role === requiredRole)
  };
}

// Hook for checking if the user can access a specific feature
export function useAuthorization(allowedRoles: UserRole[]) {
  const { role, isAuthenticated } = useUser();
  
  if (!isAuthenticated || !role) {
    return false;
  }
  
  return allowedRoles.includes(role);
}

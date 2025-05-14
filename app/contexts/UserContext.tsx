'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserRole } from '../types/auth';

interface UserContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole | null;
  userId: string | null;
  userEmail: string | null;
  userName: string | null;
}

const UserContext = createContext<UserContextProps>({
  isAuthenticated: false,
  isLoading: true,
  role: null,
  userId: null,
  userEmail: null,
  userName: null,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [contextValue, setContextValue] = useState<UserContextProps>({
    isAuthenticated: false,
    isLoading: true,
    role: null,
    userId: null,
    userEmail: null,
    userName: null,
  });

  useEffect(() => {
    if (status === 'loading') {
      setContextValue({
        isAuthenticated: false,
        isLoading: true,
        role: null,
        userId: null,
        userEmail: null,
        userName: null,
      });
    } else if (status === 'authenticated' && session?.user) {
      setContextValue({
        isAuthenticated: true,
        isLoading: false,
        role: (session.user as any).role || UserRole.USER,
        userId: (session.user as any).id || null,
        userEmail: session.user.email || null,
        userName: session.user.name || null,
      });
    } else {
      setContextValue({
        isAuthenticated: false,
        isLoading: false,
        role: null,
        userId: null,
        userEmail: null,
        userName: null,
      });
    }
  }, [session, status]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

// context/AuthContext.tsx

import React, { createContext, useContext, ReactNode } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

interface AuthContextProps {
  session: any; // Ajusta el tipo según tu configuración de sesión
  loading: boolean;
  signIn: (provider: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();

  // Define the loading state
  const loading = status === 'loading';

  return (
    <AuthContext.Provider value={{ session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

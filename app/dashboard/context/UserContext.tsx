"use client";
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getUserById, updateUser, getSessionId } from '@/actions';

interface UserContextProps {
  userData: any;
  updateField: (field: string, value: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState({});

  const updateField = (field: string, value: string) => {
    setUserData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionId = await getSessionId();
        const userData = await getUserById(sessionId);
        const user = JSON.parse(userData || '{}');
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, updateField }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
"use client";
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getUserById, updateUser, getSessionId } from '@/actions';

interface UserContextProps {
  userData: any;
  updateUserData: (id: string, data: any) => Promise<string>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState({});


/**
 * Updates user data by ID.
 * 
 * @param id 
 * @param data 
 * @returns 
 */
const updateUserData = async (id: string, data: any) => {
  const sessionId = await getSessionId();

  if (id !== sessionId) {
    throw new Error('User is not authorized to update this user data');
  }

  try {
    const response = await updateUser(id, data);
    const updateUserData = JSON.parse(response || '{}');
    setUserData(updateUserData);
    return JSON.stringify(response);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

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
    <UserContext.Provider value={{ userData, updateUserData }}>
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
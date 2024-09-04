"use client";
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getUserById, updateUser, getSessionId, getServiceById, updateService, deleteService } from '@/actions';

interface UserContextProps {
  userData: any;
  updateUserData: (id: string, data: any) => Promise<string>;
  updateUserService: (id: string, data: any) => Promise<string>;
  reloadUserData: () => Promise<void>;
  deleteUserService: (serviceId: string, userId: string) => Promise<string>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    try {
      const sessionId = await getSessionId();
      const userData = await getUserById(sessionId);

      const user = JSON.parse(userData || '{}');

      if (user.services && user.services.length > 0) {
        user.services = await Promise.all(
          user.services.map((serviceId: string) => getServiceById(serviceId))
        );
      }

      setUserData(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const updateUserData = async (id: string, data: any) => {
    const sessionId = await getSessionId();

    if (id !== sessionId) {
      throw new Error('User is not authorized to update this user data');
    }

    try {
      const response = await updateUser(id, data);
      await fetchUserData();
      return JSON.stringify(response);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };
  // TODO: Check it, maybe we don't need this function
  const updateUserService = async (id: string, data: any) => {
    try {
      const response = await updateService({ id, data });
      await fetchUserData();
      return JSON.stringify(response);
    } catch (error) {
      console.error('Error updating service data:', error);
      return Promise.reject(error);
    }
  };

const deleteUserService = async (serviceId: string, userId: string) => {
    try {
      const response = await deleteService(serviceId, userId);
      await fetchUserData();
      return JSON.stringify(response);
    } catch (error) {
      console.error('Error deleting service data:', error);
      return Promise.reject(error);
    }
  };
  

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, updateUserData, updateUserService, reloadUserData: fetchUserData, deleteUserService }}>
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
'use client';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {
  getUserById,
  updateUser,
  getSessionId,
  getServiceById,
  updateService,
  deleteService,
  updateAvatar,
  updateBlockImage,
  updateDomain,
} from '@/actions';
import { toast } from 'sonner';

interface UserContextProps {
  userData: any;
  isLoading: boolean;
  updateUserData: (id: string, data: any) => Promise<string>;
  updateUserService: (id: string, data: any) => Promise<string>;
  reloadUserData: () => Promise<void>;
  deleteUserService: (serviceId: string, userId: string) => Promise<string>;
  updateUserAvatar: (userId: string, formData: FormData) => Promise<string>;
  updateUserDomain: (id: string, domain: string) => Promise<string>;
  updateServiceImage: (userId: string, formData: FormData) => Promise<string>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true); 

  const fetchUserData = async (initialLoad: boolean = false) => {
    if (initialLoad) {
      setIsLoading(true); 
    }
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
    } finally {
      if (initialLoad) {
        setIsLoading(false);
      }
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
      toast.error('Error updating profile');
      return Promise.reject(error);
    }
  };

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

  const updateUserAvatar = async (userId: string, formData: FormData) => {
    try {
      await updateAvatar(userId, formData);
      await fetchUserData();
      toast.success('Avatar updated successfully!');
      return Promise.resolve('Avatar updated successfully!');
    } catch (error) {
      console.error('Error updating user avatar:', error);
      return Promise.reject(error);
    }
  };

  const updateServiceImage = async (userId: string, formData: FormData) => {
    try {
      await updateBlockImage(userId, formData);
      await fetchUserData();
      toast.success('Block image updated successfully!');
      return Promise.resolve('Block image updated successfully!');
    } catch (error) {
      console.error('Error updating block image:', error);
      return Promise.reject(error);
    }
  };

  const updateUserDomain = async (id: string, domain: string) => {
    try {
      const response = await updateDomain(id, domain);
      toast.success('Domain updated successfully!');
      await fetchUserData(); 
      return JSON.stringify(response);
    } catch (error) {
      console.error('Error updating user domain:', error);
      toast.error('Domain is already taken');
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    fetchUserData(true);
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        isLoading, 
        updateUserData,
        updateUserService,
        reloadUserData: fetchUserData,
        deleteUserService,
        updateUserAvatar,
        updateUserDomain,
        updateServiceImage,
      }}
    >
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
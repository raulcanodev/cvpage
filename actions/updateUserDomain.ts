import { updateUserById } from '@/lib/mongodb';

export const updateUserDomain = async (id: string, data: any) => {
  try {
    const response = await updateUserById(id, data);
    return JSON.stringify(response);
  } catch (error) {
    console.error('Error updating user domain:', error);
    return Promise.reject(error);
  }
}
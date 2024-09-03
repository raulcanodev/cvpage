"use server";
import { updateUserById } from '@/lib/mongodb';

// Auth
import { getSessionId } from './getSessionId';

/**
 * Updates user data by ID.
 * 
 * @param userId - The user ID.
 * @param updateData - The data to update.
 * @returns The updated user data.
 */
export const updateUser = async (id: string, data: any) => {
  const sessionId = await getSessionId();

  if (id !== sessionId) {
    throw new Error('User is not authorized to update this user data');
  }

  try {
    const response = await updateUserById(sessionId, data);
    return JSON.stringify(response);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

"use server";
import { fetchUserId } from '@/lib/mongodb';
import { redirect } from 'next/navigation';

// Auth
import { getSessionId } from './getSessionId';

/**
 * Retrieves user data by its ID.
 * 
 * @param id - The user ID.
 * @returns A promise that resolves to the user data.
 */
export const getUserById = async (id: string) => {
  const sessionId = await getSessionId();

  if (id !== sessionId) {
    redirect(`/dashboard/page/`);
  }

  try {
    const response = await fetchUserId(sessionId);
    
    if (!response) {
      throw new Error('User not found, check the ID');
    }

    return JSON.stringify(response);
  } catch (error) {
    console.error('Error retrieving user data:', error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}
"use server";
// Auth
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';


/**
 * Retrieves the current user's session ID stored in the next-auth session.
 *  
 * @returns Promise, get the current user's session ID. (string)
 * @throws An error if the user is not authenticated.
 */ 
export const getSessionId = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('User is not authenticated, please sign in');
  }
  const currentUserId = session?.user?._id;
  if (!currentUserId) {
    throw new Error('User ID not found in session, please sign in');
  }
  return currentUserId;
}
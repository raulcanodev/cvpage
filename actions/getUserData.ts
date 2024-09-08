"use server";
// Auth
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { fetchUserDataByEmail } from '@/lib/mongodb';


/**
 * Retrieves the current user's session ID stored in the next-auth session.
 *  
 * @returns Promise, get the current user's session ID. (string)
 * @throws An error if the user is not authenticated.
 */ 
export const getUserEmail = async () => {
  const session = await getServerSession(authOptions);
  
  
  if (!session) {
    throw new Error('User is not authenticated, please sign in');
  }
  const userEmail = session?.user?.email;
  
  if (!userEmail) {
    throw new Error('User ID not found in session, please sign in');
  }
  return userEmail;
}


/**
 * Retrieves the current user's data by its email.
 * 
 * @returns The user data.
 */
export const getUserData = async () => {
  const email = await getUserEmail();
  const userData = await fetchUserDataByEmail(email);
  console.log("userData", userData);
  
  return userData;
};
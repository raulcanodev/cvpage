"use server";
import { updateCustomDomain } from '@/lib/mongodb';

export const updateDomain = async (id: string, domain: string) => {

  const escapedDomain = domain.replace(/[^a-zA-Z0-9-]/g, '').trim().toLowerCase();
  
  try {
    const response = await updateCustomDomain(id, escapedDomain);
    return JSON.stringify(response);
  } catch (error) {
    console.error('Error updating user domain:', error);
    return Promise.reject(error);
  }
}
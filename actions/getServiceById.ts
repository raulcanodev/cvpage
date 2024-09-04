"use server";
import { fetchServiceById } from '@/lib/mongodb';

export const getServiceById = async (id: string) => {
  // TODO: Validate the ID with the session ID

  //! TODO: Can stuck here if the service is not found, null or undefined

  try {
    const response = await fetchServiceById(id);

    if (!response) {
      throw new Error('Service not found, check the ID: ' + id);
    }

    const service = JSON.stringify(response);
    return JSON.parse(service);
    
  } catch (error) {
    console.error('Error retrieving service data:', error);
    throw error;
  }

}
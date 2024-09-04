import { updateServiceById } from '@/lib/mongodb';

interface ServiceData {
  data?: any;
  id: string;
}

/**
 * Updates service data by ID.
 *  
 * @param id - The service ID.
 * @param data - The data to update.
 * @returns
 */
export const updateService = async ({id, data}: ServiceData) => {
  try {
    const response = await updateServiceById(id, data);
    return JSON.stringify(response);
  } catch (error) {
    console.error('Error updating service data:', error);
    return Promise.reject(error);
  }
}

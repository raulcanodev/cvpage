"use server";
import { createService, updateUserById } from '@/lib/mongodb';
import { getSessionId } from './getSessionId';
import { Service } from '@/types/types'; // Asegúrate de que el tipo Service esté bien definido

export const createNewService = async (): Promise<Service> => {
  try {
    // Create a new service
    const service = await createService({});

    const serviceId = service._id;

    // Get the session ID
    const sessionId = await getSessionId();

    // Update the user with the new service
    await updateUserById(sessionId, {
      $push: {
        services: serviceId,
      },
    });

    // Return the new service object
    const serviceData = JSON.parse(JSON.stringify(service));

    return serviceData; // Return the service object directly

  } catch (error) {
    console.error('Error creating new service:', error);
    return Promise.reject(error);
  }
};
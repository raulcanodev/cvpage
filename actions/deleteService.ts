"use server";
import { deleteServiceById, deleteServiceFromUser } from '@/lib/mongodb'

export const deleteService = async (serviceId: string, userId: string) => {
  // TODO: Validate that the user is authorized to delete the service
  try {
    // Then, delete the service from the user's services array
    await deleteServiceFromUser(userId, serviceId);
    // First, delete the service from the services collection
    await deleteServiceById(serviceId);
    return { message: 'Service deleted successfully' };
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
}
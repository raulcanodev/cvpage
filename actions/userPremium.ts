'use server';
import { updateUserPremium } from '@/lib/mongodb';
import User from '@/models/Schemas';

export async function handlePremiumPurchase(email: string) {
  console.log(`Starting handlePremiumPurchase for email: ${email}`);
  try {
    console.log('Updating user premium status...');
    await updateUserPremium(email, true);
    console.log('User premium status updated successfully');

  } catch (error) {
    console.error('Error in handlePremiumPurchase:', error);
    throw error; // Propagate the error to be handled by the caller
  }
}
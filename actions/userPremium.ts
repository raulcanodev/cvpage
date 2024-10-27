'use server';
import { updateUserPremium } from '@/lib/mongodb';
import User from '@/models/Schemas';

export async function handlePremiumPurchase(email: string) {
  console.log(`Starting handlePremiumPurchase for email: ${email}`);
  try {
    console.log('Searching for user in database...');
    const user = await User.findOne({ email });
    
    if (user?.premium) {
      console.log('User is already premium, skipping update');
      return;
    }

    if (!user) {
      console.log('User not found in database');
      throw new Error('User not found');
    }

    console.log('Updating user premium status...');
    await updateUserPremium(email, true);
    console.log('User premium status updated successfully');

  } catch (error) {
    console.error('Error in handlePremiumPurchase:', error);
    throw error; // Propagate the error to be handled by the caller
  }
}
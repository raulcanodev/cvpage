'use server';
import { updateUserPremium } from '@/lib/mongodb';

export async function handlePremiumPurchase(email: string) {
  try {
    console.log(`Updating premium status for ${email}`);
    await updateUserPremium(email, true);
  } catch (error) {
    console.error('Error updating premium status:', error);
  }
}
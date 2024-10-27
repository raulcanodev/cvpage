'use server';
import { updateUserPremium } from '@/lib/mongodb';

export async function handlePremiumPurchase(email: string) {
  try {
    await updateUserPremium(email, true);

  } catch (error) {
    console.error('Error in handlePremiumPurchase:', error);
    throw error;
  }
}
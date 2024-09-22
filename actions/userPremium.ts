'use server';
import { updateUserPremium } from '@/lib/mongodb';
import User from '@/models/Schemas';

export async function handlePremiumPurchase(email: string) {
  try {
    const user = await User.findOne({ email });
    
    if (user?.premium) {
      console.log(`The user ${email} is already premium`);
      return;
    }

    console.log(`Premium status for ${email}`);
    await updateUserPremium(email, true);
  } catch (error) {
    console.error('Error updating premium:', error);
  }
}
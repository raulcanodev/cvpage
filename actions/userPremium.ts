'use server';
import { updateUserPremium } from '@/lib/mongodb';
import User from '@/models/Schemas';

export async function handlePremiumPurchase(email: string) {
  try {
    // Verifica si el usuario ya es premium
    const user = await User.findOne({ email });
    
    if (user?.premium) {
      console.log(`El usuario ${email} ya es premium.`);
      return;
    }

    console.log(`Actualizando estado premium para ${email}`);
    await updateUserPremium(email, true);
  } catch (error) {
    console.error('Error actualizando estado premium:', error);
  }
}
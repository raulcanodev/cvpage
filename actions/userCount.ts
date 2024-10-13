import { userCounter } from '@/lib/mongodb';

export async function handleUserCount() {
  try {
    await userCounter();
  } catch (error) {
    console.error('Error updating user count:', error);
  }
}
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { fetchUserByToken, updatePassword, invalidateResetToken } from '@/lib/mongodb';

export async function POST(request: Request, { params }: { params: { token: string } }) {
  
  const { password } = await request.json();
  const user = await fetchUserByToken(params.token);

  if (!user) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await updatePassword(user.email, hashedPassword);
  await invalidateResetToken(user.email);

  return NextResponse.json({ message: 'Password updated' });
}
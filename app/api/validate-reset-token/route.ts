import { NextRequest, NextResponse } from 'next/server';
import { fetchUserByToken } from '@/lib/mongodb'; 

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ valid: false, message: 'Token is required' }, { status: 400 });
  }

  const user = await fetchUserByToken(token);

  if (user) {
    return NextResponse.json({ valid: true });
  } else {
    return NextResponse.json({ valid: false, message: 'Invalid token' }, { status: 404 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  console.log({ session });
  console.log({ user: session?.user });

  if (session) {
    return NextResponse.json({ name: session.user?.name, email: session.user?.email });
  } else {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
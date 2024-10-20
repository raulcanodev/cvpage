import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const protectedPaths = ['/dashboard'];
  const publicPaths = ['/auth/signin'];

  const isProtectedRoute = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  const isAuthRoute = publicPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard/page', req.url));
  }

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/signin', '/dashboard/:path*'],
};
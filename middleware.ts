import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  
  // Define the protected paths
  const protectedPaths = ['/dashboard'];

  const isProtectedRoute = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );
  
  // If the route is protected and the user is not authenticated, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Continue to the requested route if the user is authenticated or the route is not protected
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is for dashboard routes
  const isDashboardRoute = pathname.startsWith('/dashboard');
  
  // Check if the path is for authentication routes
  const isAuthRoute = pathname.startsWith('/auth');
  
  // Get the token and check if the user is authenticated
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Redirect unauthenticated users away from dashboard routes
  if (isDashboardRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Allow all other routes
  return NextResponse.next();
}

// Define on which routes the middleware will run
export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
};

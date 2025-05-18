import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Basic security headers for all responses
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' vitals.vercel-insights.com; frame-src 'self'"
  );
  
  // Check if the path is a protected route (not auth routes or public API routes)
  const isAuthPath = path.startsWith('/auth');
  const isApiAuthPath = path.startsWith('/api/auth');
  const isPublicApiPath = path === '/api/mongodb-status';
  
  // For auth paths, redirect to home if already authenticated
  if (isAuthPath) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return response;
  }
  
  // Skip authentication check for API auth paths and public API routes
  if (isApiAuthPath || isPublicApiPath) {
    return response;
  }
    // For all other paths that are not public or explicitly excluded, check auth
  // All routes require authentication except for auth paths and public API paths
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  
  return response;
}

// Apply this middleware to all routes except static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g. robots.txt)
     */
    '/((?!_next/static|_next/image|favicon.ico|assets/|public/).*)',
  ],
};

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyTokenInMiddleware } from './helper/tokenDecode';


export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value;

  console.log(`Accessing path: ${path}`);
  console.log(`Token present: ${!!token}`);

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/', '/previous-events']; // Add any other public routes

  if (publicRoutes.includes(path)) {
    console.log(`Accessing public route: ${path}`);
    return NextResponse.next(); // Allow access to public routes without a token
  }

  // If no token, redirect to login
  if (!token) {
    console.log('No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decodedToken = verifyTokenInMiddleware(token);
    console.log('Decoded token in middleware:', decodedToken);

    const isAdmin = decodedToken.isAdmin;
    console.log(`User is admin: ${isAdmin}`);

    // Admin-only routes
    const adminRoutes = ['/host', '/registered-students','/my-events'];

    if (adminRoutes.some((route) => path.startsWith(route))) {
      if (!isAdmin) {
        console.log('Non-admin trying to access admin route');
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    // User-only routes (non-admins)
    const userRoutes = ['/registered-events'];

    // if (userRoutes.some((route) => path.startsWith(route))) {
    //   if (isAdmin) {
    //     console.log('Admin trying to access user-only route');
    //     return NextResponse.redirect(new URL('/', request.url));
    //   }
    // }

    return NextResponse.next(); // Allow access if all checks pass

  } catch (error: any) {
    console.error("Error in middleware:", error);
    // Only clear the token if it's invalid or expired
    if (error.message === 'Invalid token format' || error.message === 'Token expired') {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
    // For other errors, just redirect without clearing the token
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// See "Matching Paths" below to configure which paths this middleware runs for
export const config = {
  matcher: [
    '/host/:path*',
    '/registered-students/:path*',
    '/my-events/:path*',
    '/registered-events/:path*',
    '/previous-events/:path*',
    '/login',
    '/signup',
    '/'
  ],
};


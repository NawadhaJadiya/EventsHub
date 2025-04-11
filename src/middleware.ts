import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname

  // ❌ This will block everything if you don't filter
  // ✅ Example: block only '/login' route
  // if (path === '/login') {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  // Allow all other routes to continue
  return NextResponse.next()


  // const isAuthenticated = request.cookies.has('auth_token')
  // const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
  //                   request.nextUrl.pathname.startsWith('/signup')

  // if (!isAuthenticated && !isAuthPage) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  // if (isAuthenticated && isAuthPage) {
//     return NextResponse.redirect(new URL('/', request.url))
//   // }

//   return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/my-events/:path*',
    '/host/:path*',
    '/registered-events/:path*',
    '/qr/:path*',
    '/registered-students/:path*',
    '/login',
    '/signup'
  ],
} 
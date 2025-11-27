import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/dashboard']

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/auth']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authToken = request.cookies.get('authToken')?.value || 
                    request.headers.get('authorization')?.replace('Bearer ', '')

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // For dashboard, we'll handle auth check in the page component
  // since we need to check localStorage for tempAccessToken
  // Middleware can't access localStorage, so we let the page handle it
  if (isProtectedRoute) {
    // Allow access, let the page component handle the auth check
    return NextResponse.next()
  }

  // Redirect to dashboard if trying to access auth route with token
  if (isAuthRoute && authToken) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth']
}

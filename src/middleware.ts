import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const protectedRoutes = ['/play', '/play/host-game']

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  )

  const token = request.cookies.get('auth_token')?.value

  if (isProtectedRoute && !token) {
    // return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/play/:path*', '/login'],
}

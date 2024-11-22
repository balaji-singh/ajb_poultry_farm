import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set')
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    
    // Check user type for admin-only routes
    if (request.nextUrl.pathname.startsWith('/dashboard/batches') && payload.userType !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    // Allow access to other dashboard routes for both admin and employee
    if (request.nextUrl.pathname.startsWith('/dashboard') && 
        (payload.userType === 'admin' || payload.userType === 'employee')) {
      return NextResponse.next()
    }

    // If not authorized, redirect to unauthorized page
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}


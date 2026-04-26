// src/middleware.ts

import { auth } from '@/lib/auth/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isAuth = !!req.auth;
  const { nextUrl } = req;

  const isAdminRoute = nextUrl.pathname.startsWith('/admin') || nextUrl.pathname.startsWith('/api/admin');
  const isLoginPage = nextUrl.pathname === '/login';

  // 1. Redirect authenticated users away from login
  if (isLoginPage && isAuth) {
    return NextResponse.redirect(new URL('/admin/dashboard', nextUrl));
  }

  // 2. Protect Admin Routes
  if (isAdminRoute && !isAuth) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) callbackUrl += nextUrl.search;
    
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  // Matcher ignoring static files and Next.js internals
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/api/admin/:path*'],
};

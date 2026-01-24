import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdminPanel = req.nextUrl.pathname.startsWith('/admin');
  const isOnLoginPage = req.nextUrl.pathname === '/admin/login';

  // 1. If trying to access Admin Panel
  if (isOnAdminPanel) {
    if (isOnLoginPage) {
        // If already logged in, redirect to Dashboard
        if (isLoggedIn) {
             return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl));
        }
        return NextResponse.next(); // Allow access to Login Page
    }

    // If NOT logged in, Redirect to Login
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
    }
    
    // If Logged in -> Allow
    return NextResponse.next();
  }

  // 2. Public Routes -> Always Allow
  return NextResponse.next();
});

export const config = {
  // Verify all paths EXCEPT static files, images, etc.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      
      // We handle redirect logic in middleware.ts
      // This config is just shared types/setup
      return true; 
    },
  },
  providers: [], // Providers added in auth.ts
} satisfies NextAuthConfig;

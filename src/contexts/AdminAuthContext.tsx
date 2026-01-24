"use client";

// SessionProvider and useSession are the only needed imports from next-auth
// We use server-side authentication via Server Actions mostly,
// but useSession hook is needed for getting user state in client components.
// Since we are moving to next-auth v5 which recommends server-side auth mostly,
// this context acts as a client-side bridge/state holder.

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from 'react';
import { handleSignOut } from '@/lib/actions';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

// Helper hook to access user easily
export function useAuth() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  
  // Tab-specific session guard
  useEffect(() => {
     if (status === "authenticated") {
         const isActive = sessionStorage.getItem('samakal_session_active');
         if (!isActive) {
             // If authenticated but no session flag (meaning new tab/re-opened tab), force logout
             handleSignOut();
         }
     }
  }, [status]);
  
  return {
    user: session?.user ? {
        id: (session.user as { id?: string }).id || 'unknown',
        name: session.user.name || 'Admin',
        role: (session.user as { role?: string }).role || 'editor',
        email: session.user.email,
        image: session.user.image
    } : null,
    isLoading,
    login: () => {}, 
    logout: async () => {
        // Clear session flag
        sessionStorage.removeItem('samakal_session_active');
        await handleSignOut();
    } 
  };
}

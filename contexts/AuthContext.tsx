"use client";

import React, { createContext, useContext } from 'react';
import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Types
export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  plan: 'FREE' | 'PRO' | 'TEAMS';
  emailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";

  const user: User | null = session?.user ? {
    id: session.user.id || '',
    email: session.user.email || '',
    name: session.user.name || null,
    image: session.user.image || null,
    plan: 'FREE', // Default plan, should come from database
    emailVerified: true,
  } : null;

  const login = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    router.push('/dashboard');
  };

  const signup = async (name: string, email: string, password: string) => {
    // First create the account
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to create account');
    }

    // Then sign in
    await login(email, password);
  };

  const logout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const updateUser = (data: Partial<User>) => {
    // This would need an API call to update user data in the database
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!session,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </SessionProvider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook to check if user has access to a feature
export function useFeatureAccess(feature: 'PLAYGROUND' | 'CHALLENGES' | 'CERTIFICATE' | 'DOWNLOADS' | 'TEAM_FEATURES') {
  const { user } = useAuth();

  if (!user) return false;

  const featureAccess = {
    PLAYGROUND: ['PRO', 'TEAMS'],
    CHALLENGES: ['PRO', 'TEAMS'],
    CERTIFICATE: ['PRO', 'TEAMS'],
    DOWNLOADS: ['PRO', 'TEAMS'],
    TEAM_FEATURES: ['TEAMS'],
  };

  return featureAccess[feature].includes(user.plan);
}

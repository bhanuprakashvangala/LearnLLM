"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
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

// Temporary in-memory storage (replace with actual API calls + database)
const STORAGE_KEY = 'learnllm_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', { ... });

      // Temporary: Simulate login
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        image: null,
        plan: 'FREE',
        emailVerified: true,
      };

      setUser(mockUser);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/signup', { ... });

      // Temporary: Simulate signup
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        image: null,
        plan: 'FREE',
        emailVerified: false,
      };

      setUser(mockUser);
      router.push('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // await fetch('/api/auth/logout', { ... });

      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
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

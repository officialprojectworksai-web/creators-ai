'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserRole, Profile } from '@/types/marketplace';
import { createClient } from '@/lib/supabase/client';

export interface AuthUser {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string;
  role: UserRole;
  bio?: string;
  location?: string;
  experience_years?: number;
}

const DEMO_USERS: Record<UserRole, AuthUser> = {
  creator: {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'aria.vance@creatoros.ai',
    display_name: 'Aria Vance',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    role: 'creator',
    bio: 'Cinematic AI Director & Multimodal Producer specializing in luxury commercials & ComfyUI pipelines.',
    location: 'San Francisco, CA',
    experience_years: 4,
  },
  brand: {
    id: '00000000-0000-0000-0000-000000000011',
    email: 'brand@lumina.luxury',
    display_name: 'Lumina Haute Wear',
    avatar_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&auto=format&fit=crop&q=80',
    role: 'brand',
    bio: 'Avant-garde luxury streetwear & cyberpunk apparel brand.',
    location: 'London, UK',
    experience_years: 5,
  },
  agency: {
    id: '00000000-0000-0000-0000-000000000010',
    email: 'partnerships@aetherium.agency',
    display_name: 'Aetherium Creative Agency',
    avatar_url: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=400&auto=format&fit=crop&q=80',
    role: 'agency',
    bio: 'Global creative agency managing Tier-1 tech & luxury brands.',
    location: 'New York, NY',
    experience_years: 8,
  },
  admin: {
    id: '00000000-0000-0000-0000-000000000099',
    email: 'admin.auditor@creatoros.ai',
    display_name: 'CreatorOS Verification Desk',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    role: 'admin',
    bio: 'Official CreatorOS Verification & Trust Assurance Officer.',
    location: 'San Francisco, CA',
    experience_years: 10,
  },
};

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (role?: UserRole, customEmail?: string) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (newRole: UserRole) => void;
  updateUserProfile: (data: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage or supabase
    try {
      const savedRole = localStorage.getItem('creatoros_demo_role') as UserRole | null;
      if (savedRole && DEMO_USERS[savedRole]) {
        setUser(DEMO_USERS[savedRole]);
      } else {
        // Default to creator for immediate rich preview
        setUser(DEMO_USERS.creator);
      }
    } catch (e) {
      setUser(DEMO_USERS.creator);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (selectedRole: UserRole = 'creator', customEmail?: string) => {
    setIsLoading(true);
    const baseUser = DEMO_USERS[selectedRole];
    const loggedUser: AuthUser = customEmail
      ? { ...baseUser, email: customEmail, display_name: customEmail.split('@')[0] }
      : baseUser;
    
    setUser(loggedUser);
    localStorage.setItem('creatoros_demo_role', selectedRole);
    setIsLoading(false);
  };

  const logout = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('creatoros_demo_role');
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (DEMO_USERS[newRole]) {
      setUser(DEMO_USERS[newRole]);
      localStorage.setItem('creatoros_demo_role', newRole);
    }
  };

  const updateUserProfile = (data: Partial<AuthUser>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'creator',
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchRole,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

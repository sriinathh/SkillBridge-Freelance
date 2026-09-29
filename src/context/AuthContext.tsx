import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserRole } from '@/lib/mockData';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('sb-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem('sb-user', JSON.stringify(u));
    else localStorage.removeItem('sb-user');
  };

  const login = async (email: string, _password: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const role: UserRole = email.includes('admin') ? 'admin' : email.includes('client') ? 'client' : 'freelancer';
    persist({
      id: 'u1',
      name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    });
    setLoading(false);
  };

  const signup = async (name: string, email: string, _password: string, role: UserRole) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    persist({
      id: 'u' + Date.now(),
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    });
    setLoading(false);
  };

  const logout = () => persist(null);

  const switchRole = (role: UserRole) => {
    if (user) persist({ ...user, role });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, switchRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

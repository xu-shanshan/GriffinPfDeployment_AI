import { create } from 'zustand';

export interface AuthUser {
  name: string;
  role: 'Admin' | 'Operator' | 'Viewer';
}

interface AuthState {
  user: AuthUser;
  setUser: (u: AuthUser) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: { name: 'Guest', role: 'Viewer' },
  setUser: (u) => set({ user: u })
}));

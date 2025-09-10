import { create } from 'zustand';

interface LayoutState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export const useLayoutStore = create<LayoutState>(set => ({
  sidebarOpen: window.innerWidth >= 900,
  toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
  closeSidebar: () => set({ sidebarOpen: false })
}));

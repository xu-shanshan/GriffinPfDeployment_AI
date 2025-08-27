import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppStore {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  favorites: {
    ves: string[];
    services: string[];
  };
  
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addFavorite: (type: 've' | 'service', id: string) => void;
  removeFavorite: (type: 've' | 'service', id: string) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      theme: 'light',
      favorites: { ves: [], services: [] },
      
      toggleSidebar: () => set((state) => ({ 
        sidebarCollapsed: !state.sidebarCollapsed 
      })),
      
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      
      setTheme: (theme) => set({ theme }),
      
      addFavorite: (type, id) => set((state) => {
        const key = type === 've' ? 'ves' : 'services';
        if (state.favorites[key].includes(id)) return state;
        
        return {
          favorites: {
            ...state.favorites,
            [key]: [...state.favorites[key], id]
          }
        };
      }),
      
      removeFavorite: (type, id) => set((state) => ({
        favorites: {
          ...state.favorites,
          [type === 've' ? 'ves' : 'services']: 
            state.favorites[type === 've' ? 'ves' : 'services'].filter(fav => fav !== id)
        }
      }))
    }),
    {
      name: 'griffin-app-storage',
    }
  )
);

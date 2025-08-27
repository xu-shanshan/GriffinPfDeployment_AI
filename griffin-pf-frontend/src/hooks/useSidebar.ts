import { useState, useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';

export const useSidebar = () => {
  const { sidebarCollapsed, toggleSidebar, setSidebarCollapsed } = useAppStore();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-collapse sidebar on mobile
      if (mobile && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [sidebarCollapsed, setSidebarCollapsed]);
  
  return {
    isCollapsed: sidebarCollapsed,
    isMobile,
    toggle: toggleSidebar,
    shouldShowOverlay: isMobile && !sidebarCollapsed
  };
};

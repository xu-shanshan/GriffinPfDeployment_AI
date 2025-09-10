import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import { useLayoutStore } from '../../store/layout';
import { useAuthStore } from '../../store/auth';
import { NavItem } from '../../types/navigation';

const navItems: ReadonlyArray<NavItem> = [
  { id: 'dashboard', path: '/dashboard', label: 'Dashboard' },
  { id: 'ves', path: '/ves', label: 'VE Mgmt' },
  { id: 'services', path: '/services', label: 'Services' },
  { id: 'deployments', path: '/deployments', label: 'History' }
];

const AppLayout: React.FC = () => {
  const toggle = useLayoutStore(s => s.toggleSidebar);
  const setUser = useAuthStore(s => s.setUser);

  useEffect(() => {
    // mock user until auth integrated
    setUser({ name: 'John Doe', role: 'Admin' });
  }, [setUser]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <AppSidebar nav={navItems} />
      <AppHeader
        title="Griffin Deployment"
        subtitle="Prototype Phase 0"
        onToggleSidebar={toggle}
      />
      <div
        role="main"
        style={{
          marginLeft: 256,
          paddingTop: 64,
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <div style={{ padding: 24 }}>
          <Outlet /> {/* Added nested route outlet */}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

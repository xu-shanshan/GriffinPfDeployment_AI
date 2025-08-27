import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Text,
  Button,
  Subtitle1,
  Caption1,
} from '@fluentui/react-components';
import {
  Home24Regular,
  Server24Regular,
  CloudDatabaseRegular,
  History24Regular,
  Star24Regular,
} from '@fluentui/react-icons';
import { useSidebar } from '../../../hooks/useSidebar';
import { useAppStore } from '../../../stores/appStore';
import { useVirtualEnvironments } from '../../../services/queries';

interface NavItemProps {
  icon: React.ReactElement;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <Button
    icon={icon}
    appearance={isActive ? 'primary' : 'subtle'}
    onClick={onClick}
    style={{
      width: '100%',
      justifyContent: 'flex-start',
      marginBottom: '4px',
      padding: '8px 16px'
    }}
  >
    {label}
  </Button>
);

export const NavigationSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed, shouldShowOverlay, toggle } = useSidebar();
  const { favorites } = useAppStore();
  const { data: ves } = useVirtualEnvironments();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    navigate(path);
    if (shouldShowOverlay) {
      toggle();
    }
  };

  if (isCollapsed && !shouldShowOverlay) {
    return null;
  }

  return (
    <>
      {shouldShowOverlay && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1000,
          }}
          onClick={toggle}
        />
      )}
      <aside style={{
        width: '280px',
        height: '100vh',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e1e1e1',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        position: shouldShowOverlay ? 'fixed' : 'static',
        left: 0,
        top: 0,
        zIndex: shouldShowOverlay ? 1001 : 'auto',
        boxShadow: shouldShowOverlay ? '2px 0 4px rgba(0,0,0,0.1)' : 'none',
      }}>
        <div style={{ marginBottom: '24px' }}>
          <Subtitle1>Griffin PF AI</Subtitle1>
        </div>
        
        <nav style={{ flex: 1 }}>
          <NavItem
            icon={<Home24Regular />}
            label="Dashboard"
            path="/"
            isActive={isActive('/')}
            onClick={() => handleNavigation('/')}
          />
          
          <NavItem
            icon={<CloudDatabaseRegular />}
            label="Virtual Environments"
            path="/ves"
            isActive={isActive('/ves')}
            onClick={() => handleNavigation('/ves')}
          />
          
          <NavItem
            icon={<Server24Regular />}
            label="Services"
            path="/services"
            isActive={isActive('/services')}
            onClick={() => handleNavigation('/services')}
          />
          
          <NavItem
            icon={<History24Regular />}
            label="Deployment History"
            path="/deployments"
            isActive={isActive('/deployments')}
            onClick={() => handleNavigation('/deployments')}
          />

          {favorites.ves.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <Caption1 style={{ 
                marginBottom: '8px', 
                padding: '0 16px',
                color: 'var(--colorNeutralForeground2)'
              }}>
                Favorites
              </Caption1>
              {favorites.ves.map(veId => {
                const ve = ves?.find(v => v.id === veId);
                return ve ? (
                  <Button
                    key={veId}
                    icon={<Star24Regular />}
                    appearance="subtle"
                    onClick={() => handleNavigation(`/ves/${veId}`)}
                    style={{
                      width: '100%',
                      justifyContent: 'flex-start',
                      marginBottom: '2px',
                      padding: '6px 32px',
                      fontSize: '14px'
                    }}
                  >
                    {ve.name}
                  </Button>
                ) : null;
              })}
            </div>
          )}

          <div style={{ marginTop: '16px', padding: '8px 16px' }}>
            <Button
              appearance="secondary"
              onClick={() => handleNavigation('/test')}
              style={{ width: '100%' }}
            >
              Test Page
            </Button>
          </div>
        </nav>
      </aside>
    </>
  );
};

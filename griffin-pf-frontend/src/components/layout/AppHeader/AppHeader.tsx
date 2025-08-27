import React from 'react';
import {
  Button,
  Text,
} from '@fluentui/react-components';
import {
  Navigation24Regular,
  Settings24Regular,
  Person24Regular,
} from '@fluentui/react-icons';
import { useSidebar } from '../../../hooks/useSidebar';

export const AppHeader: React.FC = () => {
  const { toggle } = useSidebar();

  return (
    <header style={{ 
      borderBottom: '1px solid #e1e1e1',
      padding: '0 16px',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      zIndex: 100,
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
    }}>
      <Button
        icon={<Navigation24Regular />}
        appearance="subtle"
        onClick={toggle}
        aria-label="Toggle sidebar"
        style={{ marginRight: '12px' }}
      />
      <Text weight="semibold" size={400}>
        Griffin PF Deployment AI
      </Text>
      <div style={{ flex: 1 }} />
      <Button
        icon={<Settings24Regular />}
        appearance="subtle" 
        aria-label="Settings"
        style={{ marginRight: '8px' }}
      />
      <Button
        icon={<Person24Regular />}
        appearance="subtle"
        aria-label="User menu"
      />
    </header>
  );
};

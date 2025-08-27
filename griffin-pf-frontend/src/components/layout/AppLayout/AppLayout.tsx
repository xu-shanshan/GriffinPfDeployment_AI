import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../AppHeader/AppHeader';
import { NavigationSidebar } from '../NavigationSidebar/NavigationSidebar';

console.log('AppLayout loading...');

export const AppLayout: React.FC = () => {
  console.log('AppLayout rendering...');
  
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#f5f5f5'
    }}>
      <NavigationSidebar />
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        overflow: 'hidden'
      }}>
        <AppHeader />
        <main style={{
          flex: 1,
          overflow: 'auto',
          padding: '24px',
          backgroundColor: 'var(--colorNeutralBackground3, #fafafa)'
        }}>
          <React.Suspense fallback={
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '200px' 
            }}>
              Loading page...
            </div>
          }>
            <Outlet />
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

console.log('AppLayout defined');

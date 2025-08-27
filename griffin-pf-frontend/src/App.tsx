import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Spinner } from '@fluentui/react-components';
import { AppLayout } from './components/layout/AppLayout/AppLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { VEManagementPage } from './pages/VEManagement/VEManagementPage';
import { ServicesManagementPage } from './pages/Services/ServicesManagementPage';
import { DeploymentHistoryPage } from './pages/Deployment/DeploymentHistoryPage';

console.log('App.tsx loading...');

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Error boundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h2>Something went wrong:</h2>
          <pre style={{ color: 'red', textAlign: 'left', overflow: 'auto', maxWidth: '80%' }}>
            {this.state.error?.message || 'Unknown error'}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{ marginTop: '16px', padding: '8px 16px' }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading fallback
const LoadingFallback: React.FC = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    flexDirection: 'column',
    gap: '16px'
  }}>
    <Spinner size="large" label="Loading application..." />
  </div>
);

// Simple test component to verify routing works
const TestPage: React.FC<{ title: string }> = ({ title }) => (
  <div style={{ padding: '24px' }}>
    <h1>{title}</h1>
    <p>This page is working correctly.</p>
  </div>
);

const App: React.FC = () => {
  console.log('App component rendering...');
  
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="test" element={<TestPage title="Test Page" />} />
              <Route path="ves" element={<VEManagementPage />} />
              <Route path="ves/:veId" element={<TestPage title="VE Detail (Coming Soon)" />} />
              <Route path="services" element={<ServicesManagementPage />} />
              <Route path="services/:serviceId" element={<TestPage title="Service Detail (Coming Soon)" />} />
              <Route path="deployments" element={<DeploymentHistoryPage />} />
              <Route path="deployments/:deploymentId" element={<TestPage title="Deployment Detail (Coming Soon)" />} />
              <Route path="*" element={<TestPage title="Page Not Found" />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

console.log('App component defined');

export default App;

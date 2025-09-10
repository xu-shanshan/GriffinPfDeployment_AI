import React, { PropsWithChildren } from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './AppRouter';
import { griffinTheme } from './theme/fluentTheme';

const qc = new QueryClient();

class ErrorBoundary extends React.Component<PropsWithChildren, { error?: Error }> {
  state: { error?: Error } = {};
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <FluentProvider theme={griffinTheme}>
          <div style={{ padding: 32 }}>
            <h2>Something went wrong</h2>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.message}</pre>
          </div>
        </FluentProvider>
      );
    }
    return this.props.children;
  }
}

const App: React.FC = () => (
  <ErrorBoundary>
    <QueryClientProvider client={qc}>
      <FluentProvider theme={griffinTheme || webLightTheme}>
        <AppRouter />
      </FluentProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

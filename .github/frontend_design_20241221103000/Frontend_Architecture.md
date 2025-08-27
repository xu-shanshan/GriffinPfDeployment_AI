# Griffin PF Deployment AI - Frontend Architecture

## Architecture Overview

This document outlines the React + TypeScript frontend architecture for the Griffin PF Deployment AI platform, designed to replace the current HTML prototypes with a scalable, maintainable, and accessible solution.

## Technology Stack

```typescript
// Core Framework
React 18.2+ with TypeScript 5.0+
Vite 4.0+ for build tooling

// UI Framework & Styling
@fluentui/react-components v9.x (Fluent UI v9)
@fluentui/react-icons
TailwindCSS 3.x (utility classes only, Fluent UI for components)

// State Management
Zustand 4.x (lightweight, TypeScript-first)
React Query v4 (server state management)

// Routing & Navigation
React Router v6 (file-based routing structure)

// Data Fetching
Axios 1.x with interceptors
React Query for caching and synchronization

// Development & Testing
Vite + TypeScript + ESLint + Prettier
Jest + React Testing Library
MSW (Mock Service Worker) for API mocking
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI elements (buttons, inputs, modals)
│   ├── layout/          # Layout components (sidebar, header, navigation)
│   ├── data/            # Data display components (tables, cards, charts)
│   └── forms/           # Form components with validation
├── pages/               # Route components
│   ├── dashboard/       # Dashboard page
│   ├── ve-management/   # VE management pages
│   ├── services/        # Service management pages
│   └── deployment/      # Deployment and history pages
├── hooks/               # Custom React hooks
├── services/            # API service layer
├── stores/              # Zustand stores
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── constants/           # Application constants
└── assets/              # Static assets
```

## Component Architecture

### 1. Layout Components

```typescript
// Layout structure with proper responsive behavior
interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const AppLayout: React.FC<LayoutProps> = ({ children, showSidebar = true }) => {
  return (
    <div className="app-layout">
      {showSidebar && <NavigationSidebar />}
      <main className="main-content">
        <AppHeader />
        <div className="content-area">
          {children}
        </div>
      </main>
    </div>
  );
};
```

#### NavigationSidebar Component
```typescript
interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: string | number;
}

const NavigationSidebar: React.FC = () => {
  const { isCollapsed, toggle } = useSidebar();
  const favorites = useFavorites();
  
  return (
    <FluentProvider theme={webLightTheme}>
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <SidebarHeader />
        <NavigationSection items={mainNavItems} />
        <FavoritesSection items={favorites.ves} />
        <UserSection />
      </aside>
    </FluentProvider>
  );
};
```

### 2. Data Display Components

#### DataTable Component (Virtual Scrolling)
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  error?: Error | null;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onSelect?: (items: T[]) => void;
  virtualScrolling?: boolean;
  pageSize?: number;
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading,
  error,
  onSort,
  onSelect,
  virtualScrolling = false,
  pageSize = 50
}: DataTableProps<T>) => {
  // Implementation with react-window for virtual scrolling
  // Fluent UI Table components
  // Selection management
  // Responsive design
};
```

#### ServiceCard Component
```typescript
interface ServiceCardProps {
  service: Service;
  ve?: VirtualEnvironment;
  onDeploy?: (service: Service) => void;
  onFavorite?: (service: Service) => void;
  onEdit?: (service: Service) => void;
  compact?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  ve,
  onDeploy,
  onFavorite,
  onEdit,
  compact = false
}) => {
  return (
    <Card className={`service-card ${compact ? 'compact' : 'detailed'}`}>
      <CardHeader>
        <ServiceIcon service={service} />
        <ServiceTitle service={service} ve={ve} />
        <ServiceActions
          service={service}
          onDeploy={onDeploy}
          onFavorite={onFavorite}
          onEdit={onEdit}
        />
      </CardHeader>
      <CardContent>
        <ServiceMetrics service={service} />
        <ServiceStatus service={service} />
      </CardContent>
    </Card>
  );
};
```

### 3. Form Components

#### SearchAndFilter Component
```typescript
interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'multiselect' | 'date' | 'boolean';
  options?: { value: string; label: string }[];
}

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: Record<string, any>) => void;
  filters: FilterConfig[];
  savedFilters?: SavedFilter[];
  onSaveFilter?: (filter: SavedFilter) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onFilter,
  filters,
  savedFilters,
  onSaveFilter
}) => {
  // Implementation with Fluent UI components
  // Debounced search
  // Filter state management
  // Saved filter functionality
};
```

## State Management Architecture

### 1. Zustand Stores

```typescript
// Main application store
interface AppStore {
  // UI State
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  
  // User preferences
  favorites: {
    ves: string[];
    services: string[];
  };
  
  // Actions
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addFavorite: (type: 've' | 'service', id: string) => void;
  removeFavorite: (type: 've' | 'service', id: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  sidebarCollapsed: false,
  theme: 'light',
  favorites: { ves: [], services: [] },
  
  toggleSidebar: () => set((state) => ({ 
    sidebarCollapsed: !state.sidebarCollapsed 
  })),
  
  setTheme: (theme) => set({ theme }),
  
  addFavorite: (type, id) => set((state) => ({
    favorites: {
      ...state.favorites,
      [type === 've' ? 'ves' : 'services']: [
        ...state.favorites[type === 've' ? 'ves' : 'services'],
        id
      ]
    }
  })),
  
  removeFavorite: (type, id) => set((state) => ({
    favorites: {
      ...state.favorites,
      [type === 've' ? 'ves' : 'services']: 
        state.favorites[type === 've' ? 'ves' : 'services'].filter(fav => fav !== id)
    }
  }))
}));
```

```typescript
// Deployment store for managing deployment state
interface DeploymentStore {
  selectedServices: Set<string>;
  deploymentQueue: DeploymentJob[];
  activeDeployments: Map<string, DeploymentStatus>;
  
  selectService: (serviceId: string) => void;
  deselectService: (serviceId: string) => void;
  clearSelection: () => void;
  startDeployment: (services: string[], config: DeploymentConfig) => Promise<void>;
  cancelDeployment: (jobId: string) => Promise<void>;
}

export const useDeploymentStore = create<DeploymentStore>((set, get) => ({
  selectedServices: new Set(),
  deploymentQueue: [],
  activeDeployments: new Map(),
  
  selectService: (serviceId) => set((state) => ({
    selectedServices: new Set([...state.selectedServices, serviceId])
  })),
  
  deselectService: (serviceId) => set((state) => {
    const newSet = new Set(state.selectedServices);
    newSet.delete(serviceId);
    return { selectedServices: newSet };
  }),
  
  clearSelection: () => set({ selectedServices: new Set() }),
  
  startDeployment: async (services, config) => {
    // Implementation for starting deployment
  },
  
  cancelDeployment: async (jobId) => {
    // Implementation for canceling deployment
  }
}));
```

### 2. React Query Integration

```typescript
// API service layer
class GriffinApiService {
  private client: AxiosInstance;
  
  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      timeout: 30000,
    });
    
    this.setupInterceptors();
  }
  
  // Virtual Environments
  async getVirtualEnvironments(): Promise<VirtualEnvironment[]> {
    const response = await this.client.get('/api/ves');
    return response.data;
  }
  
  async getVEServices(veId: string): Promise<Service[]> {
    const response = await this.client.get(`/api/ves/${veId}/services`);
    return response.data;
  }
  
  // Services
  async getService(serviceId: string): Promise<Service> {
    const response = await this.client.get(`/api/services/${serviceId}`);
    return response.data;
  }
  
  async updateServiceConfig(serviceId: string, config: ServiceConfig): Promise<Service> {
    const response = await this.client.put(`/api/services/${serviceId}/config`, config);
    return response.data;
  }
  
  // Deployments
  async startDeployment(deployment: DeploymentRequest): Promise<DeploymentJob> {
    const response = await this.client.post('/api/deployments', deployment);
    return response.data;
  }
  
  async getDeploymentHistory(filters?: HistoryFilters): Promise<DeploymentHistory[]> {
    const response = await this.client.get('/api/deployments/history', { params: filters });
    return response.data;
  }
  
  private setupInterceptors() {
    // Request interceptor for auth tokens
    this.client.interceptors.request.use(
      (config) => {
        // Add auth headers
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // Global error handling
        return Promise.reject(error);
      }
    );
  }
}

export const apiService = new GriffinApiService();
```

```typescript
// React Query hooks
export const useVirtualEnvironments = () => {
  return useQuery({
    queryKey: ['ves'],
    queryFn: () => apiService.getVirtualEnvironments(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useVEServices = (veId: string) => {
  return useQuery({
    queryKey: ['ve-services', veId],
    queryFn: () => apiService.getVEServices(veId),
    enabled: !!veId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useService = (serviceId: string) => {
  return useQuery({
    queryKey: ['service', serviceId],
    queryFn: () => apiService.getService(serviceId),
    enabled: !!serviceId,
  });
};

export const useDeploymentMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (deployment: DeploymentRequest) => 
      apiService.startDeployment(deployment),
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries(['deployments']);
      queryClient.invalidateQueries(['ve-services']);
    },
    onError: (error) => {
      // Handle deployment errors
      console.error('Deployment failed:', error);
    }
  });
};
```

## Routing Architecture

```typescript
// Route configuration
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'ves',
        children: [
          {
            index: true,
            element: <VEManagementPage />
          },
          {
            path: ':veId',
            element: <VEDetailPage />,
            children: [
              {
                path: 'services/:serviceId',
                element: <ServiceDetailPage />
              }
            ]
          }
        ]
      },
      {
        path: 'services',
        children: [
          {
            index: true,
            element: <ServicesManagementPage />
          },
          {
            path: ':serviceId',
            element: <ServiceDetailPage />
          }
        ]
      },
      {
        path: 'deployments',
        children: [
          {
            index: true,
            element: <DeploymentHistoryPage />
          },
          {
            path: ':deploymentId',
            element: <DeploymentDetailPage />
          }
        ]
      }
    ]
  }
]);

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FluentProvider theme={webLightTheme}>
        <RouterProvider router={router} />
      </FluentProvider>
    </QueryClientProvider>
  );
};
```

## Custom Hooks

```typescript
// Sidebar management hook
export const useSidebar = () => {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return {
    isCollapsed: sidebarCollapsed,
    isMobile,
    toggle: toggleSidebar,
    shouldShowOverlay: isMobile && !sidebarCollapsed
  };
};

// Favorites management hook
export const useFavorites = () => {
  const { favorites, addFavorite, removeFavorite } = useAppStore();
  
  const toggleFavorite = useCallback((type: 've' | 'service', id: string) => {
    const isFavorite = favorites[type === 've' ? 'ves' : 'services'].includes(id);
    
    if (isFavorite) {
      removeFavorite(type, id);
    } else {
      addFavorite(type, id);
    }
  }, [favorites, addFavorite, removeFavorite]);
  
  const isFavorite = useCallback((type: 've' | 'service', id: string) => {
    return favorites[type === 've' ? 'ves' : 'services'].includes(id);
  }, [favorites]);
  
  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
};

// Deployment management hook
export const useDeployment = () => {
  const deploymentStore = useDeploymentStore();
  const deploymentMutation = useDeploymentMutation();
  
  const startBulkDeployment = useCallback(async (
    services: string[],
    config: DeploymentConfig
  ) => {
    try {
      await deploymentMutation.mutateAsync({
        services,
        config
      });
      deploymentStore.clearSelection();
    } catch (error) {
      console.error('Bulk deployment failed:', error);
      throw error;
    }
  }, [deploymentMutation, deploymentStore]);
  
  return {
    ...deploymentStore,
    startBulkDeployment,
    isDeploying: deploymentMutation.isLoading
  };
};
```

## Error Handling & Loading States

```typescript
// Error boundary component
class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ComponentType<{ error: Error }> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service
  }
  
  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} />;
    }
    
    return this.props.children;
  }
}

// Loading component with skeleton
const LoadingState: React.FC<{ type: 'table' | 'cards' | 'page' }> = ({ type }) => {
  return (
    <div className="loading-state">
      {type === 'table' && <TableSkeleton />}
      {type === 'cards' && <CardsSkeleton />}
      {type === 'page' && <PageSkeleton />}
    </div>
  );
};
```

## Performance Optimizations

```typescript
// Memoized components
export const ServiceCard = React.memo<ServiceCardProps>(({ service, ...props }) => {
  // Component implementation
}, (prevProps, nextProps) => {
  // Custom comparison logic
  return prevProps.service.id === nextProps.service.id &&
         prevProps.service.status === nextProps.service.status;
});

// Virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window';

const VirtualizedServiceList: React.FC<{ services: Service[] }> = ({ services }) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <ServiceCard service={services[index]} />
    </div>
  );
  
  return (
    <List
      height={600}
      itemCount={services.length}
      itemSize={120}
      width="100%"
    >
      {Row}
    </List>
  );
};

// Code splitting for routes
const VEManagementPage = React.lazy(() => import('./pages/ve-management/VEManagementPage'));
const ServiceDetailPage = React.lazy(() => import('./pages/services/ServiceDetailPage'));
```

## Build and Development Configuration

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          fluentui: ['@fluentui/react-components', '@fluentui/react-icons'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query']
        }
      }
    }
  }
});
```

This architecture provides a solid foundation for building a scalable, maintainable, and performant React application that addresses all the limitations identified in the prototype analysis while building upon the existing design patterns.
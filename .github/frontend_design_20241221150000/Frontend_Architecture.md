# Frontend Architecture Design

## Component Hierarchy
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx          // Main layout wrapper
│   │   ├── Sidebar.tsx            // Navigation sidebar
│   │   ├── Header.tsx             // Top navigation bar
│   │   └── PageHeader.tsx         // Breadcrumb + page title
│   ├── common/
│   │   ├── LoadingSpinner.tsx     // Loading states
│   │   ├── ErrorBoundary.tsx      // Error handling
│   │   ├── StatusBadge.tsx        // Status indicators
│   │   ├── SearchInput.tsx        // Search with filters
│   │   ├── FilterDropdown.tsx     // Filter components
│   │   ├── Pagination.tsx         // Table pagination
│   │   └── NotificationToast.tsx  // Toast notifications
│   ├── cards/
│   │   ├── VECard.tsx             // VE overview cards
│   │   ├── ServiceCard.tsx        // Service overview cards
│   │   ├── StatsCard.tsx          // Dashboard statistics
│   │   └── PipelineCard.tsx       // Pipeline information
│   ├── tables/
│   │   ├── VETable.tsx            // VE listing table
│   │   ├── ServiceTable.tsx       // Service listing table
│   │   └── DataTable.tsx          // Generic reusable table
│   ├── modals/
│   │   ├── BulkDeployModal.tsx    // Bulk deployment confirmation
│   │   ├── PipelineModal.tsx      // Pipeline management
│   │   ├── ConfigEditorModal.tsx  // Service configuration
│   │   └── DeploymentModal.tsx    // Single deployment
│   └── forms/
│       ├── DeploymentForm.tsx     // Deployment options
│       ├── QuickDeployForm.tsx    // Quick deploy controls
│       └── FilterForm.tsx         // Advanced filtering
├── pages/
│   ├── Dashboard.tsx              // Dashboard overview
│   ├── VEManagement.tsx           // VE listing page
│   ├── VEDetail.tsx               // Individual VE details
│   ├── ServicesManagement.tsx     // Services listing
│   ├── ServiceDetail.tsx          // Service cross-VE view
│   ├── VEServiceDetail.tsx        // Service within specific VE
│   └── DeploymentHistory.tsx      // Deployment logs
├── hooks/
│   ├── useAPI.ts                  // Generic API hook
│   ├── useVEs.ts                  // VE data management
│   ├── useServices.ts             // Service data management
│   ├── useDeployment.ts           // Deployment operations
│   ├── useFavorites.ts            // Favorites management
│   └── useNotifications.ts        // Toast notifications
├── store/
│   ├── index.ts                   // Store configuration
│   ├── slices/
│   │   ├── veSlice.ts             // VE state management
│   │   ├── serviceSlice.ts        // Service state management
│   │   ├── uiSlice.ts             // UI state (selections, filters)
│   │   └── deploymentSlice.ts     // Deployment tracking
│   └── middleware/
│       └── apiMiddleware.ts       // API call handling
├── services/
│   ├── api.ts                     // Axios configuration
│   ├── veAPI.ts                   // VE-related endpoints
│   ├── serviceAPI.ts              // Service-related endpoints
│   └── deploymentAPI.ts           // Deployment endpoints
├── types/
│   ├── VE.ts                      // VE type definitions
│   ├── Service.ts                 // Service type definitions
│   ├── Deployment.ts              // Deployment type definitions
│   └── API.ts                     // API response types
└── utils/
    ├── constants.ts               // App constants
    ├── helpers.ts                 // Utility functions
    └── theme.ts                   // Fluent UI theme config

## State Management Strategy
Redux Toolkit + RTK Query

- Central State: VEs, Services, UI state, deployments
- Async Operations: RTK Query for API calls with caching
- Local State: Form state, modal visibility using React state

### State Structure
```js
interface AppState {
  ve: {
    list: VE[];
    selected: string[];
    favorites: string[];
    filters: VEFilters;
  };
  service: {
    list: Service[];
    byVE: Record<string, Service[]>;
    selected: string[];
    favorites: string[];
    filters: ServiceFilters;
  };
  ui: {
    sidebar: { open: boolean };
    modals: Record<string, boolean>;
    notifications: Toast[];
    loading: Record<string, boolean>;
  };
  deployment: {
    history: Deployment[];
    active: Deployment[];
    progress: Record<string, DeploymentProgress>;
  };
}
```
## API Integration Design
### Service Layer
```js
// services/api.ts
const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

// Error handling interceptor
api.interceptors.response.use(
  response => response,
  error => {
    // Handle authentication, network errors
    return Promise.reject(error);
  }
);
```
### API Endpoints
```js
interface APIEndpoints {
  // VE Management
  getVEs: () => Promise<VE[]>;
  getVEDetail: (veName: string) => Promise<VEDetail>;
  getVEServices: (veName: string) => Promise<Service[]>;
  
  // Service Management
  getServices: () => Promise<Service[]>;
  getServiceDetail: (serviceName: string) => Promise<ServiceDetail>;
  getServiceVEs: (serviceName: string) => Promise<VE[]>;
  
  // Pipeline Management
  getServicePipelines: (serviceName: string) => Promise<Pipeline[]>;
  setDefaultPipeline: (serviceName: string, pipelineId: number) => Promise<void>;
  
  // Deployment
  deployService: (params: DeploymentParams) => Promise<DeploymentResult>;
  bulkDeploy: (params: BulkDeploymentParams) => Promise<DeploymentResult[]>;
  getDeploymentStatus: (deploymentId: string) => Promise<DeploymentStatus>;
  getDeploymentHistory: () => Promise<Deployment[]>;
  
  // Configuration
  updateServiceConfig: (serviceName: string, config: ServiceConfig) => Promise<void>;
  
  // User Preferences
  getFavorites: () => Promise<UserFavorites>;
  updateFavorites: (favorites: UserFavorites) => Promise<void>;
}
```

## Error Handling Strategy
```js
enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DEPLOYMENT_ERROR = 'DEPLOYMENT_ERROR',
  CONFIG_ERROR = 'CONFIG_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED'
}

interface AppError {
  type: ErrorType;
  message: string;
  details?: any;
  context?: string;
}
```
### Error Boundary Implementation
```js
// Global error boundary with user-friendly messages
// Specific error handling for deployment failures
// Network error retry mechanisms
// Validation error display in forms
```
## Performance Considerations
### Optimization Strategies
1. Code Splitting: Route-based lazy loading
2. Memoization: React.memo for expensive components
3. Virtual Scrolling: For large VE/Service lists
4. Debounced Search: Prevent excessive API calls
5. Caching: RTK Query caching for frequently accessed data
6. Bundle Analysis: Webpack bundle analyzer for size optimization
### Loading States
```js
interface LoadingStates {
  pageLoading: boolean;
  dataLoading: boolean;
  actionLoading: Record<string, boolean>;
  deploymentLoading: Record<string, boolean>;
}
```
## Styling Architecture
Fluent UI v9 + Tailwind CSS Integration
```js
// Theme configuration
const fluentTheme = {
  colorBrandBackground: '#0f6cbd',
  colorBrandForeground1: '#0f6cbd',
  // ... other Fluent UI tokens
};

// Tailwind integration for spacing, layout
// Fluent components for interactive elements
// Custom CSS modules for complex layouts
```
## Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Sidebar collapse on mobile
- Card/table responsive switching
- Touch-friendly interactive elements




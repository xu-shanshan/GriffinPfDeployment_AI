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
griffin-pf-frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Basic UI elements
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Card/
│   │   │   ├── Table/
│   │   │   └── index.ts
│   │   ├── layout/          # Layout components
│   │   │   ├── AppLayout/
│   │   │   │   ├── AppLayout.tsx
│   │   │   │   ├── AppLayout.module.css
│   │   │   │   └── index.ts
│   │   │   ├── NavigationSidebar/
│   │   │   ├── AppHeader/
│   │   │   ├── Breadcrumb/
│   │   │   └── index.ts
│   │   ├── data/            # Data display components
│   │   │   ├── ServiceCard/
│   │   │   ├── VECard/
│   │   │   ├── DeploymentCard/
│   │   │   ├── DataTable/
│   │   │   ├── StatusBadge/
│   │   │   └── index.ts
│   │   ├── forms/           # Form components with validation
│   │   │   ├── SearchAndFilter/
│   │   │   ├── ServiceForm/
│   │   │   ├── DeploymentForm/
│   │   │   └── index.ts
│   │   └── common/          # Common components
│   │       ├── LoadingState/
│   │       ├── ErrorBoundary/
│   │       ├── EmptyState/
│   │       └── index.ts
│   ├── pages/               # Route components
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── components/
│   │   │   │   ├── DashboardStats/
│   │   │   │   ├── RecentDeployments/
│   │   │   │   └── QuickActions/
│   │   │   └── index.ts
│   │   ├── VEManagement/
│   │   │   ├── VEManagementPage.tsx
│   │   │   ├── VEDetailPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── VEList/
│   │   │   │   ├── VEServiceGrid/
│   │   │   │   └── VEMetrics/
│   │   │   └── index.ts
│   │   ├── Services/
│   │   │   ├── ServicesManagementPage.tsx
│   │   │   ├── ServiceDetailPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── ServiceList/
│   │   │   │   ├── ServiceConfig/
│   │   │   │   └── ServiceHistory/
│   │   │   └── index.ts
│   │   └── Deployment/
│   │       ├── DeploymentHistoryPage.tsx
│   │       ├── DeploymentDetailPage.tsx
│   │       ├── components/
│   │       │   ├── DeploymentList/
│   │       │   ├── DeploymentProgress/
│   │       │   └── DeploymentLogs/
│   │       └── index.ts
│   ├── hooks/               # Custom React hooks
│   │   ├── useSidebar.ts
│   │   ├── useFavorites.ts
│   │   ├── useDeployment.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── index.ts
│   ├── services/            # API service layer
│   │   ├── api/
│   │   │   ├── client.ts           # API client configuration
│   │   │   ├── types.ts            # API response types
│   │   │   ├── endpoints.ts        # API endpoints
│   │   │   └── mockClient.ts       # Mock API client
│   │   ├── queries/
│   │   │   ├── veQueries.ts        # Virtual Environment queries
│   │   │   ├── serviceQueries.ts   # Service queries
│   │   │   ├── deploymentQueries.ts # Deployment queries
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── stores/              # Zustand stores
│   │   ├── appStore.ts             # Global app state
│   │   ├── deploymentStore.ts      # Deployment state
│   │   ├── userPreferencesStore.ts # User preferences
│   │   └── index.ts
│   ├── types/               # TypeScript type definitions
│   │   ├── api.ts                  # API types
│   │   ├── common.ts               # Common types
│   │   ├── ve.ts                   # Virtual Environment types
│   │   ├── service.ts              # Service types
│   │   ├── deployment.ts           # Deployment types
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   ├── formatters.ts           # Data formatters
│   │   ├── validators.ts           # Form validators
│   │   ├── constants.ts            # App constants
│   │   ├── helpers.ts              # Helper functions
│   │   └── index.ts
│   ├── styles/              # Global styles
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── components.css
│   ├── assets/              # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── __tests__/           # Test files
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── setup.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── .env.development
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── eslint.config.js
├── prettier.config.js
└── README.md
```

## Mock API Client

Since we're starting with frontend development first, here's a comprehensive mock API client that simulates the backend functionality:

### Mock Data Structures

```typescript
// Mock data for development and testing
export const mockVirtualEnvironments: VirtualEnvironment[] = [
  {
    id: 've-001',
    name: 'Development Environment',
    description: 'Primary development environment for testing',
    status: 'active',
    region: 'us-east-1',
    provider: 'aws',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-12-20T14:30:00Z',
    resources: {
      cpu: { allocated: 16, used: 8 },
      memory: { allocated: 32, used: 18 },
      storage: { allocated: 500, used: 245 }
    },
    serviceCount: 12,
    tags: ['development', 'primary']
  },
  {
    id: 've-002',
    name: 'Staging Environment',
    description: 'Pre-production staging environment',
    status: 'active',
    region: 'us-west-2',
    provider: 'aws',
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-12-19T16:45:00Z',
    resources: {
      cpu: { allocated: 24, used: 15 },
      memory: { allocated: 48, used: 32 },
      storage: { allocated: 1000, used: 678 }
    },
    serviceCount: 8,
    tags: ['staging', 'pre-production']
  },
  {
    id: 've-003',
    name: 'Production Environment',
    description: 'Live production environment',
    status: 'active',
    region: 'eu-west-1',
    provider: 'azure',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-12-21T10:15:00Z',
    resources: {
      cpu: { allocated: 64, used: 48 },
      memory: { allocated: 128, used: 89 },
      storage: { allocated: 2000, used: 1234 }
    },
    serviceCount: 15,
    tags: ['production', 'critical']
  }
];

export const mockServices: Service[] = [
  {
    id: 'svc-001',
    name: 'User Authentication Service',
    description: 'Handles user authentication and authorization',
    version: '2.1.4',
    status: 'running',
    veId: 've-001',
    type: 'microservice',
    port: 8080,
    healthEndpoint: '/health',
    replicas: { desired: 3, running: 3 },
    resources: {
      cpu: '500m',
      memory: '1Gi',
      storage: '10Gi'
    },
    dependencies: ['svc-004', 'svc-007'],
    lastDeployment: {
      id: 'dep-001',
      timestamp: '2024-12-20T09:30:00Z',
      status: 'success',
      duration: 180
    },
    metrics: {
      uptime: '99.98%',
      responseTime: 45,
      requestsPerSecond: 1234,
      errorRate: 0.02
    },
    tags: ['auth', 'security', 'critical']
  },
  {
    id: 'svc-002',
    name: 'API Gateway',
    description: 'Main API gateway for routing requests',
    version: '1.8.2',
    status: 'running',
    veId: 've-001',
    type: 'gateway',
    port: 80,
    healthEndpoint: '/api/health',
    replicas: { desired: 2, running: 2 },
    resources: {
      cpu: '1000m',
      memory: '2Gi',
      storage: '5Gi'
    },
    dependencies: [],
    lastDeployment: {
      id: 'dep-002',
      timestamp: '2024-12-19T14:15:00Z',
      status: 'success',
      duration: 120
    },
    metrics: {
      uptime: '99.95%',
      responseTime: 25,
      requestsPerSecond: 5678,
      errorRate: 0.05
    },
    tags: ['gateway', 'routing', 'critical']
  },
  {
    id: 'svc-003',
    name: 'Data Processing Service',
    description: 'Processes and transforms data streams',
    version: '3.2.1',
    status: 'deploying',
    veId: 've-002',
    type: 'processor',
    port: 8090,
    healthEndpoint: '/status',
    replicas: { desired: 5, running: 3 },
    resources: {
      cpu: '2000m',
      memory: '4Gi',
      storage: '50Gi'
    },
    dependencies: ['svc-006'],
    lastDeployment: {
      id: 'dep-003',
      timestamp: '2024-12-21T11:00:00Z',
      status: 'in-progress',
      duration: null
    },
    metrics: {
      uptime: '99.92%',
      responseTime: 150,
      requestsPerSecond: 892,
      errorRate: 0.08
    },
    tags: ['processing', 'data', 'batch']
  }
];

export const mockDeploymentHistory: DeploymentHistory[] = [
  {
    id: 'dep-001',
    services: ['svc-001'],
    veId: 've-001',
    status: 'success',
    startTime: '2024-12-20T09:30:00Z',
    endTime: '2024-12-20T09:33:00Z',
    duration: 180,
    triggeredBy: 'john.doe@company.com',
    type: 'update',
    config: {
      strategy: 'rolling',
      healthCheckTimeout: 300,
      rollbackOnFailure: true
    },
    logs: [
      { timestamp: '2024-12-20T09:30:15Z', level: 'info', message: 'Starting deployment for User Authentication Service' },
      { timestamp: '2024-12-20T09:31:00Z', level: 'info', message: 'Pulling container image: auth-service:2.1.4' },
      { timestamp: '2024-12-20T09:31:30Z', level: 'info', message: 'Rolling update started - 1/3 replicas' },
      { timestamp: '2024-12-20T09:32:15Z', level: 'info', message: 'Health check passed for replica 1' },
      { timestamp: '2024-12-20T09:32:45Z', level: 'info', message: 'Rolling update completed - 3/3 replicas' },
      { timestamp: '2024-12-20T09:33:00Z', level: 'success', message: 'Deployment completed successfully' }
    ]
  },
  {
    id: 'dep-002',
    services: ['svc-002', 'svc-004'],
    veId: 've-001',
    status: 'success',
    startTime: '2024-12-19T14:15:00Z',
    endTime: '2024-12-19T14:17:00Z',
    duration: 120,
    triggeredBy: 'jane.smith@company.com',
    type: 'update',
    config: {
      strategy: 'blue-green',
      healthCheckTimeout: 180,
      rollbackOnFailure: true
    },
    logs: []
  },
  {
    id: 'dep-003',
    services: ['svc-003'],
    veId: 've-002',
    status: 'in-progress',
    startTime: '2024-12-21T11:00:00Z',
    endTime: null,
    duration: null,
    triggeredBy: 'auto-deploy',
    type: 'update',
    config: {
      strategy: 'rolling',
      healthCheckTimeout: 300,
      rollbackOnFailure: true
    },
    logs: [
      { timestamp: '2024-12-21T11:00:05Z', level: 'info', message: 'Starting deployment for Data Processing Service' },
      { timestamp: '2024-12-21T11:00:30Z', level: 'info', message: 'Pulling container image: data-processor:3.2.1' },
      { timestamp: '2024-12-21T11:01:15Z', level: 'info', message: 'Rolling update started - 1/5 replicas' }
    ]
  }
];
```

### Mock API Client Implementation

```typescript
// services/api/mockClient.ts
import { 
  VirtualEnvironment, 
  Service, 
  DeploymentHistory, 
  DeploymentRequest,
  DeploymentJob,
  ServiceConfig,
  HistoryFilters 
} from '@/types';

class MockGriffinApiClient {
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Simulate network latency
  private async simulateNetworkDelay() {
    const delay = Math.random() * 1000 + 200; // 200-1200ms
    await this.delay(delay);
  }
  
  // Simulate occasional errors for testing
  private shouldSimulateError(errorRate = 0.05): boolean {
    return Math.random() < errorRate;
  }
  
  // Virtual Environments API
  async getVirtualEnvironments(): Promise<VirtualEnvironment[]> {
    await this.simulateNetworkDelay();
    
    if (this.shouldSimulateError()) {
      throw new Error('Failed to fetch virtual environments');
    }
    
    return [...mockVirtualEnvironments];
  }
  
  async getVirtualEnvironment(veId: string): Promise<VirtualEnvironment> {
    await this.simulateNetworkDelay();
    
    const ve = mockVirtualEnvironments.find(v => v.id === veId);
    if (!ve) {
      throw new Error(`Virtual environment ${veId} not found`);
    }
    
    return { ...ve };
  }
  
  async getVEServices(veId: string): Promise<Service[]> {
    await this.simulateNetworkDelay();
    
    if (this.shouldSimulateError()) {
      throw new Error(`Failed to fetch services for VE ${veId}`);
    }
    
    return mockServices.filter(service => service.veId === veId);
  }
  
  // Services API
  async getServices(filters?: { veId?: string; status?: string; search?: string }): Promise<Service[]> {
    await this.simulateNetworkDelay();
    
    if (this.shouldSimulateError()) {
      throw new Error('Failed to fetch services');
    }
    
    let filteredServices = [...mockServices];
    
    if (filters?.veId) {
      filteredServices = filteredServices.filter(s => s.veId === filters.veId);
    }
    
    if (filters?.status) {
      filteredServices = filteredServices.filter(s => s.status === filters.status);
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredServices = filteredServices.filter(s => 
        s.name.toLowerCase().includes(searchLower) ||
        s.description.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredServices;
  }
  
  async getService(serviceId: string): Promise<Service> {
    await this.simulateNetworkDelay();
    
    const service = mockServices.find(s => s.id === serviceId);
    if (!service) {
      throw new Error(`Service ${serviceId} not found`);
    }
    
    return { ...service };
  }
  
  async updateServiceConfig(serviceId: string, config: Partial<ServiceConfig>): Promise<Service> {
    await this.simulateNetworkDelay();
    
    if (this.shouldSimulateError(0.1)) {
      throw new Error(`Failed to update configuration for service ${serviceId}`);
    }
    
    const serviceIndex = mockServices.findIndex(s => s.id === serviceId);
    if (serviceIndex === -1) {
      throw new Error(`Service ${serviceId} not found`);
    }
    
    // Simulate configuration update
    const updatedService = {
      ...mockServices[serviceIndex],
      ...config,
      updatedAt: new Date().toISOString()
    };
    
    mockServices[serviceIndex] = updatedService;
    return { ...updatedService };
  }
  
  async restartService(serviceId: string): Promise<Service> {
    await this.simulateNetworkDelay();
    
    if (this.shouldSimulateError(0.05)) {
      throw new Error(`Failed to restart service ${serviceId}`);
    }
    
    const serviceIndex = mockServices.findIndex(s => s.id === serviceId);
    if (serviceIndex === -1) {
      throw new Error(`Service ${serviceId} not found`);
    }
    
    // Simulate service restart
    mockServices[serviceIndex] = {
      ...mockServices[serviceIndex],
      status: 'restarting',
      updatedAt: new Date().toISOString()
    };
    
    // Simulate restart completion after delay
    setTimeout(() => {
      if (mockServices[serviceIndex]) {
        mockServices[serviceIndex].status = 'running';
      }
    }, 5000);
    
    return { ...mockServices[serviceIndex] };
  }
  
  // Deployments API
  async startDeployment(deployment: DeploymentRequest): Promise<DeploymentJob> {
    await this.simulateNetworkDelay();
    
    if (this.shouldSimulateError(0.08)) {
      throw new Error('Failed to start deployment');
    }
    
    const deploymentJob: DeploymentJob = {
      id: `dep-${Date.now()}`,
      services: deployment.services,
      veId: deployment.veId,
      status: 'queued',
      startTime: new Date().toISOString(),
      endTime: null,
      duration: null,
      triggeredBy: deployment.triggeredBy || 'unknown',
      type: deployment.type || 'update',
      config: deployment.config,
      logs: [
        {
          timestamp: new Date().toISOString(),
          level: 'info',
          message: `Deployment queued for ${deployment.services.length} service(s)`
        }
      ]
    };
    
    // Add to mock deployment history
    mockDeploymentHistory.unshift(deploymentJob);
    
    // Simulate deployment progress
    this.simulateDeploymentProgress(deploymentJob);
    
    return deploymentJob;
  }
  
  private async simulateDeploymentProgress(job: DeploymentJob) {
    // Update to in-progress
    setTimeout(() => {
      job.status = 'in-progress';
      job.logs.push({
        timestamp: new Date().toISOString(),
        level: 'info',
        message: 'Deployment started'
      });
    }, 2000);
    
    // Simulate completion
    const duration = Math.random() * 300000 + 60000; // 1-6 minutes
    setTimeout(() => {
      job.status = Math.random() > 0.1 ? 'success' : 'failed';
      job.endTime = new Date().toISOString();
      job.duration = Math.floor(duration / 1000);
      job.logs.push({
        timestamp: new Date().toISOString(),
        level: job.status === 'success' ? 'success' : 'error',
        message: job.status === 'success' ? 'Deployment completed successfully' : 'Deployment failed'
      });
      
      // Update service statuses
      if (job.status === 'success') {
        job.services.forEach(serviceId => {
          const service = mockServices.find(s => s.id === serviceId);
          if (service) {
            service.status = 'running';
            service.lastDeployment = {
              id: job.id,
              timestamp: job.endTime!,
              status: 'success',
              duration: job.duration!
            };
          }
        });
      }
    }, duration);
  }
  
  async cancelDeployment(jobId: string): Promise<void> {
    await this.simulateNetworkDelay();
    
    const deployment = mockDeploymentHistory.find(d => d.id === jobId);
    if (!deployment) {
      throw new Error(`Deployment ${jobId} not found`);
    }
    
    if (deployment.status !== 'in-progress' && deployment.status !== 'queued') {
      throw new Error(`Cannot cancel deployment with status: ${deployment.status}`);
    }
    
    deployment.status = 'cancelled';
    deployment.endTime = new Date().toISOString();
    deployment.logs.push({
      timestamp: new Date().toISOString(),
      level: 'warning',
      message: 'Deployment cancelled by user'
    });
  }
  
  async getDeploymentHistory(filters?: HistoryFilters): Promise<DeploymentHistory[]> {
    await this.simulateNetworkDelay();
    
    if (this.shouldSimulateError()) {
      throw new Error('Failed to fetch deployment history');
    }
    
    let filteredHistory = [...mockDeploymentHistory];
    
    if (filters?.veId) {
      filteredHistory = filteredHistory.filter(d => d.veId === filters.veId);
    }
    
    if (filters?.status) {
      filteredHistory = filteredHistory.filter(d => d.status === filters.status);
    }
    
    if (filters?.serviceId) {
      filteredHistory = filteredHistory.filter(d => 
        d.services.includes(filters.serviceId!)
      );
    }
    
    if (filters?.startDate) {
      filteredHistory = filteredHistory.filter(d => 
        new Date(d.startTime) >= new Date(filters.startDate!)
      );
    }
    
    if (filters?.endDate) {
      filteredHistory = filteredHistory.filter(d => 
        new Date(d.startTime) <= new Date(filters.endDate!)
      );
    }
    
    // Sort by start time (newest first)
    return filteredHistory.sort((a, b) => 
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    );
  }
  
  async getDeploymentLogs(deploymentId: string): Promise<LogEntry[]> {
    await this.simulateNetworkDelay();
    
    const deployment = mockDeploymentHistory.find(d => d.id === deploymentId);
    if (!deployment) {
      throw new Error(`Deployment ${deploymentId} not found`);
    }
    
    return [...deployment.logs];
  }
  
  // Dashboard API
  async getDashboardStats(): Promise<{
    totalVEs: number;
    totalServices: number;
    activeDeployments: number;
    successRate: number;
  }> {
    await this.simulateNetworkDelay();
    
    const activeDeployments = mockDeploymentHistory.filter(d => 
      d.status === 'in-progress' || d.status === 'queued'
    ).length;
    
    const recentDeployments = mockDeploymentHistory.filter(d => {
      const dayAgo = new Date();
      dayAgo.setDate(dayAgo.getDate() - 1);
      return new Date(d.startTime) >= dayAgo;
    });
    
    const successfulDeployments = recentDeployments.filter(d => d.status === 'success').length;
    const successRate = recentDeployments.length > 0 
      ? (successfulDeployments / recentDeployments.length) * 100 
      : 100;
    
    return {
      totalVEs: mockVirtualEnvironments.length,
      totalServices: mockServices.length,
      activeDeployments,
      successRate: Math.round(successRate * 100) / 100
    };
  }
  
  // Real-time updates simulation
  subscribeToDeploymentUpdates(callback: (update: DeploymentJob) => void): () => void {
    const interval = setInterval(() => {
      const activeDeployments = mockDeploymentHistory.filter(d => 
        d.status === 'in-progress' || d.status === 'queued'
      );
      
      if (activeDeployments.length > 0) {
        const randomDeployment = activeDeployments[
          Math.floor(Math.random() * activeDeployments.length)
        ];
        
        // Add a random log entry
        randomDeployment.logs.push({
          timestamp: new Date().toISOString(),
          level: 'info',
          message: `Processing step ${randomDeployment.logs.length}...`
        });
        
        callback(randomDeployment);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }
}

export const mockApiClient = new MockGriffinApiClient();
export default mockApiClient;
```

### Mock API Integration

```typescript
// services/api/client.ts - Development/Production API client selector
import mockApiClient from './mockClient';
import { ProductionApiClient } from './productionClient'; // Future implementation

const isDevelopment = import.meta.env.DEV;
const useMockApi = import.meta.env.VITE_USE_MOCK_API === 'true';

export const apiClient = (isDevelopment || useMockApi) 
  ? mockApiClient 
  : new ProductionApiClient();

export default apiClient;
```

This comprehensive mock API client provides:

1. **Realistic Data**: Mock data that represents real-world scenarios
2. **Network Simulation**: Random delays and error simulation
3. **State Management**: Maintains state across API calls
4. **Real-time Updates**: Simulates WebSocket-style updates
5. **Error Handling**: Various error scenarios for testing
6. **Filtering & Search**: Complete query parameter support
7. **Progressive Enhancement**: Easy switch to real API when ready

The mock client allows complete frontend development without backend dependencies while providing realistic behavior for testing and demonstration purposes.

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
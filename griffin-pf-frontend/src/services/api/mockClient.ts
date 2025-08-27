import { 
  VirtualEnvironment, 
  Service, 
  DeploymentHistory, 
  DeploymentRequest,
  DeploymentJob,
  ServiceConfig,
  HistoryFilters,
  LogEntry
} from '@/types';

// Mock data
const mockVirtualEnvironments: VirtualEnvironment[] = [
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
  }
];

const mockServices: Service[] = [
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
  }
];

const mockDeploymentHistory: DeploymentHistory[] = [
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
      { timestamp: '2024-12-20T09:33:00Z', level: 'success', message: 'Deployment completed successfully' }
    ]
  }
];

class MockGriffinApiClient {
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  private async simulateNetworkDelay() {
    const delay = Math.random() * 1000 + 200;
    await this.delay(delay);
  }
  
  private shouldSimulateError(errorRate = 0.05): boolean {
    return Math.random() < errorRate;
  }
  
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
    
    mockDeploymentHistory.unshift(deploymentJob);
    this.simulateDeploymentProgress(deploymentJob);
    
    return deploymentJob;
  }
  
  private async simulateDeploymentProgress(job: DeploymentJob) {
    setTimeout(() => {
      job.status = 'in-progress';
      job.logs.push({
        timestamp: new Date().toISOString(),
        level: 'info',
        message: 'Deployment started'
      });
    }, 2000);
    
    const duration = Math.random() * 300000 + 60000;
    setTimeout(() => {
      job.status = Math.random() > 0.1 ? 'success' : 'failed';
      job.endTime = new Date().toISOString();
      job.duration = Math.floor(duration / 1000);
      job.logs.push({
        timestamp: new Date().toISOString(),
        level: job.status === 'success' ? 'success' : 'error',
        message: job.status === 'success' ? 'Deployment completed successfully' : 'Deployment failed'
      });
    }, duration);
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
    
    return filteredHistory.sort((a, b) => 
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    );
  }
  
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
}

export const mockApiClient = new MockGriffinApiClient();
export default mockApiClient;

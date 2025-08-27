export interface VirtualEnvironment {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  region: string;
  provider: 'aws' | 'azure' | 'gcp';
  createdAt: string;
  updatedAt: string;
  resources: {
    cpu: { allocated: number; used: number };
    memory: { allocated: number; used: number };
    storage: { allocated: number; used: number };
  };
  serviceCount: number;
  tags: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'running' | 'stopped' | 'deploying' | 'error' | 'restarting';
  veId: string;
  type: 'microservice' | 'gateway' | 'processor' | 'database';
  port: number;
  healthEndpoint: string;
  replicas: { desired: number; running: number };
  resources: {
    cpu: string;
    memory: string;
    storage: string;
  };
  dependencies: string[];
  lastDeployment?: {
    id: string;
    timestamp: string;
    status: 'success' | 'failed';
    duration: number;
  };
  metrics: {
    uptime: string;
    responseTime: number;
    requestsPerSecond: number;
    errorRate: number;
  };
  tags: string[];
}

export interface DeploymentJob {
  id: string;
  services: string[];
  veId: string;
  status: 'queued' | 'in-progress' | 'success' | 'failed' | 'cancelled';
  startTime: string;
  endTime: string | null;
  duration: number | null;
  triggeredBy: string;
  type: 'deploy' | 'update' | 'rollback';
  config: DeploymentConfig;
  logs: LogEntry[];
}

export interface DeploymentConfig {
  strategy: 'rolling' | 'blue-green' | 'canary';
  healthCheckTimeout: number;
  rollbackOnFailure: boolean;
}

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

export interface DeploymentRequest {
  services: string[];
  veId: string;
  triggeredBy?: string;
  type?: 'deploy' | 'update' | 'rollback';
  config: DeploymentConfig;
}

export type DeploymentHistory = DeploymentJob;

export interface HistoryFilters {
  veId?: string;
  status?: string;
  serviceId?: string;
  startDate?: string;
  endDate?: string;
}

export interface ServiceConfig {
  replicas?: number;
  resources?: {
    cpu?: string;
    memory?: string;
    storage?: string;
  };
  environmentVariables?: Record<string, string>;
}

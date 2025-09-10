export type VeType = 'B' | 'B2';
export type EnvironmentType = 'APE' | 'CPE';
export interface VirtualEnvironment {
  name: string;
  veType: VeType;
  environment: EnvironmentType;
  serviceCount: number;
  status: 'Healthy' | 'Deploying' | 'Attention';
  favorite?: boolean;
}
export interface ServiceSummary {
  name: string;
  modelType: 'ModelB' | 'ModelB2';
  veInstances: number;
  version?: string;
  status: 'Active' | 'NotDeployed' | 'Deploying' | 'Issue';
  favorite?: boolean;
}
export interface DeploymentRecord {
  id: number;
  timestamp: string;
  veName: string;
  services: readonly string[];
  status: 'Queued' | 'InProgress' | 'Success' | 'Failed';
  user: string;
  durationSec?: number;
}
export interface BuildInfo {
  serviceName: string;
  latestBuildId: number;
  latestVersion: string;
  dropPattern: string;
  pipelineId: number;
}
export interface PermissionSnapshot {
  roles: Record<string,'Admin'|'Operator'|'Viewer'>;
  allowedUsers: string[];
  allowedGroups: string[];
}
export interface CurrentUser {
  upn: string;
  displayName: string;
  role: 'Admin'|'Operator'|'Viewer';
}
export interface Kpi {
  id: string;
  label: string;
  value: number;
  accent?: 'brand'|'success'|'danger'|'warning';
  onClick?: () => void;
}

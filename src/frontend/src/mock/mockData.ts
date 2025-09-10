import { VirtualEnvironment, ServiceSummary, DeploymentRecord, BuildInfo, PermissionSnapshot, CurrentUser } from '../types/domain';

export const mockUser: CurrentUser = {
  upn: 'john.doe@contoso.com',
  displayName: 'John Doe',
  role: 'Admin'
};

export const permissionSnapshot: PermissionSnapshot = {
  roles: { 'john.doe@contoso.com':'Admin', 'oliver.ops@contoso.com':'Operator', 'jane.viewer@contoso.com':'Viewer' },
  allowedUsers: ['john.doe@contoso.com','oliver.ops@contoso.com'],
  allowedGroups: ['AME\\M365-SovFleet']
};

export const virtualEnvironments: VirtualEnvironment[] = [
  { name:'SovBase', veType:'B', environment:'APE', serviceCount:67, status:'Healthy', favorite:true },
  { name:'ModelBSov', veType:'B', environment:'APE', serviceCount:65, status:'Healthy' },
  { name:'OwaMailB2-SOV', veType:'B2', environment:'CPE', serviceCount:2, status:'Deploying', favorite:true },
  { name:'GraphConnectorsB2-SOV', veType:'B2', environment:'CPE', serviceCount:4, status:'Attention' }
];

export const services: ServiceSummary[] = [
  { name:'OwaMailB2', modelType:'ModelB2', veInstances:2, version:'20241220.5', status:'Active', favorite:true },
  { name:'GraphConnectors', modelType:'ModelB2', veInstances:2, status:'NotDeployed' },
  { name:'FlowControl', modelType:'ModelB2', veInstances:1, status:'Deploying' }
];

export const buildInfos: BuildInfo[] = [
  { serviceName:'OwaMailB2', latestBuildId:4101, latestVersion:'20241220.5', pipelineId:1418, dropPattern:'https://drops/acme/{serviceName}/{version}/artifact.zip' }
];

export const deploymentHistory: DeploymentRecord[] = [
  { id:1, timestamp:'2024-12-21T08:30:00Z', veName:'SovBase', services:['OwaMailB2'], status:'Success', user:'john.doe@contoso.com', durationSec:135 },
  { id:2, timestamp:'2024-12-21T06:45:00Z', veName:'ModelBSov', services:['OwaMailB2'], status:'Success', user:'john.doe@contoso.com', durationSec:272 },
  { id:3, timestamp:'2024-12-20T22:15:00Z', veName:'GraphConnectorsB2-SOV', services:['GraphConnectors'], status:'Failed', user:'oliver.ops@contoso.com', durationSec:68 }
];

export function canDeploy(userUpn: string): boolean {
  if (permissionSnapshot.roles[userUpn] === 'Admin') return true;
  if (permissionSnapshot.roles[userUpn] === 'Operator') {
    return permissionSnapshot.allowedUsers.includes(userUpn);
  }
  return false;
}

export function resolveDropUrl(serviceName: string): string {
  const bi = buildInfos.find(b=>b.serviceName===serviceName);
  if(!bi) return '(unavailable)';
  return bi.dropPattern.replace('{serviceName}', serviceName).replace('{version}', bi.latestVersion);
}

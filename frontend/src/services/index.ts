// Unified exports for all API services
export { dashboardApi } from './dashboardApi'
export { veApi } from './veApi'
export { serviceApi } from './serviceApi'
export { deploymentApi } from './deploymentApi'

// Export types for use in components
export type {
  DashboardStats,
  VEListResponse,
  ServiceListResponse,
  ServiceDetailResponse,
  DeploymentHistoryResponse,
  DeploymentCreateRequest,
  ConfigUpdateRequest
} from './types'

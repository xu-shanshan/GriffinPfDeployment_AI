export type VEType = "B Type" | "B2 Type"

export type ServiceStatus = 
  | "ready" 
  | "not-deployed" 
  | "prepared" 
  | "missing-pfgold" 
  | "config-error" 
  | "deployed"

export type DeploymentStatus = 
  | "pending" 
  | "running" 
  | "success" 
  | "failed" 
  | "cancelled"

export type BuildType = "RingPromotion" | "Incremental" | "Mainline"

export interface VEStats {
  total_services: number
  deployed_services: number
  dragon_services: number
  pfgold_services: number
  ready_to_deploy: number
}

export interface VEListItem {
  name: string
  description?: string
  ve_type: VEType
  group: string
  stats: VEStats
  is_favorite: boolean
  last_updated?: string
}

export interface DashboardStats {
  total_ves: number
  active_services: number
  recent_deployments: number
  success_rate: number
  favorite_ves: VEListItem[]
}

export interface SearchResults {
  items: VEListItem[]
  total_count: number
  page: number
  page_size: number
  has_next: boolean
  has_previous: boolean
}

export interface ServiceConfig {
  ppe_ve_name?: string
  build_path_pattern?: string
}

export interface PipelineInfo {
  id: number
  name: string
  status: ServiceStatus
  build_version?: string
  started_at?: string
  completed_at?: string
}

export interface ServiceResponse {
  id: string
  name: string
  description?: string
  status: ServiceStatus
  in_dragon: boolean
  in_pfgold: boolean
  current_version?: string
  pipelines: PipelineInfo[]
  config?: ServiceConfig
  ready_to_deploy: boolean
  last_deployment?: string
}

export interface VEResponse {
  name: string
  description?: string
  ve_type: VEType
  group: string
  services: ServiceResponse[]
  stats: VEStats
  is_favorite: boolean
  last_updated?: string
}

export interface SearchResults {
  items: VEListItem[]
  total_count: number
  page: number
  page_size: number
  has_next: boolean
  has_previous: boolean
}

export interface SearchFilters {
  query?: string
  ve_type?: VEType
  group?: string
  status?: ServiceStatus
  page?: number
  page_size?: number
}

export interface DashboardStats {
  total_ves: number
  active_services: number
  recent_deployments: number
  success_rate: number
  favorite_ves: VEListItem[]
}

export interface DeploymentRequest {
  ve_name: string
  service_names: string[]
  pipeline_id?: number
  build_version?: string
  force_deploy?: boolean
}

export interface DeploymentResponse {
  deployment_id: string
  ve_name: string
  service_names: string[]
  status: DeploymentStatus
  pipeline_id?: number
  build_version?: string
  started_at: string
  completed_at?: string
  logs: string[]
  error_message?: string
}

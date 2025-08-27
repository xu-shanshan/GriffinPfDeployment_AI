// Shared type definitions for API responses and requests

export interface DashboardStats {
  total_ves: number
  active_services: number
  recent_deployments: number
  success_rate: number
  favorite_ves: Array<{
    name: string
    description: string
    ve_type: string
    stats: {
      total_services: number
      deployed_services: number
      ready_to_deploy: number
    }
  }>
}

export interface VEListResponse {
  items: Array<{
    name: string
    description: string
    ve_type: string
    group: string
    stats: {
      total_services: number
      deployed_services: number
      dragon_services: number
      pfgold_services: number
      ready_to_deploy: number
    }
    is_favorite: boolean
    last_updated: string
  }>
  total_count: number
  page: number
  page_size: number
  has_next: boolean
  has_previous: boolean
}

export interface ServiceListResponse {
  services: Array<{
    id: string
    name: string
    description: string
    status: string
    in_dragon: boolean
    in_pfgold: boolean
    current_version: string | null
    pipeline: string | null
    pipeline_version: string | null
    icon: string
    icon_color: string
    ready_to_deploy: boolean
  }>
}

export interface ServiceDetailResponse {
  name: string
  description: string
  status: string
  version: string
  build_type: string
  service_type: string
  last_deploy: string
  active_pipelines: number
  is_favorite: boolean
  pipelines: Array<{
    id: number
    name: string
    description: string
    type: string
    is_default: boolean
    latest_build: string
    drop_url: string
    icon: string
  }>
  config: Record<string, any>
}

export interface DeploymentHistoryResponse {
  items: Array<{
    id: string
    ve_name: string
    service_names: string[]
    status: string
    started_at: string
    completed_at: string | null
    build_version: string
    deployed_by: string
    duration: string | null
  }>
  total_count: number
  page: number
  page_size: number
}

export interface DeploymentCreateRequest {
  service_names: string[]
  pipeline_id?: number
  build_version?: string
  ve_name: string
}

export interface ConfigUpdateRequest {
  config: Record<string, any>
  create_pr: boolean
}

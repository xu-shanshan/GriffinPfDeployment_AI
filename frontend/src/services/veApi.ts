import { apiClient } from './apiClient'
import type { VEListResponse, ServiceListResponse } from './types'

export const veApi = {
  getVEs: (params?: {
    search?: string
    ve_type?: string
    group?: string
  }): Promise<VEListResponse> => {
    const searchParams = new URLSearchParams()
    if (params?.search) searchParams.append('search', params.search)
    if (params?.ve_type) searchParams.append('ve_type', params.ve_type)
    if (params?.group) searchParams.append('group', params.group)
    
    const query = searchParams.toString()
    return apiClient.get<VEListResponse>(`/api/ve${query ? `?${query}` : ''}`)
  },

  getVEDetail: (veName: string) => {
    return apiClient.get(`/api/ve/${encodeURIComponent(veName)}`)
  },

  getVEServices: (veName: string, params?: {
    status?: string
    config_filter?: string
  }): Promise<ServiceListResponse> => {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.append('status', params.status)
    if (params?.config_filter) searchParams.append('config_filter', params.config_filter)
    
    const query = searchParams.toString()
    return apiClient.get<ServiceListResponse>(`/api/ve/${encodeURIComponent(veName)}/services${query ? `?${query}` : ''}`)
  }
}

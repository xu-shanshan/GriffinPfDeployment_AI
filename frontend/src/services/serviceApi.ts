import { apiClient } from './apiClient'
import type { ServiceDetailResponse, ConfigUpdateRequest } from './types'

export const serviceApi = {
  getServiceDetail: (serviceName: string, veName?: string): Promise<ServiceDetailResponse> => {
    const params = new URLSearchParams()
    if (veName) params.append('ve_name', veName)
    
    const query = params.toString()
    return apiClient.get<ServiceDetailResponse>(`/api/service/${encodeURIComponent(serviceName)}${query ? `?${query}` : ''}`)
  },

  updateServiceConfig: (serviceName: string, config: Record<string, any>, createPr: boolean = true) => {
    const requestData: ConfigUpdateRequest = {
      config,
      create_pr: createPr
    }
    return apiClient.put(`/api/service/${encodeURIComponent(serviceName)}/config`, requestData)
  },

  setDefaultPipeline: (serviceName: string, pipelineId: number) => {
    return apiClient.put(`/api/service/${encodeURIComponent(serviceName)}/pipeline/${pipelineId}/default`, {})
  }
}

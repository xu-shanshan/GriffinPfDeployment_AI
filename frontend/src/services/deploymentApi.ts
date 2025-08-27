import { apiClient } from './apiClient'
import type { DeploymentHistoryResponse, DeploymentCreateRequest } from './types'

export const deploymentApi = {
  getHistory: (params?: {
    ve_name?: string
    status?: string
    limit?: number
  }): Promise<DeploymentHistoryResponse> => {
    const searchParams = new URLSearchParams()
    if (params?.ve_name) searchParams.append('ve_name', params.ve_name)
    if (params?.status) searchParams.append('status', params.status)
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    
    const query = searchParams.toString()
    return apiClient.get<DeploymentHistoryResponse>(`/api/deployments${query ? `?${query}` : ''}`)
  },

  createDeployment: (deploymentData: DeploymentCreateRequest) => {
    return apiClient.post('/api/deployments', deploymentData)
  }
}

import { apiClient } from './apiClient'
import type { DashboardStats } from './types'

export const dashboardApi = {
  getStats: (): Promise<DashboardStats> => {
    return apiClient.get<DashboardStats>('/api/dashboard')
  }
}

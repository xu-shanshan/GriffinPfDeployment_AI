import { apiClient } from './apiClient'
import type { DashboardStats } from './types'

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    try {
      console.log('Fetching dashboard stats...')
      const data = await apiClient.get<DashboardStats>('/api/dashboard')
      console.log('Dashboard data received:', data)
      return data
    } catch (error) {
      console.error('Dashboard API error:', error)
      // 返回默认数据作为fallback
      return {
        total_ves: 0,
        active_services: 0,
        recent_deployments: 0,
        success_rate: 0,
        favorite_ves: []
      }
    }
  }
}

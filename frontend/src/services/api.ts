import axios from 'axios'
import type { 
  DashboardStats, 
  SearchResults
} from '../types/api'

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
})

// Request interceptor
api.interceptors.request.use((config) => {
  return config
})

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    throw error
  }
)

export const dashboardApi = {
  getStats: (): Promise<DashboardStats> => 
    api.get('/dashboard').then(res => res.data),
}

export const veApi = {
  getVEs: (): Promise<SearchResults> =>
    api.get('/ve').then(res => res.data),
}

export const deploymentApi = {
  getHistory: (): Promise<any> =>
    api.get('/deployments').then(res => res.data),
  
  deploy: (data: any): Promise<any> =>
    api.post('/deployments', data).then(res => res.data),
}

export default api


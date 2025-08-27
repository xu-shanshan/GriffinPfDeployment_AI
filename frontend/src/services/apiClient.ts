const API_BASE_URL = 'http://localhost:8000'

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    try {
      console.log(`🔄 API请求: ${API_BASE_URL}${endpoint}`)
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      
      console.log(`📊 响应状态: ${response.status}`)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ API错误: ${response.status} - ${errorText}`)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }
      
      const data = await response.json()
      console.log(`✅ 响应数据:`, data)
      return data
    } catch (error) {
      console.error('🚨 API调用失败:', error)
      throw error
    }
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    } catch (error) {
      console.error('API POST error:', error)
      throw error
    }
  },

  async put<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    } catch (error) {
      console.error('API PUT error:', error)
      throw error
    }
  }
}

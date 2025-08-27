export const config = {
  API_BASE_URL: 'http://localhost:8000',
  // 在生产环境中，这可以通过环境变量或构建时配置来设置
}

// 如果需要支持环境变量，可以这样做：
declare global {
  interface Window {
    ENV?: {
      REACT_APP_API_URL?: string
    }
  }
}

export const getApiUrl = (): string => {
  // 尝试从window.ENV获取（用于运行时配置）
  if (typeof window !== 'undefined' && window.ENV?.REACT_APP_API_URL) {
    return window.ENV.REACT_APP_API_URL
  }
  
  // 默认值
  return 'http://localhost:8000'
}

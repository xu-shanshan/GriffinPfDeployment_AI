import React from 'react'
import { Title2, Body1, Button } from '@fluentui/react-components'

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
  showHealthCheck?: boolean
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  title = "Error loading data", 
  message,
  onRetry,
  showHealthCheck = true
}) => {
  return (
    <div style={{ 
      padding: '48px',
      textAlign: 'center',
      color: '#d13438'
    }}>
      <Title2 style={{ marginBottom: '16px' }}>❌ {title}</Title2>
      <Body1 style={{ marginBottom: '16px' }}>
        错误信息: {message}
      </Body1>
      <div style={{ marginBottom: '24px' }}>
        <Body1>请检查：</Body1>
        <ul style={{ listStyle: 'disc', textAlign: 'left', maxWidth: '400px', margin: '16px auto' }}>
          <li>后端服务是否启动 (http://localhost:8000)</li>
          <li>网络连接是否正常</li>
          <li>浏览器控制台是否有错误信息</li>
        </ul>
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {onRetry && (
          <Button onClick={onRetry}>
            重试加载
          </Button>
        )}
        {showHealthCheck && (
          <Button 
            appearance="secondary" 
            onClick={() => window.open('http://localhost:8000/health', '_blank')}
          >
            检查后端状态
          </Button>
        )}
      </div>
    </div>
  )
}

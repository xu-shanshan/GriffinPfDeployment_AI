import React from 'react'
import { Title2, Body1 } from '@fluentui/react-components'

interface LoadingSpinnerProps {
  message?: string
  description?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading...", 
  description 
}) => {
  return (
    <div style={{ 
      padding: '48px', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '400px'
    }}>
      <Title2 style={{ marginBottom: '16px' }}>🔄 {message}</Title2>
      {description && <Body1>{description}</Body1>}
    </div>
  )
}

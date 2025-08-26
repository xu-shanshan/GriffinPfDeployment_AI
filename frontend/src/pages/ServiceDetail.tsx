import React from 'react'
import { useParams } from 'react-router-dom'
import { Title1, Body1, Card } from '@fluentui/react-components'

const ServiceDetail: React.FC = () => {
  const { serviceName } = useParams<{ serviceName: string }>()

  return (
    <div>
      <Title1>{serviceName} - Service Detail</Title1>
      <Body1>This page will display detailed service information and configuration.</Body1>
      <Card style={{ padding: '24px', marginTop: '24px' }}>
        <Body1>Service Detail functionality will be implemented here based on the HTML prototype.</Body1>
      </Card>
    </div>
  )
}

export default ServiceDetail

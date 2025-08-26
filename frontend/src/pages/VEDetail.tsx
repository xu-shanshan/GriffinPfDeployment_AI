import React from 'react'
import { useParams } from 'react-router-dom'
import { Title1, Body1, Card } from '@fluentui/react-components'

const VEDetail: React.FC = () => {
  const { veName } = useParams<{ veName: string }>()

  return (
    <div>
      <Title1>{veName} - Virtual Environment Detail</Title1>
      <Body1>This page will display detailed VE information and services management.</Body1>
      <Card style={{ padding: '24px', marginTop: '24px' }}>
        <Body1>VE Detail functionality will be implemented here based on the HTML prototype.</Body1>
      </Card>
    </div>
  )
}

export default VEDetail

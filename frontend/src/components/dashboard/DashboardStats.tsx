import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Title1, Body1 } from '@fluentui/react-components'
import {
  Database24Regular,
  HeartPulse24Regular,
  CloudArrowUp24Regular,
  DataTrending24Regular,
  Clock24Regular,
} from '@fluentui/react-icons'
import type { DashboardStats } from '../../services/types'

interface DashboardStatsProps {
  data: DashboardStats
  className?: string
}

export const DashboardStatsComponent: React.FC<DashboardStatsProps> = ({ data, className }) => {
  const navigate = useNavigate()

  return (
    <div className={className}>
      <Card 
        style={{ 
          padding: '24px', 
          cursor: 'pointer',
          transition: 'all 0.1s cubic-bezier(0.33, 0, 0.67, 1)',
        }}
        onClick={() => navigate('/ve-management')}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: '#e3f2fd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Database24Regular style={{ color: '#0f6cbd' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <Title1>{data.total_ves}</Title1>
            <Body1>Total VEs</Body1>
          </div>
        </div>
        <hr style={{ border: 'none', height: '1px', backgroundColor: '#e0e0e0', margin: '16px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ padding: '2px 8px', backgroundColor: '#dff6dd', color: '#107c10', fontSize: '12px', borderRadius: '12px' }}>
            +2 this month
          </span>
          <DataTrending24Regular style={{ color: '#107c10' }} fontSize={16} />
        </div>
      </Card>

      <Card style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: '#dff6dd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HeartPulse24Regular style={{ color: '#107c10' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <Title1>{data.active_services}</Title1>
            <Body1>Active Services</Body1>
          </div>
        </div>
        <hr style={{ border: 'none', height: '1px', backgroundColor: '#e0e0e0', margin: '16px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ padding: '2px 8px', backgroundColor: '#dff6dd', color: '#107c10', fontSize: '12px', borderRadius: '12px' }}>
            98.7% uptime
          </span>
          <div style={{ width: '8px', height: '8px', backgroundColor: '#107c10', borderRadius: '50%' }} />
        </div>
      </Card>

      <Card style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: '#fff4ce', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CloudArrowUp24Regular style={{ color: '#ca5010' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <Title1>{data.recent_deployments}</Title1>
            <Body1>Recent Deployments</Body1>
          </div>
        </div>
        <hr style={{ border: 'none', height: '1px', backgroundColor: '#e0e0e0', margin: '16px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ padding: '2px 8px', backgroundColor: '#e3f2fd', color: '#0f6cbd', fontSize: '12px', borderRadius: '12px' }}>
            Last 24 hours
          </span>
          <Clock24Regular style={{ color: '#0f6cbd' }} fontSize={16} />
        </div>
      </Card>
    </div>
  )
}

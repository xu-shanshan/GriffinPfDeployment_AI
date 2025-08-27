import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Title2, Body1, Button } from '@fluentui/react-components'
import { Star24Filled, ChevronRight24Regular, Server24Regular } from '@fluentui/react-icons'
import type { DashboardStats } from '../../services/types'

interface FavoriteVEsProps {
  data: DashboardStats
  className?: string
}

export const FavoriteVEs: React.FC<FavoriteVEsProps> = ({ data, className }) => {
  const navigate = useNavigate()

  return (
    <Card className={className}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Star24Filled style={{ color: '#faa06b' }} fontSize={20} />
          <Title2>Favorite Virtual Environments</Title2>
        </div>
        <Button appearance="subtle" onClick={() => navigate('/ve-management')}>
          View All
        </Button>
      </div>
      
      <div style={{ padding: '24px' }}>
        {data.favorite_ves && data.favorite_ves.length > 0 ? (
          data.favorite_ves.map((ve, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.1s cubic-bezier(0.33, 0, 0.67, 1)',
              }}
              onClick={() => navigate(`/ve/${ve.name}`)}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#e3f2fd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Server24Regular style={{ color: '#0f6cbd' }} fontSize={20} />
                </div>
                <div>
                  <Title2>{ve.name}</Title2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
                    <Body1>{ve.stats.total_services} services</Body1>
                    <span style={{ padding: '2px 8px', backgroundColor: '#f0f0f0', color: '#424242', fontSize: '12px', borderRadius: '12px' }}>
                      {ve.ve_type}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#424242' }}>
                <Body1>2 hours ago</Body1>
                <ChevronRight24Regular fontSize={16} />
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Body1 style={{ color: '#616161' }}>暂无收藏的虚拟环境</Body1>
          </div>
        )}
      </div>
    </Card>
  )
}

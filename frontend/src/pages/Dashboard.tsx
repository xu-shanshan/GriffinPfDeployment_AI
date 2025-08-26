import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import {
  makeStyles,
  Card,
  Title1,
  Title2,
  Body1,
  Button,
} from '@fluentui/react-components'
import {
  Database24Regular,
  HeartPulse24Regular,
  CloudArrowUp24Regular,
  Star24Filled,
  ChevronRight24Regular,
  DataTrending24Regular,
  Clock24Regular,
  Server24Regular,
} from '@fluentui/react-icons'
import { dashboardApi } from '../services/api'

const useStyles = makeStyles({
  header: {
    marginBottom: '32px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  statCard: {
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.1s cubic-bezier(0.33, 0, 0.67, 1)',
    ':hover': {
      boxShadow: '0 2px 4px rgba(0,0,0,0.14), 0 0px 2px rgba(0,0,0,0.12)',
    },
  },
  favoriteItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.1s cubic-bezier(0.33, 0, 0.67, 1)',
    ':hover': {
      backgroundColor: '#f9f9f9',
    },
  },
})

const Dashboard: React.FC = () => {
  const styles = useStyles()
  const navigate = useNavigate()

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardApi.getStats,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {/* Header */}
      <div className={styles.header}>
        <Title1>Good morning, John</Title1>
        <Body1>Here's what's happening with your virtual environments today.</Body1>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <Card 
          className={styles.statCard} 
          onClick={() => navigate('/ve-management')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#e3f2fd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Database24Regular style={{ color: '#0f6cbd' }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <Title1>{dashboardData?.total_ves || 0}</Title1>
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

        <Card className={styles.statCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#dff6dd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HeartPulse24Regular style={{ color: '#107c10' }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <Title1>{dashboardData?.active_services || 0}</Title1>
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

        <Card className={styles.statCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#fff4ce', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CloudArrowUp24Regular style={{ color: '#ca5010' }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <Title1>{dashboardData?.recent_deployments || 0}</Title1>
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

      {/* Favorite VEs */}
      <Card>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Star24Filled style={{ color: '#faa06b' }} fontSize={20} />
            <Title2>Favorite Virtual Environments</Title2>
          </div>
          <Button appearance="subtle">View All</Button>
        </div>
        
        <div style={{ padding: '24px' }}>
          {dashboardData?.favorite_ves?.map((ve, index) => (
            <div 
              key={index}
              className={styles.favoriteItem}
              onClick={() => navigate(`/ve-detail/${ve.name}`)}
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
          ))}
        </div>
      </Card>
    </div>
  )
}
export default Dashboard
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import {
  makeStyles,
  Card,
  Title1,
  Title2,
  Body1,
  Caption1,
  Button,
  SearchBox,
} from '@fluentui/react-components'
import {
  Database24Regular,
  Server24Regular,
  Mail24Regular,
  HeartPulse24Regular,
  Star24Filled,
  Star24Regular,
  ChevronRight24Regular,
  Search24Regular,
  Filter24Regular,
} from '@fluentui/react-icons'
import { veApi } from '../services/veApi'

const useStyles = makeStyles({
  header: {
    marginBottom: '32px',
  },
  searchCard: {
    marginBottom: '32px',
    padding: '24px',
  },
  veGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  veCard: {
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.1s cubic-bezier(0.33, 0, 0.67, 1)',
    ':hover': {
      boxShadow: '0 2px 4px rgba(0,0,0,0.14), 0 0px 2px rgba(0,0,0,0.12)',
      transform: 'translateY(-1px)',
    },
  },
  veHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  veIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  veStats: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
  statItem: {
    textAlign: 'center',
  },
  veFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '16px',
    borderTop: '1px solid #e0e0e0',
  },
})

const VEManagement: React.FC = () => {
  const styles = useStyles()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState(new Set(['SovBase', 'ModelBSov', 'OwaMailB2-SOV']))

  // 使用真实API而不是mock数据
  const { data: veData, isLoading, error } = useQuery({
    queryKey: ['ves', searchQuery],
    queryFn: () => veApi.getVEs({
      search: searchQuery || undefined
    }),
  })

  const toggleFavorite = (veName: string, event: React.MouseEvent) => {
    event.stopPropagation()
    const newFavorites = new Set(favorites)
    if (newFavorites.has(veName)) {
      newFavorites.delete(veName)
    } else {
      newFavorites.add(veName)
    }
    setFavorites(newFavorites)
  }

  const getVEIcon = (veName: string) => {
    if (veName.includes('Mail')) return <Mail24Regular />
    if (veName.includes('Graph')) return <HeartPulse24Regular />
    if (veName.includes('Flow')) return <HeartPulse24Regular />
    return <Server24Regular />
  }

  const getIconColor = (veName: string) => {
    if (veName.includes('Mail')) return { backgroundColor: '#dff6dd', color: '#107c10' }
    if (veName.includes('Graph')) return { backgroundColor: '#fff3e0', color: '#e65100' }
    if (veName.includes('Flow')) return { backgroundColor: '#e8f5e9', color: '#2e7d32' }
    if (veName === 'SovBase') return { backgroundColor: '#e3f2fd', color: '#0f6cbd' }
    return { backgroundColor: '#f3e5f5', color: '#5c2d91' }
  }

  if (isLoading) {
    return <div style={{ padding: '24px' }}>Loading...</div>
  }

  if (error) {
    return <div style={{ padding: '24px' }}>Error loading VE data: {error.message}</div>
  }

  // 使用API返回的数据
  const veList = veData?.items || []

  return (
    <div>
      {/* Header */}
      <div className={styles.header}>
        <Title1>Virtual Environment Management</Title1>
        <Body1>Manage and monitor all virtual environments and their services with precision.</Body1>
      </div>

      {/* Search and Filters */}
      <Card className={styles.searchCard}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <SearchBox
            placeholder="Search by VE name or Service name..."
            value={searchQuery}
            onChange={(_, data) => setSearchQuery(data.value)}
            contentBefore={<Search24Regular />}
            style={{ width: '320px' }}
          />
          <Button appearance="subtle">All Types</Button>
          <Button appearance="subtle">All Groups</Button>
          <Button 
            appearance="subtle" 
            onClick={() => setSearchQuery('')}
            icon={<Filter24Regular />}
          >
            Clear All
          </Button>
        </div>
      </Card>

      {/* VE Cards Grid */}
      <div className={styles.veGrid}>
        {veList.map((ve) => {
          const iconStyle = getIconColor(ve.name)
          return (
            <Card 
              key={ve.name}
              className={styles.veCard}
              onClick={() => navigate(`/ve/${ve.name}`)}
            >
              <div className={styles.veHeader}>
                <div className={styles.veIcon} style={iconStyle}>
                  {getVEIcon(ve.name)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    fontSize: '12px', 
                    fontWeight: '500',
                    backgroundColor: ve.ve_type === 'B2 Type' ? '#dff6dd' : '#f0f0f0',
                    color: ve.ve_type === 'B2 Type' ? '#107c10' : '#424242'
                  }}>
                    {ve.ve_type}
                  </span>
                  <button 
                    onClick={(e) => toggleFavorite(ve.name, e)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#faa06b' }}
                  >
                    {favorites.has(ve.name) ? <Star24Filled /> : <Star24Regular />}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <Title2 style={{ marginBottom: '8px' }}>{ve.name}</Title2>
                <Body1>{ve.description}</Body1>
              </div>

              <div className={styles.veStats}>
                <div className={styles.statItem}>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: '#242424' }}>
                    {ve.stats.deployed_services}
                  </div>
                  <Caption1>Deployment</Caption1>
                </div>
                <div className={styles.statItem}>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: '#0f6cbd' }}>
                    {ve.stats.dragon_services}
                  </div>
                  <Caption1>Griffin Services</Caption1>
                </div>
              </div>

              <div className={styles.veFooter}>
                <Body1>Click to explore</Body1>
                <ChevronRight24Regular style={{ color: '#616161' }} />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Body1>Showing 1-{veList.length} of {veData?.total_count || 0} virtual environments</Body1>
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button appearance="subtle" size="small">‹</Button>
          <Button appearance="primary" size="small">1</Button>
          <Button appearance="subtle" size="small">2</Button>
          <Button appearance="subtle" size="small">3</Button>
          <Button appearance="subtle" size="small">›</Button>
        </div>
      </div>
    </div>
  )
}
export default VEManagement
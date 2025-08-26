import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import {
  makeStyles,
  Card,
  Button,
  Body1,
  Caption1,
  Title3,
} from '@fluentui/react-components'
import {
  Home24Regular,
  Server24Regular,
  Clock24Regular,
  SignOut24Regular,
  Person24Regular,
  LayerDiagonal20Regular,
} from '@fluentui/react-icons'

const useStyles = makeStyles({
  layout: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  navigation: {
    position: 'sticky',
    top: 0,
    zIndex: 40,
    marginBottom: 0,
    borderRadius: 0,
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  brandSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  brandIcon: {
    width: '32px',
    height: '32px',
    backgroundColor: '#0f6cbd',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItems: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  navItem: {
    padding: '6px 12px',
    borderRadius: '4px',
    color: '#424242',
    textDecoration: 'none',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.1s cubic-bezier(0.33, 0, 0.67, 1)',
    ':hover': {
      backgroundColor: '#f0f0f0',
      color: '#242424',
    },
    '&.active': {
      backgroundColor: '#e3f2fd',
      color: '#0f6cbd',
      fontWeight: '600',
    },
  },
  divider: {
    height: '24px',
    width: '1px',
    backgroundColor: '#e0e0e0',
    margin: '0 12px',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userAvatar: {
    width: '32px',
    height: '32px',
    backgroundColor: '#f0f0f0',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px',
  },
})

const Layout: React.FC = () => {
  const styles = useStyles()

  return (
    <div className={styles.layout}>
      {/* Navigation */}
      <Card className={styles.navigation}>
        <div className={styles.navContainer}>
          <div className={styles.brandSection}>
            <div className={styles.brandIcon}>
              <LayerDiagonal20Regular style={{ color: 'white' }} />
            </div>
            <div>
              <Title3>Griffin PF Deployment AI</Title3>
              <Caption1>Virtual Environment Management</Caption1>
            </div>
          </div>
          
          <div className={styles.navItems}>
            <NavLink to="/dashboard" className={styles.navItem}>
              <Home24Regular fontSize={16} />
              Dashboard
            </NavLink>
            <NavLink to="/ve-management" className={styles.navItem}>
              <Server24Regular fontSize={16} />
              VE Management
            </NavLink>
            <NavLink to="/deployment-history" className={styles.navItem}>
              <Clock24Regular fontSize={16} />
              History
            </NavLink>
            
            <div className={styles.divider} />
            
            <div className={styles.userSection}>
              <div className={styles.userAvatar}>
                <Person24Regular fontSize={16} style={{ color: '#616161' }} />
              </div>
              <NavLink to="/login" className={styles.navItem}>
                <SignOut24Regular fontSize={16} />
                Logout
              </NavLink>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout

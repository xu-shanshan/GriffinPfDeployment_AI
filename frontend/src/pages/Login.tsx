import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Title1, Body1, Button, makeStyles } from '@fluentui/react-components'
import { LayerDiagonal20Regular, ArrowEnterRegular } from '@fluentui/react-icons'

const useStyles = makeStyles({
  loginContainer: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginCard: {
    padding: '32px',
    width: '100%',
    maxWidth: '400px',
  },
  brandSection: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  brandIcon: {
    width: '64px',
    height: '64px',
    backgroundColor: '#0f6cbd',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
})

const Login: React.FC = () => {
  const styles = useStyles()
  const navigate = useNavigate()

  const handleSignIn = () => {
    navigate('/dashboard')
  }

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        <div className={styles.brandSection}>
          <div className={styles.brandIcon}>
            <LayerDiagonal20Regular style={{ color: 'white', fontSize: '32px' }} />
          </div>
          <Title1>Griffin PF Deployment AI</Title1>
          <Body1 style={{ marginTop: '8px' }}>Sign in to continue</Body1>
        </div>
        
        <div>
          <Button 
            onClick={handleSignIn} 
            appearance="primary" 
            size="large"
            style={{ width: '100%' }}
            icon={<ArrowEnterRegular />}
          >
            Sign in with Microsoft
          </Button>
          <Body1 style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
            Access your virtual environment management dashboard
          </Body1>
        </div>
      </Card>
    </div>
  )
}

export default Login

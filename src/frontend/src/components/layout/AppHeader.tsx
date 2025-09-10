import React from 'react';
import { makeStyles, shorthands, tokens, Button, Tooltip } from '@fluentui/react-components';
import { useAuthStore } from '../../store/auth';

const useStyles = makeStyles({
  root: {
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    backdropFilter: 'blur(6px)',
    backgroundColor: tokens.colorSubtleBackgroundHover,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    zIndex: 10
  },
  inner: {
    margin: '0 auto',
    width: '100%',
    maxWidth: '1440px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: '32px',
    '@media (max-width:900px)': { paddingInline: '16px' }
  },
  titleWrap: { display: 'flex', flexDirection: 'column' },
  title: { fontSize: '18px', fontWeight: 600, lineHeight: '24px', margin: 0 },
  subtitle: { margin: 0, color: tokens.colorNeutralForeground3, fontSize: '12px' },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: tokens.colorNeutralBackground3,
    ...shorthands.border(`1px solid ${tokens.colorNeutralStroke2}`),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 600
  }
});

export interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  onToggleSidebar?: () => void;
  actions?: ReadonlyArray<{ id: string; label: string; onClick?: () => void; primary?: boolean }>;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, subtitle, actions, onToggleSidebar }) => {
  const styles = useStyles();
  const user = useAuthStore(s => s.user);
  return (
    <header className={styles.root} role="banner">
      <div className={styles.inner}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button aria-label="Toggle navigation" onClick={onToggleSidebar} appearance="subtle" size="small">
            ☰
          </Button>
          <div className={styles.titleWrap}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {actions?.map(a => (
            <Button
              key={a.id}
              appearance={a.primary ? 'primary' : 'secondary'}
              size="small"
              onClick={a.onClick}
            >
              {a.label}
            </Button>
          ))}
          <Tooltip content={user.role} relationship="label">
            <div className={styles.user}>
              <div className={styles.avatar} aria-label="user initials">
                {user.name.split(/\s+/).map(p => p[0]).slice(0, 2).join('')}
              </div>
            </div>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

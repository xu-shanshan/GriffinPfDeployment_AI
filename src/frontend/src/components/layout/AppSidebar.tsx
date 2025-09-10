import React from 'react';
import { makeStyles, tokens, Link } from '@fluentui/react-components';
import { NavItem } from '../../types/navigation';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useLayoutStore } from '../../store/layout';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '256px',
    height: '100vh',
    background: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform .2s ease',
    zIndex: 11,
    '@media (max-width:900px)': {
      transform: 'translateX(-100%)',
      boxShadow: tokens.shadow16
    }
  },
  open: {
    '@media (max-width:900px)': { transform: 'translateX(0)' }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    height: '64px',
    paddingInline: '16px',
    fontWeight: 600,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`
  },
  nav: {
    flex: 1,
    overflowY: 'auto',
    padding: '8px 0'
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '.5px',
    padding: '12px 20px 4px',
    textTransform: 'uppercase',
    color: tokens.colorNeutralForeground3
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 20px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    color: tokens.colorNeutralForeground2,
    borderRadius: '6px',
    margin: '2px 12px',
    outlineOffset: '2px',
    ':hover': {
      background: tokens.colorNeutralBackground3,
      color: tokens.colorNeutralForeground1
    }
  },
  active: {
    background: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    fontWeight: 600
  },
  footer: {
    padding: '12px 20px',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: '12px',
    color: tokens.colorNeutralForeground3
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,.35)',
    zIndex: 10,
    display: 'none',
    '@media (max-width:900px)': { display: 'block' }
  }
});

export interface AppSidebarProps {
  nav: ReadonlyArray<NavItem>;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ nav }) => {
  const styles = useStyles();
  const loc = useLocation();
  const open = useLayoutStore(s => s.sidebarOpen);
  const close = useLayoutStore(s => s.closeSidebar);

  return (
    <>
      <aside
        className={`${styles.root} ${open ? styles.open : ''}`}
        role="navigation"
        aria-label="Primary"
      >
        <div className={styles.header}>Griffin PF AI</div>
        <div className={styles.nav}>
          <div className={styles.sectionLabel}>Main</div>
          {nav.map(item => {
            const active = loc.pathname.startsWith(item.path);
            return (
              <Link
                as={RouterLink}
                to={item.path}
                key={item.id}
                aria-current={active ? 'page' : undefined}
                className={`${styles.item} ${active ? styles.active : ''}`}
                onClick={() => close()}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className={styles.footer}>v0.1.0 prototype</div>
      </aside>
      {open && <div aria-hidden="true" onClick={close} className={styles.overlay} />}
    </>
  );
};

export default AppSidebar;

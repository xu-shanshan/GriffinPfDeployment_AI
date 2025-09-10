import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import DashboardStats from '../components/dashboard/DashboardStats';
import { makeStyles, tokens } from '@fluentui/react-components';
import { virtualEnvironments, services } from '../mock/mockData';

const useStyles = makeStyles({
  sectionTitle: { fontSize: '16px', fontWeight: 600, margin: '0 0 12px', color: tokens.colorNeutralForeground1 },
  cardList: { display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))' },
  veCard: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    background: tokens.colorNeutralBackground1,
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '8px',
    cursor: 'pointer',
    ':hover': { boxShadow: tokens.shadow4 }
  },
  nameRow: { display: 'flex', justifyContent: 'space-between', columnGap: 8, alignItems: 'center' },
  pill: {
    fontSize: '10px',
    textTransform: 'uppercase',
    fontWeight: 600,
    padding: '2px 6px',
    borderRadius: '12px',
    background: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2
  },
  meta: { fontSize: '12px', color: tokens.colorNeutralForeground3 }
});

const DashboardPage: React.FC = () => {
  const { data, isLoading } = useDashboardData();
  const s = useStyles();
  return (
    <div role="main" aria-label="Dashboard">
      <DashboardStats
        veTotal={data?.veTotal || 0}
        serviceTotal={data?.serviceTotal || 0}
        recentDeployments={data?.recentDeployments || 0}
        loading={isLoading}
      />
      <h2 className={s.sectionTitle}>Favorite Virtual Environments</h2>
      <div className={s.cardList} role="list">
        {virtualEnvironments.filter(v=>v.favorite).map(v=>(
          <div key={v.name} role="listitem" tabIndex={0} className={s.veCard} aria-label={`VE ${v.name}`}>
            <div className={s.nameRow}>
              <span>{v.name}</span>
              <span className={s.pill}>{v.veType}</span>
            </div>
            <div className={s.meta}>{v.serviceCount} services • {v.status}</div>
          </div>
        ))}
      </div>
      <h2 className={s.sectionTitle} style={{ marginTop: 32 }}>Favorite Services</h2>
      <div className={s.cardList} role="list">
        {services.filter(svc=>svc.favorite).map(svc=>(
          <div key={svc.name} role="listitem" tabIndex={0} className={s.veCard} aria-label={`Service ${svc.name}`}>
            <div className={s.nameRow}>
              <span>{svc.name}</span>
              <span className={s.pill}>{svc.modelType}</span>
            </div>
            <div className={s.meta}>{svc.veInstances} VE instances • {svc.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

import React from 'react';
import { makeStyles } from '@fluentui/react-components';
import KpiCard from '../common/KpiCard';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))',
    gap: '16px',
    marginBlockEnd: '24px'
  }
});

export interface DashboardStatsProps {
  veTotal: number;
  serviceTotal: number;
  recentDeployments: number;
  loading?: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ veTotal, serviceTotal, recentDeployments, loading }) => {
  const s = useStyles();
  return (
    <div className={s.grid} role="list">
      <KpiCard id="kpi-ves" label="Virtual Environments" value={veTotal} loading={loading} accent="brand" />
      <KpiCard id="kpi-services" label="Services" value={serviceTotal} loading={loading} accent="success" />
      <KpiCard id="kpi-deploys" label="Recent Deployments" value={recentDeployments} loading={loading} accent="warning" />
    </div>
  );
};

export default DashboardStats;

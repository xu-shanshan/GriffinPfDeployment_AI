import React from 'react';
import { useParams } from 'react-router-dom';
import { virtualEnvironments } from '../mock/mockData';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  head:{ margin:0, fontSize:22, fontWeight:600, color: tokens.colorNeutralForeground1 },
  meta:{ fontSize:13, color: tokens.colorNeutralForeground3, marginTop:4 }
});

const VeDetailPage: React.FC = () => {
  const { name } = useParams();
  const s = useStyles();
  const ve = virtualEnvironments.find(v=>v.name.toLowerCase() === (name||'').toLowerCase());
  if(!ve) return <div role="alert">VE not found</div>;
  return (
    <div role="main" aria-label="VE Detail">
      <h1 className={s.head}>{ve.name}</h1>
      <div className={s.meta}>{ve.veType} • {ve.environment} • {ve.serviceCount} services</div>
    </div>
  );
};
export default VeDetailPage;

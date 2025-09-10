import React, { useMemo, useState } from 'react';
import { services } from '../mock/mockData';
import { makeStyles, tokens, Input } from '@fluentui/react-components';

const useStyles = makeStyles({
  grid:{ display:'grid', gap:'16px', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', marginTop:16 },
  card:{
    background: tokens.colorNeutralBackground1,
    border:`1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    padding:'12px 14px',
    display:'flex',
    flexDirection:'column',
    gap:6,
    cursor:'pointer',
    ':hover':{ boxShadow: tokens.shadow4 }
  },
  meta:{ fontSize:12, color: tokens.colorNeutralForeground3 }
});

const ServicesManagementPage: React.FC = () => {
  const s = useStyles();
  const [q,setQ] = useState('');
  const filtered = useMemo(()=> services.filter(svc => svc.name.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <div role="main" aria-label="Services Management">
      <Input placeholder="Search service..." value={q} onChange={(_,d)=>setQ(d.value)} aria-label="Search services" />
      <div className={s.grid} role="list">
        {filtered.map(svc=>(
          <div key={svc.name} role="listitem" tabIndex={0} className={s.card}>
            <strong>{svc.name}</strong>
            <span className={s.meta}>{svc.modelType} • {svc.veInstances} VE • {svc.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ServicesManagementPage;

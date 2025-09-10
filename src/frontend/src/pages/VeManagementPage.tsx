import React, { useMemo, useState } from 'react';
import { virtualEnvironments } from '../mock/mockData';
import { makeStyles, tokens, Input } from '@fluentui/react-components';

const useStyles = makeStyles({
  grid: { display:'grid', gap:'16px', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', marginTop:16 },
  card: {
    background: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    padding: '12px 14px',
    display:'flex',
    flexDirection:'column',
    gap:6,
    cursor:'pointer',
    ':hover': { boxShadow: tokens.shadow4 }
  },
  title: { fontSize:14, fontWeight:600, margin:0 },
  meta: { fontSize:12, color: tokens.colorNeutralForeground3 }
});

const VeManagementPage: React.FC = () => {
  const s = useStyles();
  const [query,setQuery] = useState('');
  const filtered = useMemo(()=> virtualEnvironments.filter(v => v.name.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <div role="main" aria-label="VE Management">
      <Input placeholder="Search VE..." value={query} onChange={(_,d)=>setQuery(d.value)} aria-label="Search virtual environments" />
      <div className={s.grid} role="list">
        {filtered.map(v=>(
          <div key={v.name} role="listitem" className={s.card} tabIndex={0}>
            <h3 className={s.title}>{v.name}</h3>
            <div className={s.meta}>{v.veType} • {v.serviceCount} services • {v.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default VeManagementPage;

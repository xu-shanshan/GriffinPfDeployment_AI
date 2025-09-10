import React from 'react';
import { deploymentHistory } from '../mock/mockData';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  table:{ width:'100%', borderCollapse:'collapse', marginTop:16 },
  th:{
    textAlign:'left',
    fontSize:12,
    textTransform:'uppercase',
    letterSpacing:'.5px',
    padding:'8px 12px',
    borderBottom:`1px solid ${tokens.colorNeutralStroke2}`,
    color:tokens.colorNeutralForeground3
  },
  td:{ fontSize:13, padding:'8px 12px', borderBottom:`1px solid ${tokens.colorNeutralStroke2}` },
  statusChip:{
    display:'inline-block',
    padding:'2px 8px',
    borderRadius:16,
    fontSize:11,
    fontWeight:600
  }
});

function statusColor(s: string): React.CSSProperties {
  switch(s){
    case 'Success': return { background:'#dff6dd', color:'#107c10' };
    case 'Failed': return { background:'#fde7e9', color:'#d13438' };
    case 'InProgress': return { background:'#fff4ce', color:'#ca5010' };
    default: return { background: tokens.colorNeutralBackground3, color: tokens.colorNeutralForeground2 };
  }
}

const DeploymentHistoryPage: React.FC = () => {
  const s = useStyles();
  return (
    <div role="main" aria-label="Deployment History">
      <table className={s.table} role="table" aria-label="Recent deployments">
        <thead>
          <tr>
            <th className={s.th}>Date / Time</th>
            <th className={s.th}>VE</th>
            <th className={s.th}>Services</th>
            <th className={s.th}>Status</th>
            <th className={s.th}>User</th>
            <th className={s.th}>Duration</th>
          </tr>
        </thead>
        <tbody>
          {deploymentHistory.map(r=>(
            <tr key={r.id}>
              <td className={s.td}>{new Date(r.timestamp).toLocaleString()}</td>
              <td className={s.td}>{r.veName}</td>
              <td className={s.td}>{r.services.join(', ')}</td>
              <td className={s.td}>
                <span className={s.statusChip} style={statusColor(r.status)}>{r.status}</span>
              </td>
              <td className={s.td}>{r.user}</td>
              <td className={s.td}>{r.durationSec ? Math.round(r.durationSec/60)+'m' : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeploymentHistoryPage;

import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '4px',
    background: tokens.colorNeutralBackground1,
    cursor: 'pointer',
    ':hover': { boxShadow: tokens.shadow4, background: tokens.colorNeutralBackground2 }
  },
  label: { fontSize: '12px', fontWeight: 600, color: tokens.colorNeutralForeground3, textTransform: 'uppercase', letterSpacing: '.5px' },
  value: { fontSize: '28px', lineHeight: '32px', fontWeight: 600, color: tokens.colorNeutralForeground1 },
  accentBrand: { color: tokens.colorBrandForeground1 },
  accentSuccess: { color: '#107c10' },
  accentDanger: { color: '#d13438' },
  accentWarning: { color: '#ca5010' }
});

export interface KpiCardProps {
  id: string;
  label: string;
  value: number;
  loading?: boolean;
  accent?: 'brand'|'success'|'danger'|'warning';
  onClick?: () => void;
}

const KpiCard: React.FC<KpiCardProps> = ({ id, label, value, loading, accent, onClick }) => {
  const s = useStyles();
  const [display,setDisplay] = useState(0);
  const targetRef = useRef(value);

  useEffect(()=>{
    if(loading){ setDisplay(0); return; }
    targetRef.current = value;
    const start = performance.now();
    const from = 0;
    const to = value;
    const dur = 600;
    let frame: number;
    const step = (t: number) => {
      const p = Math.min(1,(t-start)/dur);
      setDisplay(Math.round(from + (to-from)*p));
      if(p<1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return ()=>cancelAnimationFrame(frame);
  },[value, loading]);

  const accentCls = accent ? (s['accent'+accent.charAt(0).toUpperCase()+accent.slice(1)] as string) : '';

  return (
    <button
      type="button"
      className={s.root}
      aria-labelledby={`${id}-label`}
      onClick={onClick}
    >
      <span id={`${id}-label`} className={s.label}>{label}</span>
      <span className={`${s.value} ${accentCls}`}>{loading ? '—' : display}</span>
    </button>
  );
};

export default KpiCard;

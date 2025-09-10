import React from 'react';
import { makeStyles, Button, tokens } from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  wrap:{
    minHeight:'100vh',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    background:tokens.colorNeutralBackground2,
    padding:32
  },
  card:{
    width:320,
    background:tokens.colorNeutralBackground1,
    border:`1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius:tokens.borderRadiusLarge,
    padding:24,
    display:'flex',
    flexDirection:'column',
    rowGap:16
  },
  title:{ margin:0, fontSize:20, fontWeight:600 }
});

const LoginPage: React.FC = () => {
  const s = useStyles();
  const nav = useNavigate();
  return (
    <div className={s.wrap}>
      <div className={s.card} role="form" aria-label="Login form">
        <h1 className={s.title}>Sign In</h1>
        <p style={{ margin:0, fontSize:13 }}>Prototype mock authentication</p>
        <Button appearance="primary" onClick={()=>nav('/dashboard')}>Continue</Button>
      </div>
    </div>
  );
};

export default LoginPage;

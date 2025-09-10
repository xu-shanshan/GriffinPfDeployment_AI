import React from 'react';
import { useParams } from 'react-router-dom';

const VeServiceInVePage: React.FC = () => {
  const { ve, service } = useParams();
  return (
    <div role="main" aria-label="Service in VE">
      <h1 style={{ marginTop:0 }}>{service}</h1>
      <p style={{ margin:0 }}>Contained in VE: {ve}</p>
      <p style={{ fontSize:13, opacity:.7 }}>Prototype placeholder – implement detailed pipelines & quick deploy later.</p>
    </div>
  );
};
export default VeServiceInVePage;

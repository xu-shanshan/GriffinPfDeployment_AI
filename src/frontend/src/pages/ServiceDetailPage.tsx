import React from 'react';
import { useParams } from 'react-router-dom';
import { services, resolveDropUrl } from '../mock/mockData';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams();
  const svc = services.find(s=>s.name.toLowerCase() === (id||'').toLowerCase());
  if(!svc) return <div role="alert">Service not found</div>;
  return (
    <div role="main" aria-label="Service Detail">
      <h1 style={{ marginTop:0 }}>{svc.name}</h1>
      <ul style={{ fontSize:13, lineHeight:'20px' }}>
        <li>Status: {svc.status}</li>
        <li>Instances: {svc.veInstances}</li>
        <li>Version: {svc.version || '—'}</li>
        <li>Drop URL: {resolveDropUrl(svc.name)}</li>
      </ul>
    </div>
  );
};
export default ServiceDetailPage;

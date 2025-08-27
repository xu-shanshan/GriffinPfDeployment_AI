import React, { useState } from 'react';
import {
  Card,
  Text,
  CardHeader,
  Badge,
  Button,
  Input,
  Dropdown,
  Option,
  Spinner,
  Body1,
  Caption1,
  Title1,
  Subtitle1,
} from '@fluentui/react-components';
import {
  Search24Regular,
  Filter24Regular,
} from '@fluentui/react-icons';
import { useServices, useVirtualEnvironments } from '@/services/queries';
import { Service } from '@/types';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'success';
      case 'stopped': return 'secondary';
      case 'deploying': return 'warning';
      case 'error': return 'danger';
      case 'restarting': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader
        image={
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '8px',
            backgroundColor: 'var(--colorBrandBackground2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text size={200}>{service.type.charAt(0).toUpperCase()}</Text>
          </div>
        }
        header={<Subtitle1>{service.name}</Subtitle1>}
        description={
          <div>
            <Caption1>{service.description}</Caption1>
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Badge appearance="filled" color={getStatusColor(service.status)}>
                {service.status}
              </Badge>
              <Caption1>v{service.version}</Caption1>
              <Caption1>•</Caption1>
              <Caption1>{service.replicas.running}/{service.replicas.desired} replicas</Caption1>
            </div>
            <div style={{ marginTop: '8px' }}>
              <Caption1>
                Uptime: {service.metrics.uptime} • 
                Response: {service.metrics.responseTime}ms • 
                RPS: {service.metrics.requestsPerSecond}
              </Caption1>
            </div>
          </div>
        }
        action={
          <Button appearance="primary">
            Deploy
          </Button>
        }
      />
    </Card>
  );
};

export const ServicesManagementPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [veFilter, setVeFilter] = useState('');
  
  const { data: services = [], isLoading, error } = useServices({
    search: search || undefined,
    status: statusFilter || undefined,
    veId: veFilter || undefined,
  });
  
  const { data: ves = [] } = useVirtualEnvironments();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Spinner size="large" label="Loading services..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Text>Failed to load services</Text>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <Title1>Services</Title1>
        <Caption1>Manage and deploy your services</Caption1>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '24px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <Input
          placeholder="Search services..."
          contentBefore={<Search24Regular />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ minWidth: '300px' }}
        />
        
        <Dropdown
          placeholder="Filter by status"
          value={statusFilter}
          onOptionSelect={(_, data) => setStatusFilter(data.optionValue || '')}
        >
          <Option value="">All statuses</Option>
          <Option value="running">Running</Option>
          <Option value="stopped">Stopped</Option>
          <Option value="deploying">Deploying</Option>
          <Option value="error">Error</Option>
        </Dropdown>

        <Dropdown
          placeholder="Filter by VE"
          value={veFilter}
          onOptionSelect={(_, data) => setVeFilter(data.optionValue || '')}
        >
          <Option value="">All environments</Option>
          {ves.map(ve => (
            <Option key={ve.id} value={ve.id}>
              {ve.name}
            </Option>
          ))}
        </Dropdown>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '16px'
      }}>
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {services.length === 0 && !isLoading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Text>No services found</Text>
        </div>
      )}
    </div>
  );
};

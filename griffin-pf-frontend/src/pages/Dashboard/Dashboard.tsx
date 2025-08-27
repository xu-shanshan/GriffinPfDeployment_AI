import React from 'react';
import {
  Card,
  Text,
  CardHeader,
  CardPreview,
  Body1,
  Caption1,
  Spinner,
  Title1,
  Subtitle1,
} from '@fluentui/react-components';
import {
  CloudDatabaseRegular,
  Server24Regular,
  Play24Regular,
  CheckmarkCircle24Regular,
} from '@fluentui/react-icons';
import { useDashboardStats } from '@/services/queries';

export const Dashboard: React.FC = () => {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Spinner size="large" label="Loading dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Text>Failed to load dashboard data</Text>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Virtual Environments',
      value: stats?.totalVEs || 0,
      icon: <CloudDatabaseRegular />,
      color: '#0078d4'
    },
    {
      title: 'Services',
      value: stats?.totalServices || 0,
      icon: <Server24Regular />,
      color: '#107c10'
    },
    {
      title: 'Active Deployments',
      value: stats?.activeDeployments || 0,
      icon: <Play24Regular />,
      color: '#ff8c00'
    },
    {
      title: 'Success Rate',
      value: `${stats?.successRate || 0}%`,
      icon: <CheckmarkCircle24Regular />,
      color: '#107c10'
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <Title1>Dashboard</Title1>
        <Caption1>Overview of your deployment infrastructure</Caption1>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {statCards.map((card, index) => (
          <Card key={index}>
            <CardHeader
              image={
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '8px',
                  backgroundColor: `${card.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: card.color
                }}>
                  {card.icon}
                </div>
              }
              header={
                <Subtitle1>{card.title}</Subtitle1>
              }
              description={
                <Title1 style={{ color: card.color }}>
                  {card.value}
                </Title1>
              }
            />
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Card>
          <CardHeader header={<Subtitle1>Recent Activity</Subtitle1>} />
          <CardPreview>
            <div style={{ padding: '16px' }}>
              <Text>No recent activity</Text>
            </div>
          </CardPreview>
        </Card>

        <Card>
          <CardHeader header={<Subtitle1>Quick Actions</Subtitle1>} />
          <CardPreview>
            <div style={{ padding: '16px' }}>
              <Text>Deploy services, manage VEs, view logs</Text>
            </div>
          </CardPreview>
        </Card>
      </div>
    </div>
  );
};

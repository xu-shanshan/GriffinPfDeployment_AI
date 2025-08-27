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
  Button,
  Badge,
} from '@fluentui/react-components';
import {
  DatabaseRegular,
  LayerRegular,
  CloudArrowUpRegular,
  ChevronRightRegular,
  MailRegular,
  ServerRegular,
  ConnectorRegular,
  DataTrendingRegular,
  ClockRegular,
} from '@fluentui/react-icons';
import { useDashboardStats } from '@/services/queries';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { data: stats, isLoading, error } = useDashboardStats();
  const navigate = useNavigate();

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

  // Dynamic data with fallbacks
  const favoriteVEs = [
    { name: 'SovBase', services: 67, type: 'B Type', time: '2 hours ago', id: 'sovbase' },
    { name: 'ModelBSov', services: 65, type: 'B Type', time: '4 hours ago', id: 'modelbsov' },
    { name: 'OwaMailB2-SOV', services: 1, type: 'B2 Type', time: '2 minutes ago', id: 'owamailb2-sov' }
  ];

  const favoriteServices = [
    { name: 'OwaMailB2', instances: 2, status: 'Active', time: '1 hour ago', icon: <MailRegular />, id: 'owamailb2' },
    { name: 'Exchange', instances: 2, status: 'Active', time: '3 hours ago', icon: <ServerRegular />, id: 'exchange' },
    { name: 'GraphConnectors', instances: 2, status: 'Not Deployed', time: '6 hours ago', icon: <ConnectorRegular />, id: 'graphconnectors' }
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const handleVEClick = (veId: string) => {
    navigate(`/virtual-environments/${veId}`);
  };

  const handleServiceClick = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Greeting Section */}
      <div style={{ marginBottom: '32px' }}>
        <Title1 style={{ marginBottom: '8px', fontWeight: '400', color: '#323130' }}>
          Good morning, John
        </Title1>
        <Body1 style={{ color: '#605e5c' }}>
          Here's what's happening with your virtual environments today.
        </Body1>
      </div>

      {/* Main Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        marginBottom: '40px'
      }}>
        <Card 
          style={{ padding: '24px', backgroundColor: 'white', cursor: 'pointer' }}
          onClick={() => handleCardClick('/virtual-environments')}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <DatabaseRegular style={{ fontSize: '24px', color: '#0078d4', marginRight: '12px' }} />
            <div>
              <Title1 style={{ fontSize: '48px', fontWeight: '300', color: '#323130', margin: 0 }}>
                {stats?.totalVEs || 18}
              </Title1>
              <Body1 style={{ color: '#605e5c', margin: 0 }}>Total VEs</Body1>
            </div>
          </div>
          <div style={{ 
            borderTop: '1px solid #f3f2f1', 
            paddingTop: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}>
            <Badge appearance="filled" color="success" size="small">
              +2 this month
            </Badge>
            <DataTrendingRegular style={{ fontSize: '16px', color: '#107c10' }} />
          </div>
        </Card>

        <Card 
          style={{ padding: '24px', backgroundColor: 'white', cursor: 'pointer' }}
          onClick={() => handleCardClick('/services')}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <LayerRegular style={{ fontSize: '24px', color: '#107c10', marginRight: '12px' }} />
            <div>
              <Title1 style={{ fontSize: '48px', fontWeight: '300', color: '#323130', margin: 0 }}>
                {stats?.totalServices || 156}
              </Title1>
              <Body1 style={{ color: '#605e5c', margin: 0 }}>Active Services</Body1>
            </div>
          </div>
          <div style={{ 
            borderTop: '1px solid #f3f2f1', 
            paddingTop: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}>
            <Badge appearance="filled" color="success" size="small">
              {stats?.successRate || 98.7}% uptime
            </Badge>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#107c10' }} />
          </div>
        </Card>

        <Card 
          style={{ padding: '24px', backgroundColor: 'white', cursor: 'pointer' }}
          onClick={() => handleCardClick('/deployments')}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <CloudArrowUpRegular style={{ fontSize: '24px', color: '#d83b01', marginRight: '12px' }} />
            <div>
              <Title1 style={{ fontSize: '48px', fontWeight: '300', color: '#323130', margin: 0 }}>
                {stats?.activeDeployments || 23}
              </Title1>
              <Body1 style={{ color: '#605e5c', margin: 0 }}>Recent Deployments</Body1>
            </div>
          </div>
          <div style={{ 
            borderTop: '1px solid #f3f2f1', 
            paddingTop: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}>
            <Badge appearance="outline" color="brand" size="small">
              Last 24 hours
            </Badge>
            <ClockRegular style={{ fontSize: '16px', color: '#0078d4' }} />
          </div>
        </Card>
      </div>

      {/* Bottom Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Favorite Virtual Environments */}
        <Card style={{ backgroundColor: 'white' }}>
          <CardHeader
            header={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Subtitle1>⭐ Favorite Virtual Environments</Subtitle1>
                <Button 
                  appearance="subtle"
                  onClick={() => handleCardClick('/virtual-environments')}
                >
                  View All
                </Button>
              </div>
            }
          />
          <CardPreview>
            <div style={{ padding: '0 16px 16px' }}>
              {favoriteVEs.map((env, index) => (
                <div 
                  key={index} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '12px 0', 
                    borderBottom: index < favoriteVEs.length - 1 ? '1px solid #f3f2f1' : 'none',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s'
                  }}
                  onClick={() => handleVEClick(env.id)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px', 
                    backgroundColor: '#e3f2fd', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: '12px' 
                  }}>
                    <DatabaseRegular style={{ color: '#0078d4' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Body1 style={{ fontWeight: '600', marginBottom: '4px' }}>{env.name}</Body1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Caption1 style={{ color: '#605e5c' }}>{env.services} services</Caption1>
                      <Badge 
                        appearance={env.type === 'B2 Type' ? 'filled' : 'outline'}
                        color={env.type === 'B2 Type' ? 'success' : 'neutral'}
                        size="small"
                      >
                        {env.type}
                      </Badge>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#605e5c' }}>
                    <Caption1>{env.time}</Caption1>
                    <ChevronRightRegular style={{ marginLeft: '8px' }} />
                  </div>
                </div>
              ))}
            </div>
          </CardPreview>
        </Card>

        {/* Favorite Services */}
        <Card style={{ backgroundColor: 'white' }}>
          <CardHeader
            header={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Subtitle1>❤️ Favorite Services</Subtitle1>
                <Button 
                  appearance="subtle"
                  onClick={() => handleCardClick('/services')}
                >
                  View All
                </Button>
              </div>
            }
          />
          <CardPreview>
            <div style={{ padding: '0 16px 16px' }}>
              {favoriteServices.map((service, index) => (
                <div 
                  key={index} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '12px 0', 
                    borderBottom: index < favoriteServices.length - 1 ? '1px solid #f3f2f1' : 'none',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s'
                  }}
                  onClick={() => handleServiceClick(service.id)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px', 
                    backgroundColor: service.status === 'Active' ? '#dff6dd' : '#fff4ce', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: '12px' 
                  }}>
                    {service.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Body1 style={{ fontWeight: '600', marginBottom: '4px' }}>{service.name}</Body1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Caption1 style={{ color: '#605e5c' }}>{service.instances} VE instances</Caption1>
                      <Badge 
                        appearance={service.status === 'Active' ? 'filled' : 'outline'}
                        color={service.status === 'Active' ? 'success' : 'warning'}
                        size="small"
                      >
                        {service.status}
                      </Badge>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#605e5c' }}>
                    <Caption1>{service.time}</Caption1>
                    <ChevronRightRegular style={{ marginLeft: '8px' }} />
                  </div>
                </div>
              ))}
            </div>
          </CardPreview>
        </Card>
      </div>
    </div>
  );
};

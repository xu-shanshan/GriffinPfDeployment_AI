import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Text,
  CardHeader,
  CardPreview,
  Body1,
  Caption1,
  Badge,
  Button,
  Spinner,
  Title1,
  Subtitle1,
} from '@fluentui/react-components';
import {
  Star24Regular,
  Star24Filled,
} from '@fluentui/react-icons';
import { useVirtualEnvironments } from '@/services/queries';
import { useAppStore } from '@/stores/appStore';
import { VirtualEnvironment } from '@/types';

const VECard: React.FC<{ 
  ve: VirtualEnvironment; 
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}> = ({ ve, isFavorite, onToggleFavorite, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'maintenance': return 'warning';
      case 'error': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Card style={{ cursor: 'pointer' }} onClick={onClick}>
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
            <Text size={200}>{ve.provider.toUpperCase()}</Text>
          </div>
        }
        header={<Subtitle1>{ve.name}</Subtitle1>}
        description={
          <div>
            <Caption1>{ve.description}</Caption1>
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Badge appearance="filled" color={getStatusColor(ve.status)}>
                {ve.status}
              </Badge>
              <Caption1>{ve.region}</Caption1>
              <Caption1>•</Caption1>
              <Caption1>{ve.serviceCount} services</Caption1>
            </div>
          </div>
        }
        action={
          <Button
            appearance="subtle"
            icon={isFavorite ? <Star24Filled /> : <Star24Regular />}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          />
        }
      />
      <CardPreview>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <Caption1>CPU Usage</Caption1>
            <Caption1>{Math.round((ve.resources.cpu.used / ve.resources.cpu.allocated) * 100)}%</Caption1>
          </div>
          <div style={{ 
            height: '4px', 
            backgroundColor: 'var(--colorNeutralStroke2)', 
            borderRadius: '2px',
            marginBottom: '12px'
          }}>
            <div
              style={{
                height: '100%',
                width: `${(ve.resources.cpu.used / ve.resources.cpu.allocated) * 100}%`,
                backgroundColor: 'var(--colorBrandBackground)',
                borderRadius: '2px'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <Caption1>Memory: {ve.resources.memory.used}GB / {ve.resources.memory.allocated}GB</Caption1>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Caption1>Storage: {ve.resources.storage.used}GB / {ve.resources.storage.allocated}GB</Caption1>
          </div>
        </div>
      </CardPreview>
    </Card>
  );
};

export const VEManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: ves, isLoading, error } = useVirtualEnvironments();
  const { favorites, addFavorite, removeFavorite } = useAppStore();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Spinner size="large" label="Loading virtual environments..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Text>Failed to load virtual environments</Text>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <Title1>Virtual Environments</Title1>
        <Caption1>Manage your deployment environments</Caption1>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '16px'
      }}>
        {ves?.map(ve => (
          <VECard
            key={ve.id}
            ve={ve}
            isFavorite={favorites.ves.includes(ve.id)}
            onToggleFavorite={() => {
              if (favorites.ves.includes(ve.id)) {
                removeFavorite('ve', ve.id);
              } else {
                addFavorite('ve', ve.id);
              }
            }}
            onClick={() => navigate(`/ves/${ve.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

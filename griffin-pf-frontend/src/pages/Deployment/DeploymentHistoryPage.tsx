import React from 'react';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Text,
  Badge,
  Spinner,
  Caption1,
  Title1,
} from '@fluentui/react-components';
import { useDeploymentHistory } from '@/services/queries';

export const DeploymentHistoryPage: React.FC = () => {
  const { data: deployments, isLoading, error } = useDeploymentHistory();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Spinner size="large" label="Loading deployment history..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Text>Failed to load deployment history</Text>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'failed': return 'danger';
      case 'in-progress': return 'warning';
      case 'queued': return 'secondary';
      case 'cancelled': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <Title1>Deployment History</Title1>
        <Caption1>Track your deployment activities</Caption1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Deployment ID</TableHeaderCell>
            <TableHeaderCell>Services</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Started</TableHeaderCell>
            <TableHeaderCell>Duration</TableHeaderCell>
            <TableHeaderCell>Triggered By</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deployments?.map(deployment => (
            <TableRow key={deployment.id}>
              <TableCell>
                <Text font="monospace" size={200}>
                  {deployment.id}
                </Text>
              </TableCell>
              <TableCell>
                <Text>{deployment.services.length} service(s)</Text>
              </TableCell>
              <TableCell>
                <Badge appearance="filled" color={getStatusColor(deployment.status)}>
                  {deployment.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Text>{new Date(deployment.startTime).toLocaleString()}</Text>
              </TableCell>
              <TableCell>
                <Text>
                  {deployment.duration ? `${deployment.duration}s` : '-'}
                </Text>
              </TableCell>
              <TableCell>
                <Text>{deployment.triggeredBy}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {deployments?.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Text>No deployment history found</Text>
        </div>
      )}
    </div>
  );
};


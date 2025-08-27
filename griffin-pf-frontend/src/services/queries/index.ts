import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApiClient } from '../api/mockClient';
import { DeploymentRequest } from '@/types';

export const useVirtualEnvironments = () => {
  return useQuery({
    queryKey: ['ves'],
    queryFn: () => mockApiClient.getVirtualEnvironments(),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useVirtualEnvironment = (veId: string) => {
  return useQuery({
    queryKey: ['ve', veId],
    queryFn: () => mockApiClient.getVirtualEnvironment(veId),
    enabled: !!veId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useServices = (filters?: { veId?: string; status?: string; search?: string }) => {
  return useQuery({
    queryKey: ['services', filters],
    queryFn: () => mockApiClient.getServices(filters),
    staleTime: 2 * 60 * 1000,
    retry: 3,
  });
};

export const useService = (serviceId: string) => {
  return useQuery({
    queryKey: ['service', serviceId],
    queryFn: () => mockApiClient.getService(serviceId),
    enabled: !!serviceId,
    staleTime: 30 * 1000,
  });
};

export const useDeploymentHistory = (filters?: any) => {
  return useQuery({
    queryKey: ['deployments', filters],
    queryFn: () => mockApiClient.getDeploymentHistory(filters),
    staleTime: 1 * 60 * 1000,
    retry: 3,
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => mockApiClient.getDashboardStats(),
    staleTime: 2 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    retry: 3,
  });
};

export const useDeploymentMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (deployment: DeploymentRequest) => 
      mockApiClient.startDeployment(deployment),
    onSuccess: () => {
      queryClient.invalidateQueries(['deployments']);
      queryClient.invalidateQueries(['services']);
      queryClient.invalidateQueries(['dashboard-stats']);
    },
    onError: (error) => {
      console.error('Deployment failed:', error);
    }
  });
};

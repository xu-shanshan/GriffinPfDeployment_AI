import { useEffect, useState } from 'react';
import { virtualEnvironments, services, deploymentHistory } from '../mock/mockData';

export interface DashboardData {
  veTotal: number;
  serviceTotal: number;
  recentDeployments: number;
}

export function useDashboardData(): { data?: DashboardData; isLoading: boolean } {
  const [data,setData] = useState<DashboardData>();
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const t = setTimeout(()=>{
      setData({
        veTotal: virtualEnvironments.length,
        serviceTotal: services.length,
        recentDeployments: deploymentHistory.length
      });
      setLoading(false);
    }, 300);
    return ()=>clearTimeout(t);
  },[]);
  return { data, isLoading: loading };
}

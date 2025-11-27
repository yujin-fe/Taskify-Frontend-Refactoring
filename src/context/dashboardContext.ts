import { createContext } from 'react';
import { type DashboardsResponse } from '@/types/dashboardsData';

interface DashboardContextType {
  dashboardsData: DashboardsResponse;
}
export const DashboardContext = createContext({} as DashboardContextType);

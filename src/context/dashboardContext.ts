import { createContext } from 'react';
import { type DashboardsResponse } from '@/types/dashboardsData';

interface DashboardContextType {
  dashboardsData: DashboardsResponse | null;
  isLoading: boolean;
}
export const DashboardContext = createContext({
  dashboardsData: { dashboards: [], totalCount: 0, cursorId: 0 },
  isLoading: true,
} as DashboardContextType);

import type { ColorHex } from '@/constants/color';

export interface Dashboard {
  id: number;
  title: string;
  color: ColorHex;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export interface DashboardsResponse {
  cursorId: number;
  totalCount: number;
  dashboards: Dashboard[];
}

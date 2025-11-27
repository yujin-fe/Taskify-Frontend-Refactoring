import type { ColorHex } from '@/constants/color';
import { api } from '@/lib/axios';

interface createDashboardType {
  title: string;
  color: ColorHex;
}

export const createDashboard = async (reqBody: createDashboardType) => {
  const res = await api.post('/dashboards', reqBody);
  return res.data;
};

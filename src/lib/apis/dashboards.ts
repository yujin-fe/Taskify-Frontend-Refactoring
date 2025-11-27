import { api } from '@/lib/axios';
export const getDashboards = async (params: {
  navigationMethod: string;
  page: number;
  size: number;
  cursorId: number | null;
}) => {
  const res = await api.get('/dashboards/', { params });
  return res.data;
};

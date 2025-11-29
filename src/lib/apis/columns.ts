import { api } from '@/lib/axios';

/** 컬럼 목록 조회 함수 */
export const getColumnList = async (dashboardId: string) => {
  const res = await api.get(`/columns?dashboardId=${dashboardId}`);
  return res.data;
};

import { api } from '@/lib/axios';

/** 대시보드 멤버 목록 조회 함수 */
export const getMemberdata = async (params: {
  dashboardId: number;
  teamId: string;
  page: number;
  size: number;
}) => {
  const res = await api.get(`/${params.teamId}/members`, { params });
  return res.data;
};

/** 대시보드 멤버 삭제 함수 */
export const deleteMemberdata = async (params: { teamId: string; memberId: number }) => {
  const res = await api.delete(`/${params.teamId}/members/${params.memberId}`);
  return res.data;
};

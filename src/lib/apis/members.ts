// import { api } from '@/lib/axios';

// 추후 삭제 예정

// /** 대시보드 멤버 목록 조회 */
// export const getMemberList = async (dashboardId: string) => {
//   const res = await api.get(`/members?page=1&size=20&dashboardId=${dashboardId}`);
//   return res.data;
// };

import { api } from '@/lib/axios';

export interface GetMemberListParams {
  dashboardId: string;
  page?: number;
  size?: number;
}

export const getMemberList = async (params: GetMemberListParams) => {
  const apiParams = {
    page: params.page ?? 1,
    size: params.size ?? 20,
    dashboardId: params.dashboardId,
  };

  const res = await api.get('/members', {
    params: apiParams,
  });

  return res.data;
};

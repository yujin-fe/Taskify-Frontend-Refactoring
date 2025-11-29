import { api } from '@/lib/axios';

export interface GetMemberListParams {
  dashboardId: string;
  page?: number;
  size?: number;
  refetchKey?: number;
}

interface DeleteMemberParams {
  memberId: number;
  dashboardId: string | number;
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

export const deleteMemberdata = async (params: DeleteMemberParams) => {
  const { memberId } = params;

  const res = await api.delete(`/members/${memberId}`);

  return res;
};

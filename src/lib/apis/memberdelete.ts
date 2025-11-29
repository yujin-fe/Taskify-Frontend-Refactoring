// /lib/apis/memberdelete.ts 파일 최종 수정
import { api } from '@/lib/axios';

interface DeleteMemberParams {
  memberId: number;
  dashboardId: string | number;
}

export const deleteMemberdata = async (params: DeleteMemberParams) => {
  const { memberId } = params;

  const res = await api.delete(`/members/${memberId}`);

  return res.data;
};

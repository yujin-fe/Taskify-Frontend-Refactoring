export interface SimpleUser {
  nickname: string;
  email: string;
  id: number;
}

export interface InvitationData {
  id: number; // 초대장 ID
  inviter: SimpleUser; // 초대한 사람 정보
  teamId: string;
  // 초대된 대시보드 정보
  dashboard: {
    title: string;
    id: number;
  };
  invitee: SimpleUser; // 초대받은 사람 정보
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

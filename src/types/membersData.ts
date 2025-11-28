export interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  initials: string;
}

export interface MembersResponse {
  members: Member[]; // 현재 페이지의 구성원 목록
}

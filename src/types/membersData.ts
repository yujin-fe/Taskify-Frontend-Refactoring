export interface Members {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwer: boolean;
  initials: string;
}

export interface MembersResponse {
  members: Members[]; // 현재 페이지의 구성원 목록
}

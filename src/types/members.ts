export interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  initials: string;
  refetchKey?: number;
}

export interface MembersResponse {
  members: Member[];
  totalCount: number;
}

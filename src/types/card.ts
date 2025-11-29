type assigneeType = {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
};

export interface CardDetailResponse {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string | null;
  assignee: assigneeType;
  imageUrl: string | null;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CardsResponse {
  cards: CardDetailResponse[];
  totalCount: number;
  cursorId: null;
}

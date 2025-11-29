type assigneeType = {
  profileImageUrl: string;
  nickname: string;
  id: number;
};

export interface CardDetailResponse {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: assigneeType;
  imageUrl: string;
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

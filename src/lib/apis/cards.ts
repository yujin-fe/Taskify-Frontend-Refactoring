import { api } from '@/lib/axios';

interface CreateCardType {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

/** 카드(할일) 생성 api */
export const createCard = async (reqBody: CreateCardType) => {
  const res = await api.post('/cards', reqBody);
  return res;
};

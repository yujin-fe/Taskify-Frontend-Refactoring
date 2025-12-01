import { api } from '@/lib/axios';

interface GetCommentListParams {
  size: number;
  cursorId?: null | number;
  columnId: number;
  cardId: number;
}

interface CreateCommentType {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

/** 댓글 조회 api */
export const getCommentList = async (params: GetCommentListParams) => {
  const res = await api.get('/comments', {
    params,
  });
  return res.data;
};

/** 댓글 생성 api */
export const createComment = async (reqBody: CreateCommentType) => {
  const res = await api.post('/comments', reqBody);
  return res;
};

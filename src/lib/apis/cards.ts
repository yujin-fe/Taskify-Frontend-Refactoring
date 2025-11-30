import { api, fileApi } from '@/lib/axios';

export interface CreateCardType {
  assigneeUserId: number | null;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string | null;
  tags: string[];
  imageUrl: string | null;
}

interface GetCardDataParams {
  size: number;
  cursorId: null | number;
  columnId: number;
}

/** 카드(할일) 생성 api */
export const createCard = async (reqBody: CreateCardType) => {
  const res = await api.post('/cards', reqBody);
  return res;
};

/** 카드 이미지 업로드 api */
export const cardUploadImageFile = (columnId: number) => async (image: FormData) => {
  const res = await fileApi.post(`/columns/${columnId}/card-image`, image);
  return {
    imageUrl: res.data.imageUrl,
  };
};

/** 카드 목록 조회 */
export const getCardData = async (params: GetCardDataParams) => {
  const { size = 10, columnId, cursorId = null } = params;
  const res = await api.get('/cards', {
    params: {
      size,
      columnId,
      cursorId,
    },
  });
  return res.data;
};

import type { CreateCardType } from '@/lib/apis/cards';
import type { CardInitialValueType } from '@/types/card';
import { formatDueDate } from '@/utils/formatDateTime';

export const createCardRequestBody = (
  formValue: CardInitialValueType,
  columnId: number,
  dashboardId: string,
  imageUrl: string | null,
  currentUserId?: number
): CreateCardType => {
  const formattedDueDate = formValue.dueDate
    ? formatDueDate(formValue.dueDate)
    : formatDueDate(new Date());

  const normalizedTags = formValue.tags && formValue.tags.length > 0 ? formValue.tags : [''];
  const assigneeUserId = formValue.assigneeUser?.userId ?? currentUserId ?? 0;

  return {
    assigneeUserId: assigneeUserId,
    dashboardId: Number(dashboardId),
    columnId,
    title: formValue.title,
    description: formValue.description,
    dueDate: formattedDueDate,
    tags: normalizedTags,
    imageUrl:
      imageUrl
      ?? 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/19-7',
  };
};

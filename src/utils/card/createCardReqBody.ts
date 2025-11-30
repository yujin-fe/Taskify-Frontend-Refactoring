import type { CreateCardType } from '@/lib/apis/cards';
import type { CardInitialValueType } from '@/types/card';
import { formatDueDate } from '@/utils/formatDateTime';

export const createCardRequestBody = (
  formValue: CardInitialValueType,
  columnId: number,
  dashboardId: string | undefined,
  imageUrl: string | null
): CreateCardType => ({
  assigneeUserId: formValue.assigneeUser?.id ?? null,
  dashboardId: Number(dashboardId),
  columnId,
  title: formValue.title,
  description: formValue.description,
  dueDate: formatDueDate(formValue.dueDate),
  tags: formValue.tags,
  imageUrl,
});

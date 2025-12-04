import { ColumnListContext } from '@/context/columnListContext';
import useQuery from '@/hooks/useQuery';
import {
  changeColumn,
  createColumn,
  deleteColumn,
  getColumnList,
  type ChangeColumnVariables,
  type CreateColumnType,
} from '@/lib/apis/columns';
import type { ColumnsResponse } from '@/types/column';

interface ColumnListProviderProps {
  dashboardId: string;
  children: React.ReactNode;
}

export default function ColumnListProvider({ dashboardId, children }: ColumnListProviderProps) {
  const columnQuery = useQuery<ColumnsResponse>({
    fetchFn: () => getColumnList(dashboardId || ''),
    params: { dashboardId },
  });

  const createColumnFn = async (reqBody: CreateColumnType) => {
    const { data } = await createColumn(reqBody);

    if (!data) {
      return;
    }
    columnQuery.setData((prev) => {
      if (!prev) {
        return {
          result: 'SUCCESS',
          data: [data],
        };
      }

      return {
        ...prev,
        data: [...prev.data, data],
      };
    });

    return data;
  };

  const updateColumnFn = async ({ columnId, body }: ChangeColumnVariables) => {
    const { data: updated } = await changeColumn(columnId, body);

    columnQuery.setData((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        data: prev.data.map((col) =>
          col.id === updated.id
            ? { ...col, title: updated.title, updatedAt: updated.updatedAt }
            : col
        ),
      };
    });

    return updated;
  };

  const deleteColumnFn = async (columnId: number) => {
    await deleteColumn(columnId);
    columnQuery.refetch();
  };

  const value = {
    columnList: columnQuery.data?.data ?? [],
    isLoading: columnQuery.isLoading,
    createColumn: createColumnFn,
    updateColumn: updateColumnFn,
    deleteColumn: deleteColumnFn,
  };

  return <ColumnListContext value={value}>{children}</ColumnListContext>;
}

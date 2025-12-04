import { createContext } from 'react';
import type { UpdateColumnVariables, CreateColumnType } from '@/lib/apis/columns';
import type { ColumnsData } from '@/types/column';

interface ColumnListContextType {
  columnList: ColumnsData[] | [];
  isLoading: boolean;
  createColumn: (body: CreateColumnType) => Promise<ColumnsData>;
  updateColumn: (vars: UpdateColumnVariables) => Promise<ColumnsData>;
  deleteColumn: (columnId: number) => Promise<void>;
}

export const ColumnListContext = createContext<ColumnListContextType | null>(null);

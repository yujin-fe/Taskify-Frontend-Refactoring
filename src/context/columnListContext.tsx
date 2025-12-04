import { createContext } from 'react';
import type { ColumnsResponse } from '@/types/column';

export const ColumnListContext = createContext<ColumnsResponse | null>(null);

import { createContext } from 'react';
import type { Assignee } from '@/types/card';

interface ComboboxContextType {
  id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedValue: Assignee | null;
  setSelectedValue: (value: Assignee | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ComboboxContext = createContext<ComboboxContextType | null>(null);

export default ComboboxContext;

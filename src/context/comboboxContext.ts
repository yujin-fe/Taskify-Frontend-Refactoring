import { createContext } from 'react';

interface ComboboxContextType {
  id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedValue: number;
  setSelectedValue: (value: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedNode: null | React.ReactNode;
  setSelectedNode: (node: null | React.ReactNode) => void;
}

const ComboboxContext = createContext<ComboboxContextType | null>(null);

export default ComboboxContext;

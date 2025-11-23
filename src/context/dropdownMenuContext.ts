import { createContext } from 'react';

interface DropdownMenuContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedValue?: string;
  setSelectedValue?: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedNode: null | React.ReactNode;
  setSelectedNode: (node: null | React.ReactNode) => void;
}

export const DropdownMenuContext = createContext<DropdownMenuContextType | null>(null);

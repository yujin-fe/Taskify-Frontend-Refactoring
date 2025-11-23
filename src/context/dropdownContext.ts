import { createContext } from 'react';

/**
 * 기본 드롭다운 메뉴(드롭다운 1) 컨텍스트 타입
 */
interface BasicDropdownContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * 검색 가능한 드롭다운 메뉴(드롭다운 2) 컨텍스트 타입
 */
interface SearchableDropdownContextType extends BasicDropdownContextType {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedNode: null | React.ReactNode;
  setSelectedNode: (node: null | React.ReactNode) => void;
}

export const BasicDropdownContext = createContext<BasicDropdownContextType | null>(null);

export const SearchableDropdownContext = createContext<SearchableDropdownContextType | null>(null);

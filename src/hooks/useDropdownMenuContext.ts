import { useContext } from 'react';
import {
  BaseDropdownMenuContext,
  SearchableDropdownMenuContext,
} from '@/context/dropdownMenuContext';

export const useBaseDropdownMenuContext = () => {
  const context = useContext(BaseDropdownMenuContext);

  if (!context) {
    throw new Error('BaseDropdownMenuContext 안에서 사용하세요.');
  }

  return context;
};

export const useSearchableDropdownMenuContext = () => {
  const context = useContext(SearchableDropdownMenuContext);

  if (!context) {
    throw new Error('SearchableDropdownMenuContext 안에서 사용하세요.');
  }

  return context;
};

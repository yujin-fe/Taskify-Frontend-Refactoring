import { useContext } from 'react';
import { BaseDropdownContext, SearchableDropdownContext } from '@/context/dropdownContext';

export const useBaseDropdownContext = () => {
  const context = useContext(BaseDropdownContext);

  if (!context) {
    throw new Error('BaseDropdownContext 안에서 사용하세요.');
  }

  return context;
};

export const useSearchableDropdownContext = () => {
  const context = useContext(SearchableDropdownContext);

  if (!context) {
    throw new Error('SearchableDropdownContext 안에서 사용하세요.');
  }

  return context;
};

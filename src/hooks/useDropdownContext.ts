import { useContext } from 'react';
import { BasicDropdownContext, SearchableDropdownContext } from '@/context/dropdownContext';

export const useBasicDropdownContext = () => {
  const context = useContext(BasicDropdownContext);

  if (!context) {
    throw new Error('BasicDropdownContext 안에서 사용하세요.');
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

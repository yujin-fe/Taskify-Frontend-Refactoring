import { useContext } from 'react';
import { DropdownMenuContext } from '@/context/dropdownMenuContext';

const useDropdownMenuContext = () => {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error('DropdownMenuContext 안에서 사용하세요.');
  }

  return context;
};

export default useDropdownMenuContext;

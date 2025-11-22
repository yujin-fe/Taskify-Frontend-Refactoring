import { useContext } from 'react';
import { DropdownMenuContext } from '@/context/dropdownMenuContext';

export default function DropdownMenuCheckList({ children }: { children: React.ReactNode }) {
  const { isOpen } = useContext(DropdownMenuContext);

  return (
    isOpen && (
      <ul className='absolute top-[calc(100%+8px)] left-0 z-1000 w-full flex-col justify-center rounded-md border border-gray-300 bg-gray-0'>
        {children}
      </ul>
    )
  );
}

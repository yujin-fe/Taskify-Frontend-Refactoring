import React from 'react';
import type { DropdownSearchItemProps } from '@/components/dashboard/dropdown/DropdownSearchItem';
import { useSearchableDropdownContext } from '@/hooks/useDropdownContext';
import { matchSearch } from '@/utils/dropdownMenuSearch';

export default function DropdownSearchList({ children }: { children: React.ReactNode }) {
  const { isOpen, searchQuery } = useSearchableDropdownContext();

  const filteredChildren = React.Children.toArray(children).filter((child) => {
    if (!React.isValidElement(child)) {
      return true;
    }
    const itemValue = (child.props as DropdownSearchItemProps).value || '';
    return matchSearch(itemValue, searchQuery);
  });

  if (!isOpen) {
    return null;
  }

  return (
    <ul
      role='menu'
      className='absolute top-[calc(100%+8px)] left-0 z-1000 w-full rounded-md border border-gray-300 bg-gray-0'>
      {filteredChildren.length > 0 ? (
        <>{filteredChildren}</>
      ) : (
        <li className='px-4 py-3 text-center font-md-regular text-gray-500'>
          검색 결과가 없습니다.
        </li>
      )}
    </ul>
  );
}

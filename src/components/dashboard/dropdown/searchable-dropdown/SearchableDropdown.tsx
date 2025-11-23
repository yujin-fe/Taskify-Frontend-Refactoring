import { useMemo } from 'react';
import DropdownSearchItem from '@/components/dashboard/dropdown/searchable-dropdown/DropdownSearchItem';
import DropdownSearchList from '@/components/dashboard/dropdown/searchable-dropdown/DropdownSearchList';
import DropdownSearchTrigger from '@/components/dashboard/dropdown/searchable-dropdown/DropdownSearchTrigger';
import { SearchableDropdownContext } from '@/context/dropdownContext';
import useDropdownMenuState from '@/hooks/useDropdownState';

interface SearchableDropdownProps {
  children: React.ReactNode;
  value: string;
  setValue: (value: string) => void;
}

/**
 * SearchableDropdown 컴포넌트는 SearchableDropdown UI의 루트 컨테이너입니다.
 *
 * 내부에서 드롭다운의 열림/닫힘, 검색어, 선택된 자식 요소를 관리하고,
 * 외부 상태값인 `DropdownMenu`에 설정된 value/setValue를
 * 하위 컴포넌트에 Context 형태로 전달합니다.
 *
 * @example
 * const [value, setValue] = useState('');
 *
 * <SearchableDropdown value={value} setValue={setValue}>
 *   <SearchableDropdown.Trigger placeholder='담당자를 선택해주세요.' name='user' />
 *   <SearchableDropdown.List>
 *     <SearchableDropdown.Item value="홍길동">
 *      홍길동
 *     </SearchableDropdown.Item>
 *   </SearchableDropdown.List>
 * </SearchableDropdown>
 */
export default function SearchableDropdown({ children, value, setValue }: SearchableDropdownProps) {
  const { isOpen, setIsOpen, searchQuery, setSearchQuery, selectedNode, setSelectedNode } =
    useDropdownMenuState();

  const contextValue = useMemo(
    () => ({
      selectedValue: value,
      setSelectedValue: setValue,
      isOpen,
      setIsOpen,
      searchQuery,
      setSearchQuery,
      selectedNode,
      setSelectedNode,
    }),
    [value, setValue, isOpen, setIsOpen, searchQuery, setSearchQuery, selectedNode, setSelectedNode]
  );

  return (
    <SearchableDropdownContext value={contextValue}>
      <div className='relative w-full'>{children}</div>
    </SearchableDropdownContext>
  );
}

/**
 * SearchableDropdown 트리거 컴포넌트 입니다.
 *
 * - 선택된 값이 없으면: placeholder 표시됩니다.
 * - 선택된 값이 있고 리스트가 닫혀있으면: 선택된 아이템의 children이 표시됩니다.
 * - 리스트가 열려있으면: 검색 가능한 input으로 변경됩니다.
 */
SearchableDropdown.Trigger = DropdownSearchTrigger;

/**
 * SearchableDropdown 리스트 컴포넌트입니다.
 *
 * 내부에는 반드시 `SearchableDropdown.Item` 컴포넌트만 자식으로 전달해야 합니다.
 *
 * @example
 *  <SearchableDropdown.List>
 *    <SearchableDropdown.Item value="홍길동">...</SearchableDropdown.Item>
 *  </SearchableDropdown.List>
 */
SearchableDropdown.List = DropdownSearchList;

/**
 * 드롭다운 메뉴에서 선택 가능한 체크 아이템 컴포넌트입니다.
 *
 * 선택 시 부모 `DropdownMenu`에 설정된 value/setValue 통해 선택 값이 반영됩니다.
 *
 * @example
 *  <SearchableDropdown.Item value="홍길동">
 *    홍길동
 *  </SearchableDropdown.Item>
 */
SearchableDropdown.Item = DropdownSearchItem;

import DropdownItem from '@/components/dashboard/dropdown/basic-dropdown/DropdownItem';
import DropdownList from '@/components/dashboard/dropdown/basic-dropdown/DropdownList';
import DropdownTrigger from '@/components/dashboard/dropdown/basic-dropdown/DropdownTrigger';
import { BasicDropdownContext } from '@/context/dropdownContext';
import useDropdownMenuState from '@/hooks/useDropdownState';

/**
 * BasicDropdown 컴포넌트는 BasicDropdown UI의 루트 컨테이너입니다.
 *
 * 내부에서 드롭다운의 열림/닫힘 상태를 관리하고,
 * 하위 컴포넌트에 Context 형태로 전달합니다.
 *
 * @example
 * <BasicDropdown>
 *   <BasicDropdown.Trigger>
 *     <Icons.KebabMore />
 *   </BasicDropdown.Trigger>
 *   <BasicDropdown.List>
 *     <BasicDropdown.Item onClick={함수}>메뉴명</BasicDropdown.Item>
 *   </BasicDropdown.List>
 * </BasicDropdown>
 */
export default function BasicDropdown({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useDropdownMenuState();

  return (
    <BasicDropdownContext value={{ isOpen, setIsOpen }}>
      <div className='relative w-fit'>{children}</div>
    </BasicDropdownContext>
  );
}
/**
 * 드롭다운 메뉴 트리거 컴포넌트 입니다.
 * 
 * 클릭하면 드롭다운 메뉴 리스트가 보여집니다.
 * 
 * @example
 *  <BasicDropdown.Trigger ariaLabel='더보기 메뉴'>
      <Icons.KebabMore />
    </BasicDropdown.Trigger>
 */
BasicDropdown.Trigger = DropdownTrigger;

/**
 * 드롭다운 메뉴 리스트 컴포넌트입니다.
 * 
 * 내부에는 반드시 `DropdownMenu.Item` 컴포넌트만 자식으로 전달해야 합니다.
 * 
 * @example
 *  <BasicDropdown.List>
      <BasicDropdown.Item>...</BasicDropdown.Item>
    </BasicDropdown.List>
 */
BasicDropdown.List = DropdownList;

/**
 * 드롭다운 메뉴 아이템 컴포넌트입니다.
 *
 * 메뉴명, 메뉴를 클릭했을 때 실행할 함수를 전달합니다.
 *
 * @example
 *  <BasicDropdown.Item onClick={함수}>메뉴명</BasicDropdown.Item>
 */
BasicDropdown.Item = DropdownItem;

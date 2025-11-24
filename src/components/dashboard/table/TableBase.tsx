import { cn } from '@/utils/cn';

type TableBaseProps = {
  type?: 'Members' | 'Invites'; // Members: 구성원 Invites: 초대내역
  children?: string;
};

/**
 * TableBase 컴포넌트
 *
 * 이 컴포넌트는 대시보드 테이블의 공통 레이아웃 뼈대를 제공합니다.
 * Top/Body 영역 컴포넌트를 넣어 사용합니다.
 *
 * @example
 * <TableBase size="Members">
 *   <TableBody/>
 * </TableBase>
 */

export default function TableBase({ type = 'Members', children }: TableBaseProps) {
  return (
    <div
      role='table'
      className={cn(
        'flex w-[284px] rounded-lg bg-gray-0 px-[20px] text-gray-700 sm:w-[554px] sm:px-[28px] sm:pb-[20px] lg:w-[620px]',
        type === 'Members'
          && 'h-[337px] pt-[22px] pb-[16px] sm:h-[404px] sm:pt-[26px] lg:h-[404px]',
        type === 'Invites' && 'h-[406px] pt-[24px] pb-[12px] sm:h-[447px] sm:pt-[32px] lg:h-[447px]'
      )}>
      {children}
    </div>
  );
}

import { Children, type ReactNode } from 'react';

interface DashboardBodyProps {
  children: ReactNode;
}

/**
 * 대시보드의 헤더 영역을 렌더링하는 컴포넌트입니다.
 * 전달된 두 개의 자식 요소를 좌우로 분리하여 배치합니다.
 * - 첫 번째 자식 요소: 왼쪽 영역 (예: 프로필, 이름, 이메일)
 * - 두 번째 자식 요소: 오른쪽 영역 (예: 삭제, 취소 컨트롤 버튼)
 */

export default function DashboardBody({ children }: DashboardBodyProps) {
  // Children.toArray 사용 (React import 불필요)
  const childrenArray = Children.toArray(children);
  const titleProfileElement = childrenArray[0];
  const controlElements = childrenArray[1];

  return (
    <div className={'flex items-center justify-between'}>
      <div className='flex items-center'>{titleProfileElement}</div>
      {controlElements}
    </div>
  );
}

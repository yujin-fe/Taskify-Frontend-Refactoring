import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import SideBar from '@/components/dashboard/SideBar';
import { DashboardContext } from '@/context/dashboardContext';
import { usePagination } from '@/hooks/usePagination';
import { useResponsiveValue } from '@/hooks/useResponsiveValue';
import { api } from '@/lib/axios';
import { type DashboardsResponse } from '@/types/dashboardsData';
import { cn } from '@/utils/cn';

const DESKTOPSIZE = 10;
const TABLETSIZE = 8;
const MOBILESIZE = 6;

export default function Layout() {
  //TODO: 로컬스토리지에서 관리
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dashboardsData, setDashboardsData] = useState({
    dashboards: [],
    totalCount: 0,
    cursorId: 0,
  } as DashboardsResponse);

  const size = useResponsiveValue({
    mobile: MOBILESIZE,
    tablet: TABLETSIZE,
    desktop: DESKTOPSIZE,
  });

  const { totalCount, cursorId } = dashboardsData;
  const page = useResponsiveValue({
    mobile: Math.ceil(totalCount / 6),
    tablet: Math.ceil(totalCount / 8),
    desktop: Math.ceil(totalCount / 10),
  });

  const { currentPage, handlePrev, handleNext, isPrevDisabled, isNextDisabled } =
    usePagination(page);

  const parmas = {
    navigationMethod: 'pagination',
    page: currentPage,
    size,
    cursorId,
  };

  //TODO: useQuery hook 생성되면 교체
  useEffect(() => {
    const getDashboardsData = async () => {
      try {
        const res = await api.get('/dashboards/', { params: parmas });
        setDashboardsData(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    getDashboardsData();
  }, [size, currentPage]);

  return (
    <DashboardContext value={{ dashboardsData }}>
      <div>
        <SideBar
          isCollapsed={isCollapsed}
          onClickSidebarIcon={() => setIsCollapsed(!isCollapsed)}
          handlePrev={handlePrev}
          handleNext={handleNext}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
        />
        <div className={cn(isCollapsed ? 'pl-[67px]' : 'pl-[300px]')}>
          {/* header는 테스트용 코드입니다 */}
          <header className='fixed top-0 h-[70px] w-full bg-gray-0'>헤더</header>
          <main className='min-h-dvh bg-base pt-[70px]'>
            <Outlet />
          </main>
        </div>
      </div>
    </DashboardContext>
  );
}

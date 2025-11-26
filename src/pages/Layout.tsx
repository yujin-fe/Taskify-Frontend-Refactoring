import { useState } from 'react';
import { Outlet } from 'react-router';
import SideBar from '@/components/dashboard/SideBar';
import { cn } from '@/utils/cn';

export default function Layout() {
  //TODO: 로컬스토리지에서 관리
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div>
      <SideBar isCollapsed={isCollapsed} onClickSidebarIcon={() => setIsCollapsed(!isCollapsed)} />
      <div className={cn('min-h-dvh', isCollapsed ? 'pl-[67px]' : 'pl-[300px]')}>
        <header>헤더</header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

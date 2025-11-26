import { useState } from 'react';
import { Outlet } from 'react-router';
import SideBar from '@/components/dashboard/SideBar';

export default function Layout() {
  //TODO: 로컬스토리지에서 관리
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div>
      <header>헤더</header>
      <aside>
        <SideBar
          isCollapsed={isCollapsed}
          onClickSidebarIcon={() => setIsCollapsed(!isCollapsed)}
        />
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

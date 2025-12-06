import { useState } from 'react';
import notInvited from '@/assets/images/dashboard/no-invited-dashboard.png';
import InvitedDashboardList from '@/components/mydashboard/InvitedDashboardList';
import InvitedDashboardSearch from '@/components/mydashboard/InvitedDashboardSearch';
import ListSkeleton from '@/components/skeleton/ListSkeleton';
import { InvitedDashboardContext } from '@/context/invitedDashboardContext';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { getMyInvitations } from '@/lib/apis/Invitations';
import type { InvitationParams, Invitation, MyInvitationResponse } from '@/types/invitations';

const INVITATION_LIST_SIZE = 7;

export default function InvitedDashboardContent() {
  const [search, setSearch] = useState<null | string>(null);
  const [confirmMessage, setConfirmMessage] = useState('');
  const params: InvitationParams = {
    size: INVITATION_LIST_SIZE,
  };
  const getSuccess = (prevData: MyInvitationResponse | null, newData: MyInvitationResponse) => {
    if (!prevData) {
      return newData;
    }
    return {
      ...newData,
      invitations: [...prevData.invitations, ...newData.invitations],
    };
  };

  const {
    data: ListData,
    error: ListError,
    setData: setListData,
    resetData: resetListData,
    isLoading,
    lastItemRef,
  } = useInfiniteScroll({
    fetchFn: (params) => getMyInvitations(params),
    params,
    onSuccess: getSuccess,
  });

  //TODO: 에러발생 컴포넌트
  if (ListError) {
    return <div>오류가 발생했습니다.</div>;
  }

  if (!ListData) {
    return null;
  }

  const invitations: Invitation[] = ListData.invitations;

  const nullList = () => {
    return (
      <div className='flex flex-col items-center gap-6 pb-16 sm:pb-24'>
        <img src={notInvited} className='flex max-h-[100px] max-w-[100px] justify-center' />
        <span className='text-center font-2lg-regular text-gray-400'>
          아직 초대받은 대시보드가 없어요
        </span>
      </div>
    );
  };

  return invitations.length === 0 && search === null ? (
    nullList()
  ) : (
    <InvitedDashboardContext
      value={{
        ListData,
        setListData,
        resetListData,
        lastItemRef,
        confirmMessage,
        setConfirmMessage,
        search,
        setSearch,
      }}>
      <div className='flex flex-col gap-6'>
        <InvitedDashboardSearch />
        <InvitedDashboardList isLoading={isLoading} />
      </div>
    </InvitedDashboardContext>
  );
}

import { useState } from 'react';
import notInvited from '@/assets/images/dashboard/no-invited-dashboard.png';
import Title from '@/components/common/Title';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
import InvitedDashboardList from '@/components/mydashboard/InvitedDashboardList';
import InvitedDashboardSearch from '@/components/mydashboard/InvitedDashboardSearch';
import { InvitedDashboardContext } from '@/context/InvitedDashboardContext';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { getMyInvitations } from '@/lib/apis/Invitations';
import type { InvitationParams, Invitation, MyInvitationResponse } from '@/types/invitations';

const INVITATION_LIST_SIZE = 7;

export default function InvitedDashboardFrame() {
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
      <div className='flex h-[390px] w-full max-w-[960px] flex-col gap-16 px-[40px] pt-[24px]'>
        <Title as='h3' size={'2xl'} weight={'bold'}>
          초대받은 대시보드
        </Title>
        <div className='flex flex-col items-center gap-6'>
          <img src={notInvited} className='flex max-h-[100px] max-w-[100px] justify-center' />
          <span className='text-center font-2lg-regular text-gray-400'>
            아직 초대받은 대시보드가 없어요
          </span>
        </div>
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
        search,
        setSearch,
        confirmMessage,
        setConfirmMessage,
      }}>
      <div className='flex max-h-[770px] w-full flex-col gap-6 py-6 sm:px-0 sm:py-4 sm:pl-6 md:rounded-lg md:px-0 md:py-8'>
        <div className='flex flex-col gap-[32px] px-4 md:px-7'>
          <DashboardHeader>
            <Title as='h3' size={'2xl'} weight={'bold'}>
              초대받은 대시보드
            </Title>
          </DashboardHeader>
          <InvitedDashboardSearch />
        </div>
        <InvitedDashboardList />
      </div>
    </InvitedDashboardContext>
  );
}

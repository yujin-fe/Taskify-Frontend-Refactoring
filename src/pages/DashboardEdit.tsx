import { useMemo, useCallback, useState } from 'react';
import PageIndicator from '@/components/common/PageIndicator';
import PageNation from '@/components/common/PageNation';
import Title from '@/components/common/Title';
import DashboardBody from '@/components/dashboard/table/DashboardBody';
import DashboardContainer from '@/components/dashboard/table/DashboardContainer';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
import DashboardItem from '@/components/dashboard/table/DashboardItem';
import DashboardList from '@/components/dashboard/table/DashboardList';
import { usePagination } from '@/hooks/usePagination';
import useQuery from '@/hooks/useQuery';
import { getMemberdata, deleteMemberdata } from '@/lib/apis/memberdata';
import type { MembersResponse, Members } from '@/types/membersData';

const MEMBERS_TOTAL_PAGES = 4;
const TEAM_ID = 'teams';
const DASHBOARD_ID = 7;

interface GetMemberdataparams {
  teamId: string;
  page: number;
  size: number;
  dashboardId: number;
  refetchKey: number;
}

export default function DashboardEdit() {
  const { currentPage, handlePrev, handleNext, isPrevDisabled } = usePagination();

  const [refetchKey, setRefetchKey] = useState(0);

  const params: GetMemberdataparams = useMemo(
    () => ({
      teamId: TEAM_ID,
      page: currentPage,
      size: 4,
      dashboardId: DASHBOARD_ID,
      refetchKey: refetchKey,
    }),
    [currentPage, refetchKey]
  );

  const { data: memberData, isLoading } = useQuery<MembersResponse, GetMemberdataparams>({
    fetchFn: () => getMemberdata(params),
    params,
  });

  const isNextDisabled = useMemo(() => {
    return currentPage >= MEMBERS_TOTAL_PAGES;
  }, [currentPage]);

  const handleNextWithLimit = useCallback(() => {
    if (currentPage < MEMBERS_TOTAL_PAGES) {
      handleNext();
    }
  }, [currentPage, handleNext]);

  const handleDelete = useCallback(async (memberUserId: number) => {
    try {
      await deleteMemberdata({
        teamId: TEAM_ID,
        memberId: memberUserId,
      });

      console.log(`구성원 User ID ${memberUserId} 삭제 완료.`);

      setRefetchKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error('구성원 삭제 실패:', error);
      alert('구성원 삭제에 실패했습니다.');
    }
  }, []);

  const members: Members[] = memberData?.members || [];

  const memberListItems = isLoading ? (
    <p className='p-5'>구성원 목록 로딩 중...</p>
  ) : members.length === 0 ? (
    <p className='p-5'>등록된 구성원이 없습니다.</p>
  ) : (
    members.map((member) => (
      <DashboardItem
        key={member.id}
        type='MembersItem'
        user={member}
        userId={member.userId}
        onDelete={handleDelete}>
        <DashboardItem.Content type='MembersItem' user={member} userId={member.userId} />
        <DashboardItem.Action
          type='MembersItem'
          user={member}
          userId={member.userId}
          onDelete={() => handleDelete(member.userId)}
        />
      </DashboardItem>
    ))
  );

  return (
    <DashboardContainer type='Members'>
      <DashboardHeader>
        <Title as='h2' size='xl' weight='bold' className='pl-5 sm:pl-7 sm:text-2xl'>
          구성원
        </Title>
        <PageIndicator currentPage={currentPage} totalPages={MEMBERS_TOTAL_PAGES} />
        <PageNation
          onPrev={handlePrev}
          onNext={handleNextWithLimit}
          prevDisabled={isPrevDisabled}
          nextDisabled={isNextDisabled}
          className='mr-5 rounded-[4px] border border-gray-200 sm:mr-7'
        />
      </DashboardHeader>

      <DashboardBody>
        <DashboardList title='이름' titleClassName='sm:pl-7 pl-5 pt-[20px] sm:pt-[31px]'>
          {memberListItems}
        </DashboardList>
      </DashboardBody>
    </DashboardContainer>
  );
}

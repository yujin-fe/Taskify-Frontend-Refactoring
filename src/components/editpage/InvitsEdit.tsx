import { useMemo } from 'react';
import { useParams } from 'react-router';
import PageIndicator from '@/components/common/PageIndicator';
import PageNation from '@/components/common/PageNation';
import Title from '@/components/common/Title';
import DashboardBody from '@/components/dashboard/table/DashboardBody';
import DashboardContainer from '@/components/dashboard/table/DashboardContainer';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
import DashboardList from '@/components/dashboard/table/DashboardList';
import { usePagination } from '@/hooks/usePagination';
import useQuery from '@/hooks/useQuery';
import { getInvitationList } from '@/lib/apis/Invitations';
import type { InvitationsResponse, Invitation } from '@/types/invitations';

const INVITS_PAGE_SIZE = 5;

export default function InvitsEdit() {
  const { currentPage, handlePrev, handleNext, isPrevDisabled } = usePagination();
  const { dashboardId } = useParams<{ dashboardId: string }>();

  const params = useMemo(
    () => ({
      dashboardId: dashboardId || '',
      page: currentPage,
      size: INVITS_PAGE_SIZE,
    }),
    [dashboardId, currentPage]
  );

  const { data: invitData, isLoading } = useQuery<InvitationsResponse>({
    fetchFn: () => getInvitationList(params),
    params,
  });

  const calculatedTotalPages = useMemo(() => {
    const total = invitData?.totalCount || 0;

    return total === 0 ? 1 : Math.ceil(total / INVITS_PAGE_SIZE);
  }, [invitData?.totalCount]);

  const isNextDisabled = currentPage >= calculatedTotalPages;
  const invitations: Invitation[] = useMemo(() => invitData?.invitations || [], [invitData]);

  const invitsListItems = invitations.map((invitation) => (
    // 임시 div 사용.
    <div key={invitation.id} className='border-b border-gray-100 px-5 py-4 sm:px-7'>
      {invitation.invitee.email}
      {/* 여기에 취소 버튼 등의 UI 추후 추가 */}
    </div>
  ));

  return (
    <DashboardContainer type='Invites'>
      <DashboardHeader>
        <Title as='h2' size='xl' weight='bold' className='pl-5 sm:pl-7 sm:text-2xl'>
          초대내역
        </Title>
        <PageIndicator currentPage={currentPage} totalPages={calculatedTotalPages} />
        <PageNation
          onPrev={handlePrev}
          onNext={handleNext}
          prevDisabled={isPrevDisabled}
          nextDisabled={isNextDisabled}
          className='mr-5 rounded-[4px] border border-gray-200 sm:mr-7'
        />
      </DashboardHeader>
      <DashboardBody>
        {isLoading && (
          <div className='p-5 text-center text-gray-400'>
            {invitations.length > 0 ? '업데이트 중...' : '불러오는 중...'}
          </div>
        )}
        <DashboardList title='이메일' titleClassName='sm:pl-7 pl-5 pt-[20px] sm:pt-[31px]'>
          {invitsListItems.length > 0 ? (
            invitsListItems
          ) : (
            <div className='p-5 text-center text-gray-400'>현재 초대 내역이 없습니다.</div>
          )}
        </DashboardList>
      </DashboardBody>
    </DashboardContainer>
  );
}

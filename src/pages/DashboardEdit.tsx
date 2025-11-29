import { useMemo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import BaseModalFrame from '@/components/common/modal/BaseModalFrame';
import PageIndicator from '@/components/common/PageIndicator';
import PageNation from '@/components/common/PageNation';
import Title from '@/components/common/Title';
import DashboardBody from '@/components/dashboard/table/DashboardBody';
import DashboardContainer from '@/components/dashboard/table/DashboardContainer';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
import DashboardItem from '@/components/dashboard/table/DashboardItem';
import DashboardList from '@/components/dashboard/table/DashboardList';
import useBaseModal from '@/hooks/useBaseModal';
import { usePagination } from '@/hooks/usePagination';
import useQuery from '@/hooks/useQuery';
import { deleteMemberdata } from '@/lib/apis/memberdelete';
import { getMemberList } from '@/lib/apis/members';
import type { MembersResponse, Member } from '@/types/members';

const MEMBERS_PAGE_SIZE = 4;

interface GetMemberListParams {
  page: number;
  size: number;
  dashboardId: string;
  // 새로고침을 위한 더미 키
  refetchKey?: number;
}

export default function DashboardEdit() {
  const { dashboardId } = useParams<{ teamId: string; dashboardId: string }>();

  const currentDashboardId = dashboardId;

  const { currentPage, handlePrev, handleNext, isPrevDisabled } = usePagination();
  const { isOpen, handleModalOpen, handleModalClose: setIsOpen } = useBaseModal();
  const [deleteMessage, setDeleteMessage] = useState('');
  const [modalType, setModalType] = useState<'Login' | 'Account'>('Login');

  // ⭐️ [유지] 목록 새로고침을 위한 상태
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const params: GetMemberListParams = useMemo(
    () => ({
      page: currentPage,
      size: MEMBERS_PAGE_SIZE,
      dashboardId: currentDashboardId || '',
      // ⭐️ [유지] params에 refetchTrigger 포함
      refetchKey: refetchTrigger,
    }),
    [currentPage, currentDashboardId, refetchTrigger]
  );

  const { data: memberData, isLoading } = useQuery<MembersResponse, GetMemberListParams>({
    fetchFn: () => {
      if (!currentDashboardId) {
        return Promise.resolve({
          members: [],
          totalCount: 0,
        } as MembersResponse);
      }
      return getMemberList(params);
    },
    params,
  });

  const calculatedTotalPages = useMemo(() => {
    if (!memberData || !memberData.totalCount || params.size === 0) {
      return 1;
    }
    return Math.ceil(memberData.totalCount / params.size);
  }, [memberData, params.size]);

  const isNextDisabled = useMemo(() => {
    return currentPage >= calculatedTotalPages;
  }, [currentPage, calculatedTotalPages]);

  const handleDelete = useCallback(
    async (memberId: number) => {
      if (!currentDashboardId) {
        setDeleteMessage('오류: 대시보드 ID를 찾을 수 없어 구성원 삭제를 진행할 수 없습니다.');
        setModalType('Account');
        handleModalOpen();
        return;
      }

      try {
        await deleteMemberdata({
          memberId: memberId,
          // deleteMemberdata의 인터페이스가 dashboardId를 요구한다면 유지
          dashboardId: currentDashboardId,
        });

        setDeleteMessage(`구성원 ID ${memberId} 삭제가 완료되었습니다.`);
        setModalType('Login');
        handleModalOpen();

        // ⭐️ [유지] 삭제 성공 후 목록 새로고침
        setRefetchTrigger((prev) => prev + 1);
      } catch (error) {
        const errorMessage = `구성원 삭제 실패: ${error instanceof Error ? error.message : '알 수 없는 에러'}`;
        setDeleteMessage(errorMessage);
        setModalType('Account');
        handleModalOpen();
      }
    },
    [currentDashboardId, handleModalOpen]
  );

  const members: Member[] = memberData?.members || [];

  const memberListItems =
    isLoading && currentDashboardId ? (
      <p className='p-5'>구성원 목록 로딩 중...</p>
    ) : currentDashboardId && members.length === 0 ? (
      <p className='p-5'>등록된 구성원이 없습니다.</p>
    ) : (
      members.map((member) => (
        <DashboardItem
          key={member.id}
          type='MembersItem'
          user={member}
          userId={member.userId} // ⭐️ [유지] 공통 컴포넌트 제약 때문에 유지
          onDelete={handleDelete}>
          <DashboardItem.Content
            type='MembersItem'
            user={member}
            userId={member.userId} // ⭐️ [유지] 공통 컴포넌트 제약 때문에 유지
          />
          <DashboardItem.Action
            type='MembersItem'
            user={member}
            userId={member.userId} // ⭐️ [유지] 공통 컴포넌트 제약 때문에 유지
            // ⭐️ [유지] API에 전달할 ID는 member.id로 유지
            onDelete={() => handleDelete(member.id)}
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
        <DashboardList title='이름' titleClassName='sm:pl-7 pl-5 pt-[20px] sm:pt-[31px]'>
          {memberListItems}
        </DashboardList>
      </DashboardBody>

      {/* 모달 렌더링 */}
      {isOpen && (
        <BaseModalFrame size={modalType} setOnModal={setIsOpen}>
          <p>{deleteMessage}</p>
        </BaseModalFrame>
      )}
    </DashboardContainer>
  );
}

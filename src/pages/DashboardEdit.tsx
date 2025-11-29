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
import { deleteMemberdata, getMemberList } from '@/lib/apis/members';
import type { MembersResponse, Member } from '@/types/members';

const MEMBERS_PAGE_SIZE = 4;

// 유즈 파람스를 리액트 라우터 돔으로 쓰고 있어서 에러가 남 리액트 라우터 돔 안쓰고 싶어

interface GetMemberListParams {
  page: number;
  size: number;
  dashboardId: string;
  refetchKey?: number;
}

const calculateInitials = (nickname: string) => {
  if (!nickname) {
    return '';
  }
  return nickname.slice(0, 2).toUpperCase();
};

export default function DashboardEdit() {
  const { dashboardId } = useParams<{ teamId: string; dashboardId: string }>();

  const currentDashboardId = dashboardId;

  const { currentPage, handlePrev, handleNext, isPrevDisabled } = usePagination();
  const { isOpen, handleModalOpen, handleModalClose: setIsOpen } = useBaseModal();
  const [deleteMessage, setDeleteMessage] = useState('');

  // ⭐️ [제거] modalType 상태 제거 (이전에는 modalSize로 이름이 변경되었었음)
  // const [modalSize, setModalSize] = useState<'Login' | 'Account'>('Login');

  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const params: GetMemberListParams = useMemo(
    () => ({
      page: currentPage,
      size: MEMBERS_PAGE_SIZE,
      dashboardId: currentDashboardId || '',
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

  const [localMembers, setLocalMembers] = useState<Member[] | null>(null);
  const [localTotalCount, setLocalTotalCount] = useState<number | null>(null);

  const members: Member[] = useMemo(() => {
    if (localMembers) {
      return localMembers;
    }

    if (!memberData) {
      return [];
    }

    const filteredMembers = memberData.members;

    const membersWithInitials = filteredMembers.map((member) => {
      const calculatedInitial = calculateInitials(member.nickname);

      return {
        ...member,
        initials: calculatedInitial,
      };
    });

    // eslint-disable-next-line react-hooks/set-state-in-render
    setLocalMembers(membersWithInitials);

    // eslint-disable-next-line react-hooks/set-state-in-render
    setLocalTotalCount(filteredMembers.length);

    return membersWithInitials;
  }, [memberData, localMembers]);

  const calculatedTotalPages = useMemo(() => {
    const total = localTotalCount !== null ? localTotalCount : memberData?.totalCount || 0;
    if (total === 0 || params.size === 0) {
      return 1;
    }
    return Math.ceil(total / params.size);
  }, [localTotalCount, memberData?.totalCount, params.size]);

  const isNextDisabled = useMemo(() => {
    return currentPage >= calculatedTotalPages;
  }, [currentPage, calculatedTotalPages]);

  const handleDelete = useCallback(
    async (memberId: number) => {
      const memberToDelete = members.find((m) => m.id === memberId);
      const nickname = memberToDelete ? memberToDelete.nickname : `ID ${memberId}`;

      if (!currentDashboardId) {
        setDeleteMessage('오류: 대시보드 ID를 찾을 수 없어 구성원 삭제를 진행할 수 없습니다.');
        // ⭐️ [제거] setModalSize('Account');
        handleModalOpen();
        return;
      }

      try {
        await deleteMemberdata({
          memberId: memberId,
          dashboardId: currentDashboardId,
        });

        setDeleteMessage(`구성원 '${nickname}' 님의 삭제가 완료되었습니다.`);
        // ⭐️ [제거] setModalSize('Login');
        handleModalOpen();

        setLocalMembers((prevMembers) =>
          prevMembers ? prevMembers.filter((m) => m.id !== memberId) : null
        );
        setLocalTotalCount((prevCount) => (prevCount !== null ? Math.max(0, prevCount - 1) : null));

        setRefetchTrigger((prev) => prev + 1);
      } catch (error) {
        const errorMessage = `구성원 삭제 실패: ${error instanceof Error ? error.message : '알 수 없는 에러'}`;
        setDeleteMessage(errorMessage);
        // ⭐️ [제거] setModalSize('Account');
        handleModalOpen();
      }
    },
    [currentDashboardId, handleModalOpen, members]
  );

  const memberListItems =
    isLoading && currentDashboardId ? (
      <p className='p-5'>구성원 목록 로딩 중...</p>
    ) : currentDashboardId && members.length === 0 && calculatedTotalPages === 1 ? (
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

          {/* 소유자(isOwner: true)가 아닐 때만 삭제 버튼을 렌더링합니다. */}
          {!member.isOwner && (
            <DashboardItem.Action
              type='MembersItem'
              user={member}
              userId={member.userId}
              onDelete={() => handleDelete(member.id)}
            />
          )}
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

      {/* ⭐️ [수정] size prop 제거 및 deleteMessage가 있을 때만 내용 렌더링 */}
      {isOpen && deleteMessage && (
        <BaseModalFrame setOnModal={setIsOpen}>
          <p>{deleteMessage}</p>
        </BaseModalFrame>
      )}
    </DashboardContainer>
  );
}

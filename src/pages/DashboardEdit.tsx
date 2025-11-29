import axios from 'axios';
import { useMemo, useCallback, useState } from 'react';
import { useParams } from 'react-router';
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
import useMutation from '@/hooks/useMutation';
import { usePagination } from '@/hooks/usePagination';
import useQuery from '@/hooks/useQuery';
import { deleteMemberdata, getMemberList } from '@/lib/apis/members';
import type { MembersResponse, Member } from '@/types/members';

const MEMBERS_PAGE_SIZE = 4;

interface GetMemberListParams {
  page: number;
  size: number;
  dashboardId: string;
}

interface DeleteMemberParams {
  memberId: number;
  dashboardId: string;
}

export default function DashboardEdit() {
  const { currentPage, handlePrev, handleNext, isPrevDisabled } = usePagination();
  const { isOpen, handleModalOpen, handleModalClose: setIsOpen } = useBaseModal();
  const { dashboardId } = useParams<{ dashboardId: string }>();

  const [deleteMessage, setDeleteMessage] = useState<string>('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const params: GetMemberListParams = {
    page: currentPage,
    size: MEMBERS_PAGE_SIZE,
    dashboardId: dashboardId!,
  };

  const {
    data: memberData,
    isLoading,
    refetch,
  } = useQuery<MembersResponse, GetMemberListParams>({
    fetchFn: () => getMemberList(params),
    params,
  });

  const members: Member[] = useMemo(() => memberData?.members || [], [memberData]);

  const calculatedTotalPages = useMemo(() => {
    const total = memberData?.totalCount || 0;
    return total === 0 ? 1 : Math.ceil(total / MEMBERS_PAGE_SIZE);
  }, [memberData?.totalCount]);

  const isNextDisabled = currentPage >= calculatedTotalPages;

  const deleteMutation = useMutation<unknown, DeleteMemberParams>({
    mutationFn: deleteMemberdata,
    onSuccess: () => {
      if (deleteTargetId === null) {
        return;
      }

      const deletedMember = members.find((m) => m.id === deleteTargetId);
      const nickname = deletedMember ? deletedMember.nickname : `ID ${deleteTargetId}`;
      setDeleteMessage(`구성원 '${nickname}' 님의 삭제가 완료되었습니다.`);
      handleModalOpen();
      refetch();
    },

    onError: (error: unknown) => {
      let errorMessage = '구성원 삭제 중 알 수 없는 오류가 발생했습니다.';

      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data;
        if (typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
          errorMessage = data.message;
        } else if (error.response.status === 404) {
          errorMessage = `요청한 멤버를 찾을 수 없거나 해당 대시보드에 존재하지 않습니다. (에러 코드: 404)`;
        } else if (error.response.status === 403) {
          errorMessage = `권한이 없습니다. 대시보드 관리자만 멤버를 삭제할 수 있습니다. (에러 코드: 403)`;
        } else if (error.response.status) {
          errorMessage = `구성원 삭제 중 오류가 발생했습니다. (HTTP 상태 코드: ${error.response.status})`;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setDeleteMessage(errorMessage);
      handleModalOpen();
    },
  });

  const handleDelete = useCallback(
    (memberId: number) => {
      setDeleteTargetId(memberId);
      deleteMutation.mutate({ memberId, dashboardId: dashboardId! });
    },
    [dashboardId, deleteMutation]
  );

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

        {/* {!member.isOwner && ( */}
        <DashboardItem.Action
          type='MembersItem'
          user={member}
          userId={member.userId}
          onDelete={() => handleDelete(member.id)}
        />
        {/* )} */}
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

      {isOpen && (
        <BaseModalFrame setOnModal={setIsOpen}>
          <p>{deleteMessage}</p>
        </BaseModalFrame>
      )}
    </DashboardContainer>
  );
}

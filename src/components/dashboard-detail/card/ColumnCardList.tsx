import CreateButton from '@/components/dashboard/CreateButton';
import DashboardCard from '@/components/dashboard-detail/card/DashboardCard';
import ColumnInfoHeader from '@/components/dashboard-detail/column/ColumnInfoHeader';
import CreateCardModal from '@/components/dashboard-detail/modal/CreateCardModal';
import Skeleton from '@/components/skeleton/Skeleton';
import useMutation from '@/hooks/useMutation';
import useQuery from '@/hooks/useQuery';
import useUserContext from '@/hooks/useUserContext';
import { createCard, getCardData, type CreateCardType } from '@/lib/apis/cards';
import { getMemberList } from '@/lib/apis/members';
import type { CardInitialValueType, CardsResponse } from '@/types/card';
import type { ColumnsData } from '@/types/column';
import type { MembersResponse } from '@/types/members';
import { createCardRequestBody } from '@/utils/card/createCardReqBody';
import { uploadCardImage } from '@/utils/card/uploadCardImage';

interface ColumnCardListProps {
  column: ColumnsData;
  dashboardId: string;
  isCreateOpen: boolean;
  onHeaderClick: () => void;
  onOpenCreate: () => void;
  onCloseCreate: () => void;
}

export default function ColumnCardList({
  column,
  dashboardId,
  isCreateOpen,
  onHeaderClick,
  onOpenCreate,
  onCloseCreate,
}: ColumnCardListProps) {
  const { userProfile } = useUserContext();

  const cardQuery = useQuery<CardsResponse>({
    fetchFn: () =>
      getCardData({
        size: 20,
        cursorId: null,
        columnId: column.id,
      }),
  });

  const memberQuery = useQuery<MembersResponse>({
    fetchFn: () => getMemberList({ dashboardId }),
    params: { dashboardId },
  });

  // card mutation
  const createCardMutation = useMutation({
    mutationFn: (reqBody: CreateCardType) => createCard(reqBody),
    onSuccess: () => {
      // TODO: 카드 데이터에 업데이트 필요
      onCloseCreate();
    },
  });

  if (cardQuery.isLoading || !cardQuery.data || !memberQuery.data) {
    return (
      <div className='flex flex-col gap-[16px]'>
        <Skeleton className='mb-[8px] h-[24px] w-[120px] rounded' />
        <Skeleton className='flex flex-col overflow-hidden rounded-[6px] p-[18px] pb-[6px] select-none sm:flex-row sm:items-center sm:px-[20px] sm:py-[16px] md:max-w-[314px] md:flex-col md:items-start' />
      </div>
    );
  }

  // card handler
  const handleSubmitCreateCard = async (
    formValue: CardInitialValueType,
    imageFile: File | null
  ) => {
    const imageUrl = await uploadCardImage(column.id, imageFile);
    const reqBody = createCardRequestBody(
      formValue,
      column.id,
      dashboardId,
      imageUrl,
      userProfile?.id
    );
    await createCardMutation.mutate(reqBody);
  };

  const { cards, totalCount } = cardQuery.data;

  return (
    <>
      <div className='flex flex-col gap-[16px]'>
        <ColumnInfoHeader title={column.title} totalCount={totalCount} onClick={onHeaderClick} />
        <CreateButton
          onClick={() => {
            createCardMutation.reset();
            onOpenCreate();
          }}
        />
        {cards.map((card) => (
          <DashboardCard key={card.id} cardData={card} />
        ))}
      </div>

      {/* 할 일 생성 모달 */}
      {isCreateOpen && (
        <CreateCardModal
          serverErrorMessage={createCardMutation.error}
          onSubmit={handleSubmitCreateCard}
          memberData={memberQuery.data}
        />
      )}
    </>
  );
}

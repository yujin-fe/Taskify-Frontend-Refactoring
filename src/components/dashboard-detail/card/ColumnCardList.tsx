import CreateButton from '@/components/dashboard/CreateButton';
import DashboardCard from '@/components/dashboard-detail/card/DashboardCard';
import ColumnInfoHeader from '@/components/dashboard-detail/column/ColumnInfoHeader';
import CreateCardModal from '@/components/dashboard-detail/modal/CreateCardModal';
import Skeleton from '@/components/skeleton/Skeleton';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useMutation from '@/hooks/useMutation';
import useUserContext from '@/hooks/useUserContext';
import { createCard, getCardData, type CreateCardType } from '@/lib/apis/cards';
import type { CardInitialValueType, CardsResponse } from '@/types/card';
import type { ColumnsData } from '@/types/column';
import type { MembersResponse } from '@/types/members';
import { createCardRequestBody } from '@/utils/card/createCardReqBody';
import { uploadCardImage } from '@/utils/card/uploadCardImage';

interface ColumnCardListProps {
  column: ColumnsData;
  dashboardId: string;
  memberData: MembersResponse | null;
  isCreateOpen: boolean;
  onHeaderClick: () => void;
  onOpenCreate: () => void;
  onCloseCreate: () => void;
}

const CARD_LIST_SIZE = 5;

export default function ColumnCardList({
  column,
  dashboardId,
  memberData,
  isCreateOpen,
  onHeaderClick,
  onOpenCreate,
  onCloseCreate,
}: ColumnCardListProps) {
  const { userProfile } = useUserContext();

  const {
    data: infiniteData,
    isLoading,
    error,
    lastItemRef,
  } = useInfiniteScroll<CardsResponse, { size: number; columnId: number }>({
    fetchFn: (params) => getCardData(params),
    params: { size: CARD_LIST_SIZE, columnId: column.id },
    onSuccess: (prev, next) => {
      if (!prev) {
        return next;
      }

      return {
        ...next,
        cards: [...prev.cards, ...next.cards],
        totalCount: next.totalCount,
      };
    },
  });

  // card mutation
  const createCardMutation = useMutation({
    mutationFn: (reqBody: CreateCardType) => createCard(reqBody),
    onSuccess: () => {
      // TODO: 카드 데이터에 업데이트 필요
      onCloseCreate();
    },
  });

  if (isLoading && !infiniteData) {
    return (
      <div className='flex flex-col gap-[16px]'>
        <Skeleton className='mb-[8px] h-[24px] w-[120px] rounded' />
        <Skeleton className='flex flex-col overflow-hidden rounded-[6px] p-[18px] pb-[6px] select-none sm:flex-row sm:items-center sm:px-[20px] sm:py-[16px] md:max-w-[314px] md:flex-col md:items-start' />
      </div>
    );
  }

  if (!infiniteData || !memberData) {
    return null;
  }

  // TODO: 오류 컴포넌트 구현
  if (error) {
    return <div>오류가 발생했습니다.</div>;
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

  const { cards, totalCount } = infiniteData;

  return (
    <>
      <ColumnInfoHeader title={column.title} totalCount={totalCount} onClick={onHeaderClick} />
      <CreateButton
        className='mb-[16px] min-h-[40px]'
        onClick={() => {
          createCardMutation.reset();
          onOpenCreate();
        }}
      />
      <ul className='flex flex-col gap-[16px]'>
        {cards.map((card, index) => {
          const isLast = index === cards.length - 1;
          return (
            <li key={card.id} ref={isLast ? lastItemRef : undefined}>
              <DashboardCard cardData={card} />
            </li>
          );
        })}
      </ul>

      {/* 할 일 생성 모달 */}
      {isCreateOpen && (
        <CreateCardModal
          serverErrorMessage={createCardMutation.error}
          onSubmit={handleSubmitCreateCard}
          memberData={memberData}
        />
      )}
    </>
  );
}

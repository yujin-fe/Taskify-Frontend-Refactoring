import { useState } from 'react';
import { useParams } from 'react-router';
import CreateButton from '@/components/dashboard/CreateButton';
import DashboardCard from '@/components/dashboard-detail/card/DashboardCard';
import ColumnContainer from '@/components/dashboard-detail/column/ColumnContainer';
import ColumnInfoHeader from '@/components/dashboard-detail/column/ColumnInfoHeader';
import ChangeCardModal from '@/components/dashboard-detail/modal/ChangeCardModal';
import ChangeColumnModal from '@/components/dashboard-detail/modal/ChangeColumnModal';
import CreateCardModal from '@/components/dashboard-detail/modal/CreateCardModal';
import CreateColumnModal from '@/components/dashboard-detail/modal/CreateColumnModal';
import DeleteColumnModal from '@/components/dashboard-detail/modal/DeleteColumnModal';
import ColumnSkeleton from '@/components/skeleton/ColumnSkeleton';
import {
  CHANGE_CARD,
  CHANGE_COLUMN,
  CREATE_CARD,
  CREATE_COLUMN,
  DELETE_COLUMN,
} from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';
import useMutation from '@/hooks/useMutation';
import useQuery from '@/hooks/useQuery';
import { createCard, type CreateCardType } from '@/lib/apis/cards';
import {
  changeColumn,
  createColumn,
  deleteColumn,
  getColumnList,
  type ChangeColumnType,
  type CreateColumnType,
} from '@/lib/apis/columns';
import { getMemberList } from '@/lib/apis/members';
import type { CardInitialValueType, CardsResponse } from '@/types/card';
import type { ColumnsData, ColumnsResponse } from '@/types/column';
import type { MembersResponse } from '@/types/members';
import { createCardRequestBody } from '@/utils/card/createCardReqBody';
import { uploadCardImage } from '@/utils/card/uploadCardImage';
import { cn } from '@/utils/cn';

// TODO: 실제 데이터 연결 필요
const cardDataArray: CardsResponse[] = [
  {
    cursorId: 0,
    totalCount: 0,
    cards: [
      {
        id: 0,
        title: 'string',
        description: 'string',
        tags: ['string'],
        dueDate: 'string',
        assignee: {
          profileImageUrl: 'string',
          nickname: 'string',
          id: 0,
        },
        imageUrl: null,
        teamId: 'string',
        columnId: 0,
        createdAt: '2025-11-30T08:11:06.569Z',
        updatedAt: '2025-11-30T08:11:06.569Z',
      },
    ],
  },
];

interface ChangeColumnVariables {
  columnId: number;
  body: ChangeColumnType;
}

export default function DashboardDetail() {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
  const [selectedColumn, setSelectedColumn] = useState<ColumnsData | null>(null);

  // 컬럼 모달
  const createColumnModal = useModal(CREATE_COLUMN);
  const changeColumnModal = useModal(CHANGE_COLUMN);
  const deleteColumnModal = useModal(DELETE_COLUMN);

  // 카드 모달
  const createCardModal = useModal(CREATE_CARD);
  const changeCardModal = useModal(CHANGE_CARD);

  const columnQuery = useQuery<ColumnsResponse>({
    fetchFn: () => getColumnList(dashboardId || ''),
    params: { dashboardId },
  });
  const memberQuery = useQuery<MembersResponse>({
    fetchFn: () => getMemberList({ dashboardId: dashboardId ?? '' }),
  });

  // column mutation
  const createColumnMutation = useMutation<ColumnsData, CreateColumnType>({
    mutationFn: (reqBody) => createColumn(reqBody),
    onSuccess: (response) => {
      if (!response) {
        return;
      }
      columnQuery.setData((prev) => {
        if (!prev) {
          return {
            result: 'SUCCESS',
            data: [response],
          };
        }

        return {
          ...prev,
          data: [...prev.data, response],
        };
      });

      createColumnModal.handleModalClose();
    },
  });

  const updateColumnMutation = useMutation<ColumnsData, ChangeColumnVariables>({
    mutationFn: ({ columnId, body }) => changeColumn(columnId, body),
    onSuccess: (updated) => {
      if (!updated) {
        return;
      }

      columnQuery.setData((prev) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          data: prev.data.map((col) =>
            col.id === updated.id
              ? {
                  ...col,
                  title: updated.title,
                  updatedAt: updated.updatedAt,
                }
              : col
          ),
        };
      });

      setSelectedColumn(null);
      changeColumnModal.handleModalClose();
    },
  });

  const deleteColumnMutation = useMutation({
    mutationFn: (columnId: number) => deleteColumn(columnId),
    onSuccess: () => {
      columnQuery.refetch();
      deleteColumnModal.handleModalClose();
    },
  });

  // card mutation
  const createCardMutation = useMutation({
    mutationFn: (reqBody: CreateCardType) => createCard(reqBody),
    onSuccess: () => {
      // TODO: 카드 데이터에 업데이트 필요
      createCardModal.handleModalClose();
    },
  });

  if (!dashboardId) {
    // TODO: 나중에 404 페이지로 리턴
    return <div>유효하지 않은 대시보드입니다.</div>;
  }

  if (columnQuery.isLoading || !columnQuery.data || !memberQuery.data) {
    return (
      <div className='flex flex-col md:flex-row'>
        {Array.from({ length: 3 }).map((_, i) => (
          <ColumnSkeleton key={i} />
        ))}
      </div>
    );
  }

  // column handler
  const handleSubmitCreateColumn = async (columnName: string) => {
    const isDuplicate = columnQuery.data?.data.some(
      (col) => col.title.trim() === columnName.trim()
    );

    if (isDuplicate) {
      throw new Error('중복된 컬럼 이름입니다.');
    }

    await createColumnMutation.mutate({
      title: columnName,
      dashboardId: Number(dashboardId),
    });
  };

  const handleSubmitChangeColumn = async (nextTitle: string) => {
    if (!selectedColumn) {
      return;
    }

    const isDuplicate = columnQuery.data?.data.some(
      (col) => col.title.trim() === nextTitle.trim() && col.id !== selectedColumn.id
    );

    if (isDuplicate) {
      throw new Error('중복된 컬럼 이름입니다.');
    }

    await updateColumnMutation.mutate({
      columnId: selectedColumn.id,
      body: { title: nextTitle },
    });
  };

  const handleSubmitDeleteColumn = async () => {
    if (!selectedColumn) {
      return;
    }

    await deleteColumnMutation.mutate(selectedColumn.id);
  };

  // card handler
  const handleSubmitCreateCard = async (
    formValue: CardInitialValueType,
    imageFile: File | null
  ) => {
    if (!selectedColumn) {
      return;
    }
    const imageUrl = await uploadCardImage(selectedColumn.id, imageFile);
    const reqBody = createCardRequestBody(formValue, selectedColumn.id, dashboardId, imageUrl);
    await createCardMutation.mutate(reqBody);
  };

  const canAddColumn = columnQuery.data.data.length < 10;

  return (
    <>
      <div className='scrollbar-hidden flex flex-col overflow-hidden md:flex-row md:overflow-x-auto'>
        <div className='flex flex-col md:flex-row'>
          {columnQuery.data.data.map((column) => (
            <ColumnContainer key={column.id}>
              {/* TODO: totalCount는 카드 조회 모달에서 가져와야 함 */}
              <ColumnInfoHeader
                title={column.title}
                totalCount={5}
                onClick={() => {
                  setSelectedColumn(column);
                  updateColumnMutation.reset();
                  changeColumnModal.handleModalOpen();
                }}
              />
              <div className='flex flex-col gap-[16px]'>
                <CreateButton
                  onClick={() => {
                    setSelectedColumn(column);
                    createCardMutation.reset();
                    createCardModal.handleModalOpen();
                  }}
                />
                {/* TODO: 실제 데이터 연결 및 함수 연결 */}
                {cardDataArray.flatMap((c) =>
                  c.cards.map((card) => <DashboardCard key={card.id} cardData={card} />)
                )}
              </div>
            </ColumnContainer>
          ))}
        </div>
        {canAddColumn && (
          <>
            {/* 데스크탑 버튼 */}
            <CreateButton
              className='mx-[20px] mt-[68px] hidden w-[354px] shrink-0 font-2lg-bold md:flex'
              onClick={() => {
                createColumnMutation.reset();
                createColumnModal.handleModalOpen();
              }}>
              새로운 컬럼 추가하기
            </CreateButton>

            {/* 태블릿 ~ 모바일 버튼 */}
            <div
              className={cn(
                'fixed bottom-0 border-t border-gray-200 bg-base p-[20px] md:hidden',
                isCollapsed && 'w-[calc(100%-67px)]'
              )}>
              <CreateButton
                className='h-[70px] w-full shrink-0 font-2lg-bold'
                onClick={() => {
                  createColumnMutation.reset();
                  createColumnModal.handleModalOpen();
                }}>
                새로운 컬럼 추가하기
              </CreateButton>
            </div>
          </>
        )}
      </div>
      {/* 컬럼 생성 모달 */}
      {createColumnModal.isOpen && (
        <CreateColumnModal
          serverErrorMessage={createColumnMutation.error}
          onSubmit={handleSubmitCreateColumn}
        />
      )}

      {/* 컬럼 수정 모달 */}
      {changeColumnModal.isOpen && selectedColumn && (
        <ChangeColumnModal
          initialName={selectedColumn.title}
          serverErrorMessage={updateColumnMutation.error}
          onSubmit={handleSubmitChangeColumn}
          onDeleteModalOpen={() => {
            deleteColumnMutation.reset();
            deleteColumnModal.handleModalOpenOnly();
          }}
        />
      )}

      {/* 컬럼 삭제 모달 */}
      {deleteColumnModal.isOpen && selectedColumn && (
        <DeleteColumnModal
          isLoading={deleteColumnMutation.isLoading}
          serverErrorMessage={deleteColumnMutation.error}
          onDelete={handleSubmitDeleteColumn}
        />
      )}

      {/* 할 일 생성 모달 */}
      {createCardModal.isOpen && (
        <CreateCardModal
          serverErrorMessage={createCardMutation.error}
          onSubmit={handleSubmitCreateCard}
          memberData={memberQuery.data}
        />
      )}

      {/* 할 일 수정 모달 */}
      {changeCardModal.isOpen && <ChangeCardModal memberData={memberQuery.data} />}
    </>
  );
}

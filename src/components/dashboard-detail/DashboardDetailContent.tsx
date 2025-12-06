import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router';
import CreateButton from '@/components/dashboard/CreateButton';
import ColumnCardList from '@/components/dashboard-detail/card/ColumnCardList';
import ColumnContainer from '@/components/dashboard-detail/column/ColumnContainer';
import ChangeColumnModal from '@/components/dashboard-detail/modal/ChangeColumnModal';
import CreateColumnModal from '@/components/dashboard-detail/modal/CreateColumnModal';
import DeleteColumnModal from '@/components/dashboard-detail/modal/DeleteColumnModal';
import ColumnSkeleton from '@/components/skeleton/ColumnSkeleton';
import { CHANGE_COLUMN, CREATE_COLUMN, DELETE_COLUMN } from '@/constants/modalName';
import { useColumnListContext } from '@/hooks/useColumnListContext';
import { useModal } from '@/hooks/useModal';
import useMutation from '@/hooks/useMutation';
import useQuery from '@/hooks/useQuery';
import type { CreateColumnType, UpdateColumnVariables } from '@/lib/apis/columns';
import { getMemberList } from '@/lib/apis/members';
import type { ColumnsData } from '@/types/column';
import type { MembersResponse } from '@/types/members';
import { cn } from '@/utils/cn';

export default function DashboardDetailContent() {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';

  const { columnList, isLoading, createColumn, updateColumn, deleteColumn } =
    useColumnListContext();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    })
  );

  const [selectedColumn, setSelectedColumn] = useState<ColumnsData | null>(null);

  // 컬럼 모달
  const createColumnModal = useModal(CREATE_COLUMN);
  const changeColumnModal = useModal(CHANGE_COLUMN);
  const deleteColumnModal = useModal(DELETE_COLUMN);

  const memberQuery = useQuery<MembersResponse>({
    fetchFn: () => getMemberList({ dashboardId: dashboardId || '' }),
    params: { dashboardId },
  });

  // column mutation
  const createColumnMutation = useMutation({
    mutationFn: (body: CreateColumnType) => createColumn(body),
    onSuccess: () => {
      createColumnModal.handleModalClose();
    },
  });

  const updateColumnMutation = useMutation({
    mutationFn: (variables: UpdateColumnVariables) => updateColumn(variables),
    onSuccess: () => {
      setSelectedColumn(null);
      changeColumnModal.handleModalClose();
    },
  });

  const deleteColumnMutation = useMutation({
    mutationFn: (id: number) => deleteColumn(id),
    onSuccess: () => {
      deleteColumnModal.handleModalClose();
    },
  });

  const columnRefetchMap = useRef<Record<number, () => void>>({});
  const registerRefetch = useCallback((columnId: number, fn: () => void) => {
    columnRefetchMap.current[columnId] = fn;
  }, []);

  const columnMoveHandlerMap = useRef<Record<number, (cardId: number, toColumnId: number) => void>>(
    {}
  );
  const registerMoveHandler = useCallback(
    (columnId: number, fn: (cardId: number, toColumnId: number) => void) => {
      columnMoveHandlerMap.current[columnId] = fn;
    },
    []
  );

  const handleCardMoved = (fromColumnId: number, toColumnId: number) => {
    if (fromColumnId === toColumnId) {
      return;
    }

    columnRefetchMap.current[fromColumnId]?.();
    columnRefetchMap.current[toColumnId]?.();
  };

  // column handler
  const handleSubmitCreateColumn = async (columnName: string) => {
    const isDuplicate = columnList.some((col) => col.title.trim() === columnName.trim());

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

    const isDuplicate = columnList.some(
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type !== 'card') {
      return;
    }

    const cardId = activeData.cardId;
    const fromColumnId = activeData.columnId;

    const toColumnId =
      overData?.type === 'column'
        ? overData.columnId
        : overData?.type === 'card'
          ? overData.columnId
          : null;

    if (!toColumnId || fromColumnId === toColumnId) {
      return;
    }
    const moveHandler = columnMoveHandlerMap.current[fromColumnId];
    if (moveHandler) {
      moveHandler(cardId, toColumnId);
    }
  };

  const canAddColumn = columnList.length < 10;

  if (!dashboardId) {
    // TODO: 나중에 404 페이지로 리턴
    return <div>유효하지 않은 대시보드입니다.</div>;
  }

  if (isLoading || !columnList) {
    return (
      <div className='flex flex-col md:flex-row'>
        {Array.from({ length: 3 }).map((_, i) => (
          <ColumnSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className='scrollbar-hidden flex flex-col overflow-hidden md:flex-row md:overflow-x-auto'>
          <div className='flex flex-col md:flex-row'>
            {columnList.map((column) => (
              <ColumnContainer key={column.id}>
                <ColumnCardList
                  dashboardId={dashboardId}
                  memberData={memberQuery.data}
                  column={column}
                  onHeaderClick={() => {
                    setSelectedColumn(column);
                    updateColumnMutation.reset();
                    changeColumnModal.handleModalOpen();
                  }}
                  onRegisterRefetch={registerRefetch}
                  onRegisterMoveHandler={registerMoveHandler}
                  onCardMoved={handleCardMoved}
                />
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
      </DndContext>

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
    </>
  );
}

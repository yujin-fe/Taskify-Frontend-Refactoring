import Button from '@/components/common/Button';
import FormModal from '@/components/common/modal/FormModal';
import { DELETE_COLUMN } from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';

interface DeleteColumnModalProps {
  onDelete: () => Promise<void>;
  serverErrorMessage: string | null;
}

export default function DeleteColumnModal({
  onDelete,
  serverErrorMessage,
}: DeleteColumnModalProps) {
  const { handleModalClose } = useModal(DELETE_COLUMN);

  return (
    <FormModal
      className='items-center justify-center gap-0 px-[16px] py-[24px] sm:p-[24px]'
      modalName={DELETE_COLUMN}>
      <FormModal.Body>
        <div className='w-full text-center font-xl-medium'>컬럼의 모든 카드가 삭제됩니다.</div>
      </FormModal.Body>
      {serverErrorMessage && (
        <span className='-mb-[20px] inline-block font-md-medium text-error'>
          {serverErrorMessage}
        </span>
      )}
      <FormModal.Footer className='pt-[32px] sm:pt-[40px]'>
        <Button theme={'outlined'} onClick={handleModalClose}>
          취소
        </Button>
        <Button theme={'primary'} onClick={onDelete}>
          삭제
        </Button>
      </FormModal.Footer>
    </FormModal>
  );
}

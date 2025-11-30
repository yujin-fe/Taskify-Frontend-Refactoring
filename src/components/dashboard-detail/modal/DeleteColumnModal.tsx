import Button from '@/components/common/Button';
import FormModal from '@/components/common/modal/FormModal';
import { DELETE_COLUMN } from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';

export default function DeleteColumnModal() {
  const { handleModalClose } = useModal(DELETE_COLUMN);

  return (
    <FormModal
      className='items-center justify-center gap-0 px-[16px] py-[24px] sm:p-[24px]'
      modalName={DELETE_COLUMN}>
      <FormModal.Body>
        <div className='fw-full text-center font-xl-medium'>컬럼의 모든 카드가 삭제됩니다.</div>
      </FormModal.Body>
      <FormModal.Footer className='pt-[32px] sm:pt-[40px]'>
        <Button theme={'outlined'} onClick={handleModalClose}>
          취소
        </Button>
        <Button theme={'primary'} onClick={handleModalClose}>
          삭제
        </Button>
      </FormModal.Footer>
    </FormModal>
  );
}

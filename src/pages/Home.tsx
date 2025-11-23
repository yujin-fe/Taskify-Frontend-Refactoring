import FormModal from '@/components/common/modal/FormModal';
import HomeTopArea from '@/components/home/HomeTopArea';
import { useModal } from '@/hooks/useModal';
export default function Home() {
  const modal = useModal();
  return (
    <div className='bg-gray-900 px-4'>
      <main className='pt-[94px]'>
        <HomeTopArea />
        {modal.isOpen && (
          <FormModal size='lg' gap={32} modal={modal}>
            <FormModal.Title title='할일 생성' />
            <form>
              <FormModal.Body>
                <input name='input' />
              </FormModal.Body>
              <FormModal.Footer cancleButton='취소' submitButton='생성' />
            </form>
          </FormModal>
        )}
      </main>
      <button className='text-base' onClick={modal.handleModalOpen}>
        버튼
      </button>
    </div>
  );
}

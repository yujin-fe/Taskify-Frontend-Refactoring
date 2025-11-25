import { useContext } from 'react';
import Button from '@/components/common/Button';
import { FormModalContext } from '@/context/formModalContext';
export default function FormModalFooter({
  cancelButton,
  submitButton,
}: {
  cancelButton: string;
  submitButton: string;
}) {
  const { handleModalClose } = useContext(FormModalContext);
  return (
    <div className={'flex w-full max-sm:gap-[7px] sm:gap-2'}>
      <Button
        size='lg'
        theme={'outlined'}
        onClick={() => {
          handleModalClose();
        }}>
        {cancelButton}
      </Button>
      <Button size='lg' theme={'primary'} type='submit'>
        {submitButton}
      </Button>
    </div>
  );
}

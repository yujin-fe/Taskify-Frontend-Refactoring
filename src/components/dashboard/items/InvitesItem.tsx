import Button from '@/components/common/Button';
import { useInvitesContext } from '@/hooks/useInvitesContext';

export const InvitesItemContent = () => {
  const { invitee } = useInvitesContext();
  const email = invitee.email;

  return (
    <div className='flex flex-grow items-center'>
      <span className='font-md-regular text-gray-700 sm:font-lg-regular'>{email}</span>
    </div>
  );
};

export const InvitesItemAction = () => {
  const { id, onCancel } = useInvitesContext();

  const handleCancelClick = () => {
    onCancel?.(id);
  };

  return (
    <div className='ml-4 flex-shrink-0 flex-grow-0'>
      <Button
        theme='secondary'
        size='sm'
        type='button'
        onClick={handleCancelClick}
        className='w-[52px] flex-shrink-0 flex-grow-0 bg-gray-0 px-[9px] font-xs-medium whitespace-nowrap sm:w-[84px] sm:font-md-medium'>
        취소
      </Button>
    </div>
  );
};

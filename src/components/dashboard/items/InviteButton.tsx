import Icons from '@/assets/icons';
import Button from '@/components/common/Button';

export const InvitesButtonAction = () => {
  const handleInviteClick = () => {};

  return (
    <div className='flex-shrink-0 flex-grow-0'>
      <Button
        theme='primary'
        type='button'
        onClick={handleInviteClick}
        className='h-[26px] w-[86px] flex-none rounded-[4px] font-xs-medium sm:h-[32px] sm:w-[105px] sm:font-md-medium'>
        <span className='flex items-center gap-[6px] sm:gap-[8px]'>
          <Icons.AddDashboard
            className='h-[14px] w-[14px] sm:h-[16px] sm:w-[16px]'
            aria-hidden='true'
          />
          초대하기
        </span>
      </Button>
    </div>
  );
};

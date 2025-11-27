import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/Button';
import { useMemberContext } from '@/hooks/useMemberContext';

export const MembersItemContent = () => {
  const memberContext = useMemberContext();
  const { nickname } = memberContext;

  return (
    <div className='flex flex-grow items-center'>
      <div className='flex items-center gap-[8px] sm:gap-[12px]'>
        <Avatar size='m' user={memberContext}>
          <Avatar.Img />
          <Avatar.Fallback />
        </Avatar>
        <span className='font-md-regular text-gray-700 sm:font-lg-regular'>{nickname}</span>
      </div>
    </div>
  );
};

export const MembersItemAction = () => {
  const { userId, onDelete } = useMemberContext();

  const handleDeleteClick = () => {
    onDelete?.(userId);
  };

  return (
    <div className='ml-4 flex-shrink-0 flex-grow-0'>
      <Button
        theme='secondary'
        size='sm'
        type='button'
        onClick={handleDeleteClick}
        className='w-[52px] flex-shrink-0 flex-grow-0 bg-gray-0 px-[9px] font-xs-medium whitespace-nowrap sm:w-[84px] sm:font-md-medium'>
        삭제
      </Button>
    </div>
  );
};

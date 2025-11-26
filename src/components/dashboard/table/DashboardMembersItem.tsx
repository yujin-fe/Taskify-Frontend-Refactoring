import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/Button';
import type { UserMe } from '@/types/userMe';
import { cn } from '@/utils/cn';

type DashboardMembersItemProps = {
  user: UserMe;
  onDelete: (userID: number) => void;
  className?: string;
};

export default function DashboardMembersItem({
  user,
  onDelete,
  className,
}: DashboardMembersItemProps) {
  const handleDeleteClick = () => {
    onDelete(user.id);
  };

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className='flex items-center gap-[8px] sm:gap-[12px]'>
        <Avatar size='m' user={user}>
          <Avatar.Img />
          <Avatar.Fallback />
        </Avatar>
        <span className='font-md-regular text-gray-700 sm:font-lg-regular'>{user.nickname}</span>
      </div>
      <div className='flex-shrink-0 flex-grow-0'>
        <Button
          theme='secondary'
          type='button'
          onClick={handleDeleteClick}
          className='h-[32px] w-[52px] flex-shrink-0 flex-grow-0 rounded-sm bg-gray-0 px-[9px] py-[7px] font-xs-medium whitespace-nowrap sm:w-[84px] sm:px-[29px] sm:font-md-medium'>
          삭제
        </Button>
      </div>
    </div>
  );
}

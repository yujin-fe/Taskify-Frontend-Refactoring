import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/Button';
import useMemberContext from '@/context/memberContext';

export const ItemContent = () => {
  const { type, member, email } = useMemberContext();

  const membersItemContent = type === 'MembersItem' && (
    <div className='flex items-center gap-[8px] sm:gap-[12px]'>
      <Avatar size='m' user={member}>
        <Avatar.Img />
        <Avatar.Fallback />
      </Avatar>
      <span className='font-md-regular text-gray-700 sm:font-lg-regular'>{member.nickname}</span>
    </div>
  );

  const invitesItemContent = type === 'InvitesItem' && (
    <span className='font-md-regular text-gray-700 sm:font-lg-regular'>{email}</span>
  );

  return (
    <div className='flex flex-grow items-center'>
      {membersItemContent}
      {invitesItemContent}
    </div>
  );
};

export const ItemAction = () => {
  const { type, member, onCancel, onDelete } = useMemberContext();

  const handleDeleteClick = () => {
    onDelete(member.id);
  };

  const handleCancelClick = () => {
    onCancel(member.id);
  };

  const membersItemAction = type === 'MembersItem' && (
    <Button
      theme='secondary'
      size='sm'
      type='button'
      onClick={handleDeleteClick}
      className='w-[52px] flex-shrink-0 flex-grow-0 bg-gray-0 px-[9px] font-xs-medium whitespace-nowrap sm:w-[84px] sm:font-md-medium'>
      삭제
    </Button>
  );

  const invitesItemAction = type === 'InvitesItem' && (
    <Button
      theme='secondary'
      size='sm'
      type='button'
      onClick={handleCancelClick}
      className='w-[52px] flex-shrink-0 flex-grow-0 bg-gray-0 px-[9px] font-xs-medium whitespace-nowrap sm:w-[84px] sm:font-md-medium'>
      취소
    </Button>
  );

  return (
    <div className='ml-4 flex-shrink-0 flex-grow-0'>
      {membersItemAction}
      {invitesItemAction}
    </div>
  );
};

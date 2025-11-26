import React, { useMemo } from 'react';
import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/Button';
import InvitesContext from '@/context/invitesContext';
import MemberContext from '@/context/memberContext';
import useInvitesContext from '@/hooks/useInvitesContext';
import useMemberContext from '@/hooks/useMemberContext';
import type { UserMe } from '@/types/userMe';
import { cn } from '@/utils/cn';

export type ItemType = 'MembersItem' | 'InvitesItem';

type DashboardItemProps = {
  type: ItemType;
  member: UserMe;
  email: string;
  onCancel: (userID: number) => void;
  onDelete: (userID: number) => void;
  className?: string;
  children: React.ReactNode;
};

type WrapperProps = { type: ItemType };

const MembersItemContent = () => {
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

const MembersItemAction = () => {
  const { id, onDelete } = useMemberContext();

  const handleDeleteClick = () => {
    onDelete(id);
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

const InvitesItemContent = () => {
  const { email } = useInvitesContext();

  return (
    <div className='flex flex-grow items-center'>
      <span className='font-md-regular text-gray-700 sm:font-lg-regular'>{email}</span>
    </div>
  );
};

const InvitesItemAction = () => {
  const { id, onCancel } = useInvitesContext();

  const handleCancelClick = () => {
    onCancel(id);
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

export const ContentWrapper = ({ type }: WrapperProps) => {
  if (type === 'MembersItem') {
    return <MembersItemContent />;
  }
  if (type === 'InvitesItem') {
    return <InvitesItemContent />;
  }
  return null;
};

export const ActionWrapper = ({ type }: WrapperProps) => {
  if (type === 'MembersItem') {
    return <MembersItemAction />;
  }
  if (type === 'InvitesItem') {
    return <InvitesItemAction />;
  }
  return null;
};

export function DashboardItemRoot({
  type,
  member,
  email,
  onCancel,
  onDelete,
  className,
  children,
}: DashboardItemProps) {
  const memberContextValue = useMemo(() => {
    if (type === 'MembersItem') {
      return { ...member, type: 'MembersItem' as const, onDelete };
    }
    return null;
  }, [type, member, onDelete]);

  const invitesContextValue = useMemo(() => {
    if (type === 'InvitesItem') {
      return { ...member, email, type: 'InvitesItem' as const, onCancel };
    }
    return null;
  }, [type, member, email, onCancel]);

  const contextProvider =
    type === 'MembersItem' && memberContextValue ? (
      <MemberContext value={memberContextValue}>{children}</MemberContext>
    ) : type === 'InvitesItem' && invitesContextValue ? (
      <InvitesContext value={invitesContextValue}>{children}</InvitesContext>
    ) : (
      children
    );

  return (
    <li className={cn('flex items-center justify-between border-8 border-gray-0 p-3', className)}>
      {contextProvider}
    </li>
  );
}

import React, { useMemo } from 'react';
import InvitesContext from '@/context/invitesContext';
import MemberContext from '@/context/memberContext';
import type { UserMe } from '@/types/userMe';
import { cn } from '@/utils/cn';
import {
  MembersItemContent,
  MembersItemAction,
  InvitesItemContent,
  InvitesItemAction,
} from './DashboardItem';

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

export function DashboardItem({
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
      return {
        ...member,
        type: 'MembersItem' as const,
        onDelete,
      };
    }
    return null;
  }, [type, member, onDelete]);

  const invitesContextValue = useMemo(() => {
    if (type === 'InvitesItem') {
      return {
        ...member,
        email,
        type: 'InvitesItem' as const,
        onCancel,
      };
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
    <ul className={cn('flex items-center justify-between border-8 border-gray-0 p-3', className)}>
      {contextProvider}
    </ul>
  );
}

const ContentWrapper = ({ type }: { type: ItemType }) => {
  if (type === 'MembersItem') {
    return <MembersItemContent />;
  }
  if (type === 'InvitesItem') {
    return <InvitesItemContent />;
  }
  return null;
};

const ActionWrapper = ({ type }: { type: ItemType }) => {
  if (type === 'MembersItem') {
    return <MembersItemAction />;
  }
  if (type === 'InvitesItem') {
    return <InvitesItemAction />;
  }
  return null;
};

const AssignedDashboardItem = Object.assign(DashboardItem, {
  Content: ContentWrapper,
  Action: ActionWrapper,
});

export default AssignedDashboardItem;

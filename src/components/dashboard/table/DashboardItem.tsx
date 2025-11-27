// DashboardItemRoot.tsx

import React, { useMemo } from 'react';
import InvitesContext from '@/context/invitesContext';
import MemberContext from '@/context/memberContext';
import type { InvitationData } from '@/types/InvitationData';
import type { MemberData } from '@/types/memberData';
import { cn } from '@/utils/cn';

export type ItemType = 'MembersItem' | 'InvitesItem';

type MemberItemProps = {
  type: 'MembersItem';
  data: MemberData;
  onDelete: (userId: number) => void;
};

type InviteItemProps = {
  type: 'InvitesItem';
  data: InvitationData;
  onCancel: (invitationId: number) => void;
};

export type DashboardItemProps = (MemberItemProps | InviteItemProps) & {
  className?: string;
  children: React.ReactNode;
};

export function DashboardItemRoot(props: DashboardItemProps) {
  const memberContextValue = useMemo(() => {
    if (props.type === 'MembersItem') {
      return {
        ...props.data,
        type: 'MembersItem' as const,
        onDelete: props.onDelete,
      };
    }
    return null;
  }, [props]);

  const invitesContextValue = useMemo(() => {
    if (props.type === 'InvitesItem') {
      return {
        ...props.data,
        type: 'InvitesItem' as const,
        onCancel: props.onCancel,
      };
    }
    return null;
  }, [props]);

  const contextProvider =
    props.type === 'MembersItem' && memberContextValue ? (
      <MemberContext value={memberContextValue}>{props.children}</MemberContext>
    ) : props.type === 'InvitesItem' && invitesContextValue ? (
      <InvitesContext value={invitesContextValue}>{props.children}</InvitesContext>
    ) : (
      props.children
    );

  return (
    <li //추후 수정
      className={cn(
        'flex items-center justify-between border-8 border-gray-0 p-3',
        props.className
      )}>
      {contextProvider}
    </li>
  );
}

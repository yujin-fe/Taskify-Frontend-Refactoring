/**  <Table
 *   <Table.Content />
 *   <Table.Action />
 * </Table>
 **/
import React, { useMemo } from 'react';
import { MemberContext } from '@/context/memberContext';
import type { UserMe } from '@/types/userMe';
import { cn } from '@/utils/cn';
import { ItemContent, ItemAction } from './DashboardItem';

export type ItemType = 'MembersItem' | 'InvitesItem';

type TableProps = {
  type: ItemType;
  member: UserMe;
  email: string;
  onCancel: (userID: number) => void;
  onDelete: (userID: number) => void;
  className?: string;
  children: React.ReactNode;
};

function TableRoot({ type, member, email, onCancel, onDelete, className, children }: TableProps) {
  const value = useMemo(
    () => ({ type, member, email, onCancel, onDelete }),
    [type, member, email, onCancel, onDelete]
  );

  return (
    <li className={cn('flex items-center justify-between border-8 border-gray-0 p-3', className)}>
      <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
    </li>
  );
}

const Table = Object.assign(TableRoot, {
  Content: ItemContent,
  Action: ItemAction,
});

export default Table;

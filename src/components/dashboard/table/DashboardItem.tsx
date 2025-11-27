import type { UserMe } from '@/types/userMe';
import { cn } from '@/utils/cn';

export type ItemType = 'MembersItem' | 'InvitesItem';

type MemberItemProps = {
  type: 'MembersItem';
  user: UserMe;
  userId: number;
  onDelete: (userId: number) => void;
};

type InviteItemProps = {
  type: 'InvitesItem';
  email: string;
  id: number;
  onCancel: (invitationId: number) => void;
};

export type DashboardItemProps = (MemberItemProps | InviteItemProps) & {
  className?: string;
  children: React.ReactNode;
};

export function DashboardItemRoot(props: DashboardItemProps) {
  return (
    <li //추후 수정
      className={cn(
        'flex items-center justify-between border-8 border-gray-0 p-3',
        props.className
      )}>
      {props.children}
    </li>
  );
}

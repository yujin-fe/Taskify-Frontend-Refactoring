import type { ItemType } from '@/components/dashboard/table/DashboardItem';
import { InvitesItemAction, InvitesItemContent } from './InvitesItem'; // InvitesItem 컴포넌트 import
import { MembersItemAction, MembersItemContent } from './MembersItem';

type WrapperProps = { type: ItemType };

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

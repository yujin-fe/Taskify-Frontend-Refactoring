import type { ItemType } from '@/components/dashboard/table/Table';
import useMemberContext from '@/context/memberContext';
import type { UserMe } from '@/types/userMe';

interface MemberItemData {
  member: UserMe;
  onDelete: (userID: number) => void;
}

interface InviteItemData {
  email: string;
  onCancel: (userID: number) => void;
}

interface UseMemberItemResult {
  type: ItemType;
  memberData?: MemberItemData;
  inviteData?: InviteItemData;
}

const useMemberItem = (): UseMemberItemResult => {
  const context = useMemberContext();
  const { type, member, email, onDelete, onCancel } = context;

  const result: UseMemberItemResult = {
    type,
  };

  if (type === 'MembersItem') {
    result.memberData = {
      member,
      onDelete,
    };
  } else if (type === 'InvitesItem') {
    result.inviteData = {
      email,
      onCancel,
    };
  }

  return result;
};

export default useMemberItem;

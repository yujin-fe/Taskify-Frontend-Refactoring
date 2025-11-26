import { createContext, useContext } from 'react';
import type { ItemType } from '@/components/dashboard/table/Table';
import type { UserMe } from '@/types/userMe';

interface MemberContextType {
  type: ItemType;
  member: UserMe;
  email: string;
  onCancel: (userID: number) => void;
  onDelete: (userID: number) => void;
}

export const MemberContext = createContext<MemberContextType | null>(null);

const useMemberContext = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMemberContext must be used within a <Table> component provider.');
  }
  return context;
};

export default useMemberContext;

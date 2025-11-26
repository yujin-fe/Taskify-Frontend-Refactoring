import { createContext } from 'react';
import type { UserMe } from '@/types/userMe';

interface MemberContextType extends UserMe {
  type: 'MembersItem';
  onDelete: (userID: number) => void;
}

const MemberContext = createContext<MemberContextType | null>(null);

export default MemberContext;

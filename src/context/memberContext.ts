import { createContext } from 'react';
import type { MemberData } from '@/types/memberData';

interface MemberContextType extends MemberData {
  type: 'MembersItem';

  onDelete?: (userId: number) => void;
}

const MemberContext = createContext<MemberContextType | null>(null);

export default MemberContext;

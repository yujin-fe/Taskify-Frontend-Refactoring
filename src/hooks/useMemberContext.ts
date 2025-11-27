// useMemberContext.ts

import { useContext } from 'react';
import MemberContext from '@/context/memberContext';

export const useMemberContext = () => {
  const context = useContext(MemberContext);

  if (context === null) {
    throw new Error('useMemberContext must be used within a MemberContextProvider');
  }

  return context;
};

export default MemberContext;

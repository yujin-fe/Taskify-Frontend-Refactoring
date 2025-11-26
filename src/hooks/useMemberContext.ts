import { useContext } from 'react';
import MemberContext from '@/context/memberContext';

const useMemberContext = () => {
  const context = useContext(MemberContext);

  if (!context) {
    throw new Error('useMemberContext must be used within a <MemberContext.Provider>.');
  }
  return context;
};

export default useMemberContext;

// useInvitesContext.ts

import { useContext } from 'react';
import InvitesContext from '@/context/invitesContext';

export const useInvitesContext = () => {
  const context = useContext(InvitesContext);

  if (context === null) {
    throw new Error('useInvitesContext must be used within an InvitesContextProvider');
  }

  return context;
};

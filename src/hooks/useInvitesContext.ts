import { useContext } from 'react';
import InvitesContext from '@/context/invitesContext';

const useInvitesContext = () => {
  const context = useContext(InvitesContext);

  if (!context) {
    throw new Error('useInvitesContext must be used within a <InvitesContext.Provider>.');
  }
  return context;
};

export default useInvitesContext;

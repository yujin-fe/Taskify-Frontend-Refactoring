import { useContext } from 'react';
import { InvitedDashboardContext } from '@/context/InvitedDashboardContext';

export const useInvitedDashboardCtx = () => {
  const context = useContext(InvitedDashboardContext);

  if (!context) {
    throw new Error('InvitedDashboardContext 안에서 사용하세요');
  }

  return context;
};

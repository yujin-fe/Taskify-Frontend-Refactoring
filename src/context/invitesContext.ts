import { createContext } from 'react';
import type { InvitationData } from '@/types/InvitationData';

interface InvitesContextType extends InvitationData {
  type: 'InvitesItem';
  onCancel?: (invitationId: number) => void;
}

const InvitesContext = createContext<InvitesContextType | null>(null);

export default InvitesContext;

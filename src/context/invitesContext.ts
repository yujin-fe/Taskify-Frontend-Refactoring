import { createContext } from 'react';
import type { UserMe } from '@/types/userMe';

interface InvitesContextType extends UserMe {
  type: 'InvitesItem';
  id: number;
  email: string;
  onCancel: (userID: number) => void;
}
const InvitesContext = createContext<InvitesContextType | null>(null);

export default InvitesContext;

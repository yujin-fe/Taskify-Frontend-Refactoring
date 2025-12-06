import { createContext, type SetStateAction, type Dispatch } from 'react';
import { type MyInvitationResponse } from '@/types/invitations';

interface InvitedDashboardContextType {
  ListData: MyInvitationResponse;
  setListData: Dispatch<SetStateAction<MyInvitationResponse | null>>;
  resetListData: () => void;
  lastItemRef: React.RefObject<HTMLLIElement | null>;
  confirmMessage: string | null;
  setConfirmMessage: Dispatch<SetStateAction<string>>;
  search: string | null;
  setSearch: Dispatch<SetStateAction<string | null>>;
}

export const InvitedDashboardContext = createContext({} as InvitedDashboardContextType);

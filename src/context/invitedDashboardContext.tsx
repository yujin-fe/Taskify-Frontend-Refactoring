import { createContext, type SetStateAction, type Dispatch } from 'react';
import { type MyInvitationResponse } from '@/types/invitations';

interface InvitedDashboardContextType {
  ListData: MyInvitationResponse;
  setListData: Dispatch<SetStateAction<MyInvitationResponse | null>>;
  resetListData: () => void;
  lastItemRef: React.RefObject<HTMLLIElement | null>;
  search: null | string;
  setSearch: Dispatch<SetStateAction<null | string>>;
  confirmMessage: string | null;
  setConfirmMessage: Dispatch<SetStateAction<string>>;
}

export const InvitedDashboardContext = createContext({} as InvitedDashboardContextType);

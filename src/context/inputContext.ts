import { createContext } from 'react';

interface InputContextType {
  id: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  hasError?: boolean;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
}

export const InputContext = createContext<InputContextType | null>(null);

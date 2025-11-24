import { useState } from 'react';
import { useSearchParams } from 'react-router';

export const useModal = (modalName: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialOpen = searchParams.get(modalName) === 'true';
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleModalOpen = () => {
    setIsOpen(true);
    setSearchParams({ [modalName]: 'true' });
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setSearchParams({});
  };

  return { isOpen, handleModalOpen, handleModalClose };
};

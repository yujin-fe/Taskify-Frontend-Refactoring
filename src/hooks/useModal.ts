import { useState } from 'react';
import { useSearchParams } from 'react-router';

export const useModal = (modalName: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialOpen = searchParams.get(modalName) === 'true';
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleModalOpen = () => {
    setIsOpen(true);
    setSearchParams((prev) => {
      prev.set(modalName, 'true');
      return prev;
    });
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setSearchParams((prev) => {
      prev.delete(modalName);
      return prev;
    });
  };

  return { isOpen, handleModalOpen, handleModalClose };
};

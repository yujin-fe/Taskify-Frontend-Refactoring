import { useSearchParams } from 'react-router';

export const useModal = (modalName: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isOpen = searchParams.get(modalName) === 'true';

  const handleModalOpen = () => {
    setSearchParams((prev) => {
      prev.set(modalName, 'true');
      return prev;
    });
  };

  const handleModalClose = () => {
    setSearchParams((prev) => {
      prev.delete(modalName);
      return prev;
    });
  };

  return { modalName, isOpen, handleModalOpen, handleModalClose };
};

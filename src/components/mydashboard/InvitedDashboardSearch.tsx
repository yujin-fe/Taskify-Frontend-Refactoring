import axios from 'axios';
import Icons from '@/assets/icons';
import Input from '@/components/common/input/Input';
import useBaseModal from '@/hooks/useBaseModal';
import { useInvitedDashboardCtx } from '@/hooks/useInvitedDashboardCtx';
import { getMyInvitations } from '@/lib/apis/Invitations';

export default function InvitedDashboardSearch() {
  const {
    search,
    setSearch,
    resetListData: resetData,
    setListData: setData,
    setConfirmMessage,
  } = useInvitedDashboardCtx();
  const { handleModalOpen } = useBaseModal();
  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleResetSearchbar = async () => {
    resetData();
    setSearch('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) {
      resetData();
      return;
    }
    try {
      const data = await getMyInvitations({
        title: search,
      });
      setData(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setConfirmMessage(`${error?.response?.data?.message}: 오류가 발생했습니다.`);
        handleModalOpen();
      }
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Input value={search ?? ''} onChange={handleSearch}>
        <Input.Group className='flex h-[40px] items-center'>
          <Input.PrefixIcon>
            <Icons.Search className='text-gray-700' />
          </Input.PrefixIcon>
          <Input.SuffixButton ariaLabel='검색창 초기화' onClick={handleResetSearchbar}>
            <Icons.Close />
          </Input.SuffixButton>
          <Input.Field placeholder='검색' />
        </Input.Group>
      </Input>
    </form>
  );
}

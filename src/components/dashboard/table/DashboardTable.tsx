import Icons from '@/assets/icons';
import Button from '@/components/common/Button';
import FormModal from '@/components/common/modal/FormModal';
import PageIndicator from '@/components/common/PageIndicator';
import PageNation from '@/components/common/PageNation';
import Title from '@/components/common/Title';
import DashboardContainer from '@/components/dashboard/table/DashboardContainer';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
import { useModal } from '@/hooks/useModal';
import { usePagination } from '@/hooks/usePagination';

const MEMBERS_TOTAL_PAGES = 4;
const INVITES_TOTAL_PAGES = 5;

type TableProps = {
  type: 'MembersTop' | 'InvitesTop';
};

/**
 * DashboardTable 컴포넌트는 DashboardTable UI의 루트 컨테이너입니다.
 */
export default function DashboardTable({ type }: TableProps) {
  const isInvitesTop = type === 'InvitesTop';
  const titleText = isInvitesTop ? '초대 내역' : '구성원';
  const containerType = isInvitesTop ? 'Invites' : 'Members';
  const totalPages = isInvitesTop ? INVITES_TOTAL_PAGES : MEMBERS_TOTAL_PAGES;

  const { currentPage, handlePrev, handleNext, isPrevDisabled, isNextDisabled } =
    usePagination(totalPages);

  const modal = useModal();

  const handleInviteClick = () => {
    modal.handleModalOpen();
  };

  return (
    <>
      <DashboardContainer type={containerType}>
        <DashboardHeader>
          <Title as='h2' size='xl' weight='bold' className='sm:text-2xl'>
            {titleText}
          </Title>

          <PageIndicator currentPage={currentPage} totalPages={totalPages} />

          <PageNation
            onPrev={handlePrev}
            onNext={handleNext}
            prevDisabled={isPrevDisabled}
            nextDisabled={isNextDisabled}
          />

          {isInvitesTop && (
            <Button
              theme='primary'
              type='button'
              onClick={handleInviteClick}
              className='h-[26px] w-[86px] flex-none rounded-[4px] font-xs-medium sm:h-[32px] sm:w-[105px] sm:font-md-medium'>
              <span className='flex items-center gap-[6px] sm:gap-[8px]'>
                <Icons.AddDashboard
                  className='h-[14px] w-[14px] sm:h-[16px] sm:w-[16px]'
                  aria-hidden='true'
                />
                초대하기
              </span>
            </Button>
          )}
        </DashboardHeader>
      </DashboardContainer>

      {isInvitesTop && modal.isOpen && (
        <FormModal size='md' gap={24} modal={modal} className='sm:h-[270px] sm:w-[568px]'>
          <FormModal.Title title='초대하기' />
          <form>
            <FormModal.Body>ㅔ</FormModal.Body>
            <FormModal.Footer cancleButton='취소' submitButton='초대' />
          </form>
        </FormModal>
      )}
    </>
  );
}

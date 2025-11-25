import { useState } from 'react';
import Icons from '@/assets/icons';
import Button from '@/components/common/Button';
import PageIndicator from '@/components/common/PageIndicator';
import PageNation from '@/components/common/PageNation';
import Title from '@/components/common/Title';
import { cn } from '@/utils/cn';

type TableTopProps = {
  type?: 'MembersTop' | 'InvitesTop';
};

export default function TableTop({ type = 'MembersTop' }: TableTopProps) {
  const titleText = type === 'MembersTop' ? '구성원' : '초대 내역';
  const totalPages = type === 'MembersTop' ? 4 : 5;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className={cn('flex items-center justify-between')}>
      <Title as='h2' size='xl' weight='bold' className='sm:text-2xl'>
        {titleText}
      </Title>

      <div className='flex flex-wrap items-center justify-end gap-[12px] sm:gap-[16px]'>
        <PageIndicator currentPage={currentPage} totalPages={totalPages} />
        <PageNation
          onPrev={handlePrev}
          onNext={handleNext}
          prevDisabled={isPrevDisabled}
          nextDisabled={isNextDisabled}
        />

        {type === 'InvitesTop' && (
          <Button
            theme='primary'
            type='submit'
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
      </div>
    </div>
  );
}

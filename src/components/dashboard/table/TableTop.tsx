import { useState } from 'react';
import PageIndicator from '@/components/common/PageIndicator';
import PageNation from '@/components/common/PageNation';
import Title from '@/components/common/Title';
import { cn } from '@/utils/cn';

type TableTopProps = {
  type?: 'MembersTop' | 'InvitesTop';
};

export default function TableTop({ type = 'MembersTop' }: TableTopProps) {
  const titleText = type === 'MembersTop' ? '구성원' : '초대내역';
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
    <div
      className={cn(
        'flex items-center justify-between',

        type === 'MembersTop' && '',
        type === 'InvitesTop' && ''
      )}>
      <Title as='h2' size='2xl' weight='bold'>
        {titleText}
      </Title>
      <div className='flex items-center'>
        <PageIndicator currentPage={currentPage} totalPages={totalPages} />
        <PageNation
          onPrev={handlePrev}
          onNext={handleNext}
          prevDisabled={isPrevDisabled}
          nextDisabled={isNextDisabled}
        />
      </div>
    </div>
  );
}

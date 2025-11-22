import { PageIndicator } from '@/components/common/PageIndicator';
import PageNation from '@/components/common/PageNation';

export default function Home() {
  const handlePrev = () => {
    // API 호출 로직 - 이전 페이지로 이동
  };

  const handleNext = () => {
    // API 호출 로직 - 다음 페이지로 이동
  };

  return (
    <div>
      <p>메인 페이지~</p>
      <div className='mt-8 flex items-center justify-center gap-4'>
        <PageIndicator currentPage={2} totalPages={10} />
        <PageNation
          onPrev={handlePrev}
          onNext={handleNext}
          prevDisabled={false}
          nextDisabled={false}
        />
      </div>
    </div>
  );
}

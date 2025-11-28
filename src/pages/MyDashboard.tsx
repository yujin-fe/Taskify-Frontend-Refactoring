import PageIndicator from '@/components/common/PageIndicator';
import PageNation from '@/components/common/PageNation';
import CreateButton from '@/components/dashboard/CreateButton';
import DashboardNameCard from '@/components/mydashboard/DashboardNameCard';
import { NEW_DASHBOARD } from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';
import { usePagination } from '@/hooks/usePagination';
import useQuery from '@/hooks/useQuery';
import { getDashboards } from '@/lib/apis/dashboards';
import { type DashboardsResponse, type GetDashboardsparams } from '@/types/dashboardsData';

export default function MyDashboard() {
  const { currentPage, handlePrev, handleNext, isPrevDisabled } = usePagination();
  const { handleModalOpen } = useModal(NEW_DASHBOARD);

  const params: GetDashboardsparams = {
    navigationMethod: 'pagination',
    page: currentPage,
    size: 5,
    cursorId: null,
  };

  const { data: dashboardsData } = useQuery<DashboardsResponse>({
    fetchFn: () => getDashboards(params),
    params,
  });

  if (!dashboardsData) {
    return null;
  }

  const pageCount = Math.ceil(dashboardsData.totalCount / 5);

  return (
    <>
      <div className='flex max-w-[1022px] flex-col gap-3 p-[24px] sm:p-[40px]'>
        <div className='flex h-[388px] flex-col gap-[8px] sm:grid sm:h-[230px] sm:grid-cols-2 sm:grid-rows-3 sm:gap-3 md:gap-2.5 lg:h-[152px] lg:grid-cols-3 lg:grid-rows-2 lg:gap-[13px]'>
          <CreateButton className='h-[58px] font-lg-semibold' onClick={handleModalOpen}>
            새로운 대시보드
          </CreateButton>
          {dashboardsData?.dashboards.map((dashboard) => (
            <DashboardNameCard key={dashboard.id} dashboard={dashboard} />
          ))}
        </div>
        <div className='flex items-center justify-end gap-4'>
          <PageIndicator currentPage={currentPage} totalPages={pageCount} />
          <PageNation
            onPrev={handlePrev}
            onNext={handleNext}
            prevDisabled={isPrevDisabled}
            nextDisabled={currentPage === pageCount}
          />
        </div>
      </div>
    </>
  );
}

import Title from '@/components/common/Title';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
import InvitedDashboardContent from '@/components/mydashboard/InvitedDashboardContent';

export default function InvitedDashboardFrame() {
  return (
    <div className='flex max-h-[770px] w-full flex-col gap-6 py-6 sm:px-0 sm:py-4 sm:pl-6 md:rounded-lg md:px-0 md:py-8'>
      <div className='flex flex-col gap-[32px] px-4 md:px-7'>
        <DashboardHeader>
          <Title as='h3' size={'2xl'} weight={'bold'}>
            초대받은 대시보드
          </Title>
        </DashboardHeader>
      </div>
      <InvitedDashboardContent />
    </div>
  );
}

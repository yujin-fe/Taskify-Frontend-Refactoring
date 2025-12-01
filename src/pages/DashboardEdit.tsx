import { useParams } from 'react-router';
import BackButton from '@/components/dashboard/BackButton';
import DashboardNameEdit from '@/components/editpage/DashboardNameEdit';
import InvitesEdit from '@/components/editpage/InvitesEdit';
import MembersEdit from '@/components/editpage/MembersEdit';

export default function DashboardEdit() {
  const { dashboardId } = useParams<{ dashboardId: string }>();

  const backPath = dashboardId ? `/dashboard/${dashboardId}` : '/';

  return (
    <div className='mx-[12px] flex flex-col sm:mx-[20px]'>
      <div className='mt-[16px] sm:mt-[20px]'>
        <BackButton to={backPath} />
      </div>
      <div className='mt-[10px] flex flex-col gap-4 sm:mt-[20px] lg:mt-[34px]'>
        <DashboardNameEdit />
        <MembersEdit />
        <InvitesEdit />
      </div>
    </div>
  );
}

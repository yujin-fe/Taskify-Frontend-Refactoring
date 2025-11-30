import InvitsEdit from '@/components/editpage/InvitsEdit';
import MembersEdit from '@/components/editpage/MembersEdit';

export default function DashboardEdit() {
  return (
    <div className='mx-[12px] flex flex-col gap-4 sm:mx-[20px]'>
      <MembersEdit />
      <InvitsEdit />
    </div>
  );
}

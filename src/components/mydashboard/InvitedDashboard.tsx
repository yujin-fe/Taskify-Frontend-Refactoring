import Icons from '@/assets/icons';
import Button from '@/components/common/Button';
import Input from '@/components/common/input/Input';
import Title from '@/components/common/Title';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
import useQuery from '@/hooks/useQuery';
import { getMyInvitations } from '@/lib/apis/Invitations';
import type { InvitationParams, InvitationResponse } from '@/types/invitations';
export default function InvitedDashboard() {
  const params: InvitationParams = {
    size: 10,
    cursorId: 17546,
    title: null,
  };

  const { data: invitationData } = useQuery<InvitationResponse>({
    fetchFn: () => getMyInvitations(params),
    params,
  });
  return (
    <>
      <div className='flex h-[770px] w-full flex-col gap-6 px-4 py-6 sm:h-[592px] sm:px-0 sm:py-4 sm:pl-6 md:h-[650px] md:rounded-lg md:px-0 md:py-8'>
        <div className='flex flex-col gap-8 px-7'>
          <DashboardHeader>
            <Title as='h3' size={'2xl'} weight={'bold'}>
              초대받은 대쉬보드
            </Title>
          </DashboardHeader>
          <Input value={'임시값'}>
            <Input.Group>
              <Input.PrefixIcon>
                <Icons.Search className='text-gray-700' />
              </Input.PrefixIcon>
              <Input.Field placeholder='검색' />
            </Input.Group>
          </Input>
        </div>
        <div className='flex flex-1 flex-col gap-5 pr-7'>
          <ul
            className={`grid w-full grid-cols-[1fr_1fr_1fr] sm:pl-[28px] md:w-[828px] md:pl-[76px]`}>
            <li className='font-md-regular text-gray-400 sm:font-lg-regular'>이름</li>
            <li className='font-md-regular text-gray-400 sm:font-lg-regular'>초대자</li>
            <li className='font-md-regular text-gray-400 sm:font-lg-regular'>수락 여부</li>
          </ul>
          <div className='h-[410px] w-full overflow-y-scroll'>
            {invitationData?.invitations?.map((invitation) => (
              <>
                <div
                  key={invitation.id}
                  className={`grid w-full grid-cols-[1fr_1fr_1fr] pb-5 sm:pl-[28px] md:w-[828px] md:pl-[76px]`}>
                  <span>{invitation.dashboard.title}</span>
                  <span>{invitation.inviter.nickname}</span>
                  <div className='flex gap-2.5'>
                    <Button
                      size={'sm'}
                      className='max-md:font-14-medium max-md:h-[30px] max-md:min-w-[72px] max-md:p-0'>
                      수락
                    </Button>
                    <Button
                      theme={'secondary'}
                      size={'sm'}
                      className='max-md:font-14-medium max-md:h-[30px] max-md:min-w-[72px] max-md:p-0'>
                      거절
                    </Button>
                  </div>
                </div>
                <div className='mb-5 h-px w-full bg-gray-200' />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

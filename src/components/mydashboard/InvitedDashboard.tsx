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
        <div className='flex flex-col gap-[32px] px-7'>
          <DashboardHeader>
            <Title as='h3' size={'2xl'} weight={'bold'}>
              초대받은 대쉬보드
            </Title>
          </DashboardHeader>
          <Input value={'임시값'}>
            <Input.Group className='flex h-[40px] items-center'>
              <Input.PrefixIcon>
                <Icons.Search className='text-gray-700' />
              </Input.PrefixIcon>
              <Input.Field placeholder='검색' />
            </Input.Group>
          </Input>
        </div>
        <div className='flex flex-col'>
          <div className='flex w-full items-center sm:pl-[28px] md:pl-[76px]'>
            <h4 className='max-w-[308px] grow font-md-regular text-gray-400 sm:font-lg-regular'>
              이름
            </h4>
            <h4 className='max-w-[316px] grow font-md-regular text-gray-400 sm:font-lg-regular'>
              초대자
            </h4>
            <h4 className='shrink-0 font-md-regular text-gray-400 sm:font-lg-regular'>수락 여부</h4>
          </div>
          <ul className='scrollbar-hidden w-full overflow-y-scroll'>
            {invitationData?.invitations?.map((invitation) => (
              <>
                <li
                  key={invitation.id}
                  className={`flex w-full gap-[16px] border-b border-gray-200 py-[20px] sm:pl-[28px] md:pl-[76px]`}>
                  <span className='inline-block max-w-[290px] grow align-middle'>
                    {invitation.dashboard.title}
                  </span>
                  <span className='inline-block max-w-[250px] grow align-middle'>
                    {invitation.inviter.nickname}
                  </span>
                  <div className='flex flex-shrink-0 gap-2.5'>
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
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

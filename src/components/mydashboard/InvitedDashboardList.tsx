import axios from 'axios';
import Button from '@/components/common/Button';
import BaseModalFrame from '@/components/common/modal/BaseModalFrame';
import useBaseModal from '@/hooks/useBaseModal';
import { useInvitedDashboardCtx } from '@/hooks/useInvitedDashboardCtx';
import useMutation from '@/hooks/useMutation';
import { useResponsiveValue } from '@/hooks/useResponsiveValue';
import { responseInvtitation } from '@/lib/apis/Invitations';
import { type Invitation } from '@/types/invitations';

interface ResponseInvitationReqType {
  invitationId: string;
  reqBody: { inviteAccepted: boolean };
}
export default function InvitedDashboardList() {
  const {
    ListData,
    lastItemRef,
    resetListData: resetData,
    setConfirmMessage,
    confirmMessage,
  } = useInvitedDashboardCtx();

  const { isOpen, handleModalClose, handleModalOpen } = useBaseModal();

  const isMobile = useResponsiveValue({
    mobile: true,
    tablet: false,
    desktop: false,
  });

  const invitations = ListData.invitations;

  const { mutate } = useMutation<Invitation, ResponseInvitationReqType>({
    mutationFn: ({ invitationId, reqBody }) => responseInvtitation(invitationId, reqBody),
  });

  const handleResponse = async (invitation: Invitation, inviteAccepted: boolean) => {
    const invitationId: string = invitation.id.toString();
    const reqBody = {
      inviteAccepted,
    };
    try {
      setConfirmMessage(
        `${invitation.dashboard.title} 초대를 ${inviteAccepted ? '수락' : '거절'}했습니다!`
      );
      handleModalOpen();
      await mutate({ invitationId, reqBody });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setConfirmMessage(`${error?.response?.data?.message}: 오류가 발생했습니다.`);
        handleModalOpen();
      }
    }
  };

  const mobileList = () => {
    return (
      <>
        {invitations?.map((invitation, ind) => (
          <li
            ref={invitations.length - 1 === ind ? lastItemRef : null}
            key={`mobile-${invitation.id}`}
            className='flex w-full flex-col gap-[14px] border-b border-gray-200 px-4 py-[14px]'>
            <div>
              <div className='flex gap-6'>
                <span className='inline-block w-[38px] font-md-regular text-gray-400'>이름</span>
                <span className='font-md-regular text-gray-700'>{invitation.dashboard.title}</span>
              </div>
              <div className='flex gap-6'>
                <span className='inline-block w-[38px] font-md-regular text-gray-400'>초대자</span>
                <span className='font-md-regular text-gray-700'>{invitation.inviter.nickname}</span>
              </div>
            </div>
            <div className='flex w-full gap-2.5'>
              <Button
                size={'sm'}
                className='flex flex-1'
                onClick={() => handleResponse(invitation, true)}>
                수락
              </Button>
              <Button
                theme={'secondary'}
                size={'sm'}
                className='flex flex-1'
                onClick={() => handleResponse(invitation, false)}>
                거절
              </Button>
            </div>
          </li>
        ))}
      </>
    );
  };

  return (
    <div className='flex max-h-[625px] flex-col sm:h-[400px] lg:h-[464px]'>
      {!isMobile && (
        <div className='flex w-fit items-center gap-4 sm:pl-[28px] md:pl-[76px]'>
          <h4 className='w-[153px] font-md-regular text-gray-400 sm:font-lg-regular lg:w-[298px]'>
            이름
          </h4>
          <h4 className='w-[117px] font-md-regular text-gray-400 sm:w-[127px] sm:font-lg-regular lg:w-[306px]'>
            초대자
          </h4>
          <h4 className='w-[154px] px-[47px] font-md-regular text-gray-400 sm:font-lg-regular lg:w-[178px] lg:pr-[62px] lg:pl-[56px]'>
            수락 여부
          </h4>
        </div>
      )}
      {/* TODO: 스켈레톤 교체 */}
      <ul className='scrollbar-hidden w-full overflow-y-scroll'>
        {!isMobile
          && invitations?.map((invitation, ind) => (
            <li
              ref={invitations.length - 1 === ind ? lastItemRef : null}
              key={invitation.id}
              className={`flex w-full gap-[16px] border-b border-gray-200 py-[20px] sm:pl-[28px] md:pl-[76px]`}>
              <span className='inline-block w-[153px] lg:w-[298px]'>
                {invitation.dashboard.title}
              </span>
              <span className='inline-block w-[117px] lg:w-[306px]'>
                {invitation.inviter.nickname}
              </span>
              <div className='flex w-[154px] gap-[10px] lg:w-[178px]'>
                <Button
                  size={'sm'}
                  className='max-md:font-14-medium flex-none max-md:h-[30px] max-md:min-w-[72px] max-md:p-0'
                  onClick={() => handleResponse(invitation, true)}>
                  수락
                </Button>
                <Button
                  theme={'secondary'}
                  size={'sm'}
                  className='max-md:font-14-medium flex-none max-md:h-[30px] max-md:min-w-[72px] max-md:p-0'
                  onClick={() => handleResponse(invitation, false)}>
                  거절
                </Button>
              </div>
            </li>
          ))}
        {isMobile && mobileList()}
      </ul>
      {isOpen && (
        <BaseModalFrame
          setOnModal={() => {
            handleModalClose();
            resetData();
          }}>
          {confirmMessage}
        </BaseModalFrame>
      )}
    </div>
  );
}

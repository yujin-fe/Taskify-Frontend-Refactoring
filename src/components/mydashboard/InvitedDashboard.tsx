import { useState, useEffect, useRef } from 'react';
import Icons from '@/assets/icons';
import Button from '@/components/common/Button';
import Input from '@/components/common/input/Input';
import Title from '@/components/common/Title';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
import { useResponsiveValue } from '@/hooks/useResponsiveValue';
import { getMyInvitations } from '@/lib/apis/Invitations';
import type { InvitationParams, Invitation } from '@/types/invitations';

const INVITATION_LIST_SIZE = 10;

export default function InvitedDashboard() {
  const [invitations, setInvitations] = useState<Invitation[] | null>(null);
  const [cursor, setCursor] = useState<undefined | number>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const isMobile = useResponsiveValue({
    mobile: true,
    tablet: false,
    desktop: false,
  });

  const obseverRef = useRef<null | IntersectionObserver>(null);
  const lastItemRef = useRef<HTMLLIElement>(null);
  const initLoadRef = useRef<boolean>(true);
  const params: InvitationParams = {
    size: INVITATION_LIST_SIZE,
    cursorId: cursor,
    title: null,
  };
  const fetchInvitationData = async () => {
    if (isLoading || cursor === null) {
      return;
    }
    setIsLoading(true);
    try {
      const data = await getMyInvitations(params);
      setInvitations((prev) => {
        if (!prev) {
          return data.invitations;
        }
        return [...prev, ...data.invitations];
      });
      setCursor(data.cursorId);
      //TODO: 콘솔 삭제
      console.log('실행', data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cursor === null) {
      return;
    }

    if (initLoadRef.current) {
      fetchInvitationData();
      initLoadRef.current = false;
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchInvitationData();
        }
      },
      {
        threshold: 0.1,
      }
    );
    obseverRef.current = observer;
    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => {
      if (obseverRef.current) {
        obseverRef.current.disconnect();
      }
    };
  }, [cursor]);

  if (!invitations) {
    return null;
  }
  //TODO: 에러발생 컴포넌트
  if (error) {
    return <div>오류가 발생했습니다.</div>;
  }

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
              <Button size={'sm'} className='flex flex-1'>
                수락
              </Button>
              <Button theme={'secondary'} size={'sm'} className='flex flex-1'>
                거절
              </Button>
            </div>
          </li>
        ))}
      </>
    );
  };
  return (
    <>
      <div className='flex max-h-[770px] w-full flex-col gap-6 py-6 sm:px-0 sm:py-4 sm:pl-6 md:rounded-lg md:px-0 md:py-8'>
        <div className='flex flex-col gap-[32px] px-4 md:px-7'>
          <DashboardHeader>
            <Title as='h3' size={'2xl'} weight={'bold'}>
              초대받은 대시보드
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
                      className='max-md:font-14-medium flex-none max-md:h-[30px] max-md:min-w-[72px] max-md:p-0'>
                      수락
                    </Button>
                    <Button
                      theme={'secondary'}
                      size={'sm'}
                      className='max-md:font-14-medium flex-none max-md:h-[30px] max-md:min-w-[72px] max-md:p-0'>
                      거절
                    </Button>
                  </div>
                </li>
              ))}
            {isMobile && mobileList()}
          </ul>
        </div>
      </div>
    </>
  );
}

import Skeleton from '@/components/skeleton/Skeleton';

interface HeaderSkeletonProps {
  shouldViewButtons?: boolean;
  isDashboardDetail?: boolean;
}

export default function HeaderSkeleton({
  shouldViewButtons,
  isDashboardDetail,
}: HeaderSkeletonProps) {
  return (
    <header className='fixed top-0 right-0 left-[300px] flex h-[70px] items-center border-b border-gray-200 bg-gray-0 px-[40px]'>
      <Skeleton className='h-8 w-32' />
      {shouldViewButtons && (
        <div className='mr-[40px] ml-auto flex gap-[16px]'>
          <Skeleton className='h-[30px] w-[49px] gap-2 sm:h-[40px] sm:w-[88px]' />
          <Skeleton className='flex h-[30px] w-[73px] items-center gap-2 sm:h-[40px] sm:w-[116px]' />
        </div>
      )}

      {isDashboardDetail && <Skeleton className='h-[38px] w-[60px]' />}

      {shouldViewButtons && <div className='mx-[32px] h-[38px] border-r border-gray-300' />}
      <div className='flex items-center gap-2'>
        <Skeleton className='ml-6 h-[38px] w-[38px] rounded-full' />
        <Skeleton className='h-[30px] w-[80px]' />
      </div>
    </header>
  );
}

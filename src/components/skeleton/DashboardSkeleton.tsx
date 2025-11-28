import Skeleton from '@/components/skeleton/Skeleton';

/**
 * 사이드바의 스켈레톤을 렌더링합니다.
 *
 * @example
 * <DashboardSkeleton length={5} />
 */
export default function DashboardSkeleton({ length }: { length: number }) {
  return (
    <div className='flex'>
      <aside className='fixed top-0 left-0 h-screen w-[300px] border-r border-gray-200 bg-gray-0 p-5'>
        <Skeleton className='mb-[56px] h-[32px] w-[110px]' />
        <Skeleton className='mb-3 h-4 w-20' />
        <div className='flex flex-col gap-[8px]'>
          {Array.from({ length: length }).map((_, i) => (
            <Skeleton key={i} className='h-[42px] w-[260px]' />
          ))}
        </div>
        <Skeleton className='mt-[32px] h-10 w-[80px]' />
      </aside>
    </div>
  );
}

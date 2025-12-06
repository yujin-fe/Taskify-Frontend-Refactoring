import Skeleton from '@/components/skeleton/Skeleton';

export default function ListSkeleton() {
  return (
    <ul className='flex w-full flex-col gap-8 py-[20px] sm:pl-[28px] md:pl-[76px]'>
      <li>
        <Skeleton className='h-8 w-[752px]' />
      </li>
      <li>
        <Skeleton className='h-8 w-[752px]' />
      </li>
      <li>
        <Skeleton className='h-8 w-[752px]' />
      </li>
      <li>
        <Skeleton className='h-8 w-[752px]' />
      </li>
      <li>
        <Skeleton className='h-8 w-[752px]' />
      </li>
    </ul>
  );
}

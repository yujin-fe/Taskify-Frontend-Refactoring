import { Logo } from '@/components/common/Logo';

export default function AuthIntro({ comment }: { comment: string }) {
  return (
    <div className='mb-[36px] flex flex-col items-center gap-[8px] sm:mb-[30px] sm:gap-[10px]'>
      <Logo size='Large' />
      <span className='font-2lg-medium text-gray-700 sm:font-2xl-medium'>{comment}</span>
    </div>
  );
}

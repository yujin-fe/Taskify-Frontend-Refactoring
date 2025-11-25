import { Link } from 'react-router';
import { Logo } from '@/components/common/Logo';

export default function HomeHeader() {
  return (
    <header className='mx-auto flex h-[70px] max-w-[1760px] items-center justify-between'>
      <Logo color='base' className='hidden sm:flex' />
      <Logo color='base' size='Small' className='sm:hidden' />
      <nav className='flex gap-[24px] text-gray-0 sm:gap-[36px]'>
        <Link to='/login'>로그인</Link>
        <Link to='/signup'>회원가입</Link>
      </nav>
    </header>
  );
}

import { Link } from 'react-router';
import { Logo } from '@/components/common/Logo';

const linkStyle = 'rounded-[4px] py-1.5 px-2 md:px-3 md:py-2 hover:bg-gray-700';

export default function HomeHeader() {
  return (
    <header className='sticky top-0 w-full bg-gray-900'>
      <div className='mx-auto flex h-[70px] max-w-[1760px] items-center justify-between'>
        <Logo color='base' className='hidden sm:flex' />
        <Logo color='base' size='Small' className='sm:hidden' />
        <nav className='mr-[-8px] flex gap-[8px] text-gray-0 sm:mr-[-12px] sm:gap-[12px]'>
          <Link to='/login' className={linkStyle}>
            로그인
          </Link>
          <Link to='/signup' className={linkStyle}>
            회원가입
          </Link>
        </nav>
      </div>
    </header>
  );
}

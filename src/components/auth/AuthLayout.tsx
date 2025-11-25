import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className='min-h-[100dvh] bg-base px-[12px] py-[80px] sm:py-[160px]'>
      <main className='mx-auto flex w-full max-w-[560px] flex-col items-center'>
        <Outlet />
      </main>
    </div>
  );
}

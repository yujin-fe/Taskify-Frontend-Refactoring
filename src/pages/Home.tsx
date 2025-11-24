import HomeBottomCardArea from '@/components/home/HomeBottomCardArea';
import HomeFooter from '@/components/home/HomeFooter';
import HomeTopArea from '@/components/home/HomeTopArea';

export default function Home() {
  return (
    <div className='bg-gray-900 px-4'>
      <main className='mx-auto max-w-[1200px] pt-[94px]'>
        <HomeTopArea />
        <HomeBottomCardArea />
      </main>
      <HomeFooter />
    </div>
  );
}

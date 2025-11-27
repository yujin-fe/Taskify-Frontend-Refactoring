import { Link } from 'react-router';
import Icons from '@/assets/icons';
import Button from '@/components/common/Button';

export default function SettingButton() {
  return (
    <Button
      as={Link}
      to='' //추후 추가
      theme='outlined'
      size='lg'
      className='h-[40px] w-[88px] gap-2 sm:h-[40px] sm:w-[88px]'>
      <Icons.Setting className='h-[20px] w-[20px]' aria-hidden />
      <span className='font-lg-medium text-gray-500'>관리</span>
    </Button>
  );
}

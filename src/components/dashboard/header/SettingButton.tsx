import { Link } from 'react-router';
import Icons from '@/assets/icons';
import Button from '@/components/common/Button';

export default function SettingButton() {
  return (
    <Button
      as={Link}
      to='' //TODO: setting 페이지 추후 추가
      theme='outlined'
      size='lg'
      className='h-[85px] w-[36px] gap-2 sm:h-[49px] sm:w-[30px]'>
      <Icons.Setting className='h-[20px] w-[20px]' aria-hidden />
      <span className='font-lg-medium text-gray-500'>관리</span>
    </Button>
  );
}

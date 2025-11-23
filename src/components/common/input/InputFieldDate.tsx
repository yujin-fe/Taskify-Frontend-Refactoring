import Icons from '@/assets/icons';
import useInputContext from '@/hooks/useInputContext';
import { cn } from '@/utils/cn';

export default function InputFieldDate({ placeholder }: { placeholder: string }) {
  const { id, value, onChange } = useInputContext();

  return (
    <>
      <Icons.Calendar className='absolute text-gray-400' />
      <div className={cn('h-full w-full pl-[30px] text-gray-400', value && 'text-black')}>
        {value ? value : placeholder}
      </div>
      <input
        id={id}
        type='datetime-local'
        className='absolute inset-0 opacity-0'
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </>
  );
}

import { cva, type VariantProps } from 'class-variance-authority';
import Button from '@/components/common/Button';
import ModalPortal from '@/components/common/modal/ModalPortal';
import Title from '@/components/common/Title';
import { cn } from '@/utils/cn';

const FormModalFrameStyle = cva(`flex flex-col bg-gray-0 rounded-2xl`, {
  variants: {
    size: {
      lg: 'p-[32px]',
      md: 'p-[24px]',
      sm: 'py-[24px] px-[16px] rounded-lg w-[327px]',
    },
    gap: {
      32: 'gap-[32px]',
      24: 'gap-[24px]',
    },
  },
  defaultVariants: {
    size: 'lg',
    gap: 32,
  },
});

interface FormModalFrameProps extends VariantProps<typeof FormModalFrameStyle> {
  title: string;
  leftButton: string;
  rightButton: string;
  children: React.ReactNode;
  className?: string;
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>;
}
/**
 *
 * @example
 * <FormModalFrame title="할일 생성" leftButton="취소" rightButton="생성" size="lg" gap={32}>
 *  <NewTaskForm/>
 * </FormModalFrame>
 */

export default function FormModalFrame({
  size,
  gap,
  title,
  leftButton,
  rightButton,
  children,
  className,
  setOnModal,
}: FormModalFrameProps) {
  return (
    <ModalPortal>
      <div className='fixed inset-0 flex items-center justify-center bg-gray-900/70'>
        <div className={cn(FormModalFrameStyle({ size, gap }), className)}>
          {size === 'sm' ? (
            <Title as='h2' size='lg' weight={'bold'}>
              {title}
            </Title>
          ) : (
            <Title as='h2' size='2xl' weight={'bold'}>
              {title}
            </Title>
          )}
          {children}
          <div
            className={cn({
              'flex w-[520px] gap-2': size === 'lg' || size === 'md',
              'flex w-[295px] gap-[7px]': size === 'sm',
            })}>
            <Button size='lg' theme={'outlined'} onClick={() => setOnModal(false)}>
              {leftButton}
            </Button>
            <Button size='lg' theme={'primary'} type='submit'>
              {rightButton}
            </Button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}

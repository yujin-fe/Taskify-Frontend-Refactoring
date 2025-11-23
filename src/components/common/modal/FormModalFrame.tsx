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
 * padding 값에 따라서 크기를 지정해주세요
 *
 * lg-패딩 32px
 *
 * md-패딩 24px
 *
 * sm-패딩 24px 16px
 *
 * gap은 타이틀과 폼(children) 폼과 버튼 사이의 픽셀을 골라주세요
 *
 * leftButton을 클릭하면 onModal이 false로 변경됩니다
 *
 * rightButton을 클릭하면 폼이 제출됩니다
 *
 * @example
 * const [onModal, setOnModal] = useState(false)
 * {onModal &&(
 * <FormModalFrame title="할일 생성" leftButton="취소" rightButton="생성" size="lg" gap={32}>
 *  <NewTaskForm/>
 * </FormModalFrame>
 * )}
 * <button onClick={()=>setOnModal(true)}>버튼</button>
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
      <div className='modal-dimmed'>
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

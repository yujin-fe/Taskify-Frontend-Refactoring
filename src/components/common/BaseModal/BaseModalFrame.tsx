import ModalPortal from '@/components/common/BaseModal/ModalPortal';
import Button from '@/components/common/Button';

type BaseModalFrameProps = {
  children: string;
  size?: 'Small' | 'Large';
  setOnModal: (state: boolean) => void;
};

export default function BaseModalFrame({ children, setOnModal }: BaseModalFrameProps) {
  return (
    <ModalPortal>
      <div className='inline-flex'>
        <div className='bg-gray-200 text-gray-700'>
          {children}
          <Button
            theme='primary'
            disabled={false}
            className='h-[48px] w-[240px]'
            onClick={() => setOnModal(false)}>
            확인
          </Button>
        </div>
      </div>
    </ModalPortal>
  );
}

// flex-direction: column; flex-col
// justify-content: center; justify-center
// align-items: center; items-center

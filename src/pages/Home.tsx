import { useState } from 'react';
import BaseModalFrame from '@/components/common/BaseModal/BaseModalFrame';
import Button from '@/components/common/Button';

export default function Home() {
  const [onModal, setOnModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setOnModal(true)} disabled={false} className='h-[62px]'>
        click
      </Button>
      {onModal && <BaseModalFrame setOnModal={setOnModal}>정말 삭제하시겠습니까?</BaseModalFrame>}
    </div>
  );
}

import { useState } from 'react';
import Button from '@/components/common/Button';
import BaseModalFrame from '@/components/common/modal/BaseModalFrame';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)} disabled={false}>
        모달 열기
      </Button>

      {isModalOpen && (
        <BaseModalFrame size='Login' setOnModal={setIsModalOpen}>
          비밀번호가 일치하지 않습니다.
        </BaseModalFrame>
      )}
    </div>
  );
}

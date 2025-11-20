import { useRef, useState } from 'react';
import CloseIcon from '@/assets/icons/dashboard/ic-close.svg';
import PlusIcon from '@/assets/icons/dashboard/ic-plus.svg';
import { cn } from '@/utils/cn';

type ImageUploadProps = {
  size?: 'Small' | 'Large'; // 버튼 크기 선택
};

/**
 * 이미지 폼 공통 컴포넌트
 *
 * Small / Large 크기 선택 가능합니다.
 * 이미지를 제거할 수도 있으며, 닫기 버튼은 업로드된 이미지 위에 표시됩니다.
 *
 * @example
 * <ImageUpload size="Small" />
 * <ImageUpload size="Large" />
 */

export function ImageUpload({ size = 'Small' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null); // 선택한 이미지의 URL 저장
  const handleButtonClick = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];

    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  // X 버튼 누르면 사진 제거
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // 버튼 눌러도 다른 버튼에 영향을 안 줌

    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // 버튼 크기 스타일 정의
  const buttonSizes: Record<'Small' | 'Large', string> = {
    Small: 'w-[76px] h-[76px]',
    Large: 'w-[182px]  h-[182px]',
  };

  return (
    <div className='relative inline-block'>
      {/* 이미지 선택 버튼 */}
      <button
        className={cn(
          'flex items-center justify-center overflow-hidden rounded-md bg-gray-200',
          buttonSizes[size]
        )}
        onClick={handleButtonClick}
        style={{
          backgroundImage: preview ? `url(${preview})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        {!preview && <PlusIcon className={cn('h-7 w-7 text-violet-500')} />}
      </button>

      {/* 이미지가 있으면 닫기 버튼 표시 */}
      {preview && (
        <button
          onClick={handleRemoveImage}
          className={cn(
            'absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-600'
          )}>
          <CloseIcon className={cn('text-white h-4 w-4 text-gray-0')} />
        </button>
      )}

      {/* 실제 파일 input (화면에는 숨김) */}
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleFileChange}
        className='hidden'
      />
    </div>
  );
}

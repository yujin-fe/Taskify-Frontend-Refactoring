import { ImageUpload } from '@/components/common/ImageUploader';

export default function Example() {
  return (
    <div>
      <div>
        <p>Small</p>
        <ImageUpload size='Small' />
      </div>

      <div>
        <p>Large</p>
        <ImageUpload size='Large' />
      </div>
    </div>
  );
}

import { useState } from 'react';
import Button from '@/components/common/Button';
import ImageUpload from '@/components/common/ImageUpload';
import Input from '@/components/common/input/Input';
import Label from '@/components/common/Label';
import FormModal from '@/components/common/modal/FormModal';
import TextArea from '@/components/common/TextArea';
import Combobox from '@/components/dashboard/combobox/Combobox';
import TagInput from '@/components/dashboard-detail/modal/TagInput';
import { CREATE_CARD } from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';

interface initialValueType {
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string | null;
}

const initialValue: initialValueType = {
  assigneeUserId: 0,
  title: '',
  description: '',
  dueDate: '',
  tags: [],
  imageUrl: null,
};

const users = [
  { name: '배유철', avatar: '👨' },
  { name: '배동석', avatar: '👨‍💼' },
  { name: '캬캬캬', avatar: '👨‍🎤' },
];

const inputGroupStyle = 'flex flex-col gap-[8px]';
const labelStyle = 'font-lg-medium sm:font-2lg-medium';

export default function CreateCardModal() {
  const { handleModalClose } = useModal(CREATE_CARD);
  const [formValue, setFormValue] = useState(initialValue);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (key: keyof typeof initialValue) => (value: string | number) => {
    setFormValue((prev) => ({ ...prev, [key]: value }));
  };

  const isDisabled = formValue.title.trim() === '' || formValue.description.trim() === '';

  return (
    <FormModal modalName={CREATE_CARD}>
      <FormModal.Title title='할 일 생성' />
      <FormModal.Form onSubmit={() => console.log('제출')}>
        <FormModal.Body>
          <div className='flex flex-col gap-[32px]'>
            <div className={inputGroupStyle}>
              <Label htmlFor='assigneeUserId' className={labelStyle}>
                담당자
              </Label>
              <Combobox
                id='assigneeUserId'
                value={formValue.assigneeUserId}
                setValue={handleChange('assigneeUserId')}>
                <Combobox.Trigger name='담당자' placeholder='이름을 입력해 주세요' />
                <Combobox.List>
                  {users.map((user) => (
                    <Combobox.Item key={user.name} value={user.name}>
                      <span className='text-2xl'>{user.avatar}</span>
                      <span className='font-medium'>{user.name}</span>
                    </Combobox.Item>
                  ))}
                </Combobox.List>
              </Combobox>
            </div>
            <Input value={formValue.title} onChange={handleChange('title')}>
              <Input.Label required className={labelStyle}>
                제목
              </Input.Label>
              <Input.Group>
                <Input.Field name='title' type='text' placeholder='제목을 입력해 주세요' />
              </Input.Group>
            </Input>
            <div className={inputGroupStyle}>
              <Label htmlFor='desc' required className={labelStyle}>
                설명
              </Label>
              <TextArea
                id='desc'
                placeholder='설명을 입력해 주세요'
                value={formValue.description}
                onChange={handleChange('description')}
              />
            </div>
            <Input value={formValue.dueDate} onChange={handleChange('dueDate')}>
              <Input.Label className={labelStyle}>마감일</Input.Label>
              <Input.Group className='h-[48px]'>
                <Input.FieldDate placeholder='마감일을 선택해주세요' />
              </Input.Group>
            </Input>
            <div className={inputGroupStyle}>
              <Label htmlFor='tags' className={labelStyle}>
                태그
              </Label>
              <TagInput
                tags={formValue.tags}
                setTags={(next: string[]) => setFormValue((prev) => ({ ...prev, tags: next }))}
              />
            </div>
            <div className={inputGroupStyle}>
              <Label htmlFor='imageUrl' className={labelStyle}>
                이미지
              </Label>
              <ImageUpload file={imageFile} onFileChange={setImageFile} />
            </div>
          </div>
        </FormModal.Body>
        <FormModal.Footer className='pt-[32px]'>
          <Button theme={'outlined'} onClick={handleModalClose}>
            취소
          </Button>
          <Button disabled={isDisabled} theme={'primary'} type='submit'>
            생성
          </Button>
        </FormModal.Footer>
      </FormModal.Form>
    </FormModal>
  );
}

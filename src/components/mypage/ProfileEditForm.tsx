import axios from 'axios';
import { useState } from 'react';
import Button from '@/components/common/Button';
import ImageUpload from '@/components/common/ImageUpload';
import Input from '@/components/common/input/Input';
import BaseModalFrame from '@/components/common/modal/BaseModalFrame';
import Title from '@/components/common/Title';
import DashboardBody from '@/components/dashboard/table/DashboardBody';
import DashboardContainer from '@/components/dashboard/table/DashboardContainer';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
import useAuthForm from '@/hooks/useAuthForm';
import useBaseModal from '@/hooks/useBaseModal';
import useQuery from '@/hooks/useQuery';
import { changeUserMe, getUsersMe, uploadImage } from '@/lib/apis/users';
import type { UserMe } from '@/types/userMe';
import { uploadImageFile } from '@/utils/uploadImageFile';

const InitialValue: Record<'nickname', string> = {
  nickname: '',
};

interface ReqBody {
  nickname: string;
  profileImageUrl?: string;
}

export default function ProfileEditForm() {
  const { data: userData } = useQuery<UserMe>({ fetchFn: getUsersMe });
  const { authForm, setAuthForm, handleChange, handleBlur, error, disabled } =
    useAuthForm(InitialValue);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { isOpen, handleModalClose, handleModalOpen } = useBaseModal();
  const [apiErrorMsg, setApiErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { nickname } = authForm;
    const reqbody: ReqBody = { nickname };

    try {
      if (imageFile) {
        try {
          const resImage = await uploadImageFile({
            file: imageFile,
            requestFn: uploadImage,
          });

          reqbody.profileImageUrl = resImage?.profileImageUrl;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setApiErrorMsg('이미지 업로드 중\n오류가 발생했습니다.');
          }
          handleModalOpen();
          return;
        }
      }
      await changeUserMe(reqbody);
      setApiErrorMsg('');
      setSuccessMsg('유저 정보가\n업데이트 되었습니다.');
      handleModalOpen();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSuccessMsg('');
        setApiErrorMsg(error.response?.data?.message ?? '오류가 발생했습니다.');
        handleModalOpen();
      }
    } finally {
      setImageFile(null);
      setAuthForm(InitialValue);
    }
  };

  return (
    <>
      <DashboardContainer type={'Profile'}>
        <DashboardHeader>
          <Title as='h3' weight={'bold'} className='text-lg sm:text-2xl'>
            프로필
          </Title>
        </DashboardHeader>
        <DashboardBody className='mt-[40px] sm:mt-[24px]'>
          <form noValidate className='flex gap-[42px]' onSubmit={handleSubmit}>
            <ImageUpload file={imageFile} onFileChange={setImageFile} size='Large' />
            <div className='flex w-full flex-col gap-[16px]'>
              <Input disabled value={userData?.email || '이메일을 입력해 주세요.'}>
                <Input.Label className='mypage-label'>이메일</Input.Label>
                <Input.Group>
                  <Input.Field name='email' />
                </Input.Group>
              </Input>
              <Input
                value={authForm.nickname}
                onChange={handleChange('nickname')}
                onBlur={handleBlur('nickname')}
                error={!!error.nickname}>
                <Input.Label className='mypage-label'>닉네임</Input.Label>
                <Input.Group>
                  <Input.Field
                    name='nickname'
                    type='text'
                    placeholder='닉네임을 입력해 주세요'
                    autoComplete='off'
                  />
                </Input.Group>
                <Input.ErrorMessage>{error.nickname}</Input.ErrorMessage>
              </Input>
              <Button className='mt-[8px]' disabled={disabled} type='submit'>
                저장
              </Button>
            </div>
          </form>
        </DashboardBody>
      </DashboardContainer>
      {isOpen && (
        <BaseModalFrame setOnModal={() => handleModalClose()}>
          {
            <div className='break-words whitespace-pre-line sm:px-[60px]'>
              {apiErrorMsg || successMsg}
            </div>
          }
        </BaseModalFrame>
      )}
    </>
  );
}

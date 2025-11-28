import Button from '@/components/common/Button';
import Input from '@/components/common/input/Input';
import FormModal from '@/components/common/modal/FormModal';
import { INVITE } from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';
import { validateEmail } from '@/utils/validation';

interface DashboardInviteModalProps {
  inviteeEmail: string;
  setInviteeEmail: React.Dispatch<React.SetStateAction<string>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  apiErrorMsg: string;
  setApiErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => Promise<void>;
}

export default function DashboardInviteModal({
  inviteeEmail,
  setInviteeEmail,
  errorMsg,
  setErrorMsg,
  apiErrorMsg,
  setApiErrorMsg,
  onSubmit,
}: DashboardInviteModalProps) {
  const { handleModalClose } = useModal(INVITE);

  const handleChange = (value: string) => {
    setInviteeEmail(value);

    if (errorMsg) {
      setErrorMsg('');
    }
    if (apiErrorMsg) {
      setApiErrorMsg('');
    }
  };

  const handleBlur = () => {
    const message = validateEmail(inviteeEmail);
    setErrorMsg(message);
  };

  const disabled =
    inviteeEmail.trim() === '' || validateEmail(inviteeEmail) !== '' || apiErrorMsg !== '';

  return (
    <FormModal closeBtn modalName={INVITE}>
      <FormModal.Title title='초대하기' />
      <FormModal.Form onSubmit={onSubmit}>
        <FormModal.Body>
          <Input value={inviteeEmail} onChange={handleChange} onBlur={handleBlur}>
            <Input.Label className='font-lg-medium sm:font-2lg-medium'>이메일</Input.Label>
            <Input.Group>
              <Input.Field name='inviteeEmail' type='email' placeholder='이메일을 입력해주세요.' />
            </Input.Group>
            <Input.ErrorMessage>{errorMsg || apiErrorMsg}</Input.ErrorMessage>
          </Input>
        </FormModal.Body>
        <FormModal.Footer>
          <Button theme={'outlined'} onClick={handleModalClose}>
            취소
          </Button>
          <Button theme={'primary'} type='submit' disabled={disabled}>
            초대
          </Button>
        </FormModal.Footer>
      </FormModal.Form>
    </FormModal>
  );
}

import { EMAIL_REGEX, PASSWORD_MIN_LEN } from '@/context/authRegex';

export const validateEmail = (value: string) => {
  return EMAIL_REGEX.test(value) ? '' : '이메일 형식으로 작성해 주세요.';
};

export const validatePassword = (value: string) => {
  return value.length >= PASSWORD_MIN_LEN
    ? ''
    : `비밀번호를 ${PASSWORD_MIN_LEN}자 이상 입력해주세요.`;
};

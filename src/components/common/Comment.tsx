import React, { createContext, useContext, useId } from 'react';
import { cn } from '@/utils/cn';
import Button from './Button';
import TextArea from './TextArea';

// TODO: 상위 컴포넌트에서 API 호출 구현
// const handleCommentSubmit = () => {
//   setCommentValue('');
// };

type CommentContextValue = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  textAreaId: string;
};

const CommentContext = createContext<CommentContextValue | null>(null);

const useCommentContext = () => {
  const ctx = useContext(CommentContext);
  if (!ctx) {
    throw new Error('Comment components must be used within <Comment.Root>');
  }
  return ctx;
};

type RootProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

function Root({
  value,
  onChange,
  onSubmit,
  placeholder = '댓글 작성하기',
  disabled,
  className,
  children,
}: RootProps) {
  const textAreaId = useId();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <CommentContext.Provider
      value={{
        value,
        onChange,
        onSubmit,
        placeholder,
        disabled: disabled ?? !value,
        textAreaId,
      }}>
      <form onSubmit={handleSubmit} className={cn('flex max-w-[520px] flex-col gap-4', className)}>
        {children}
      </form>
    </CommentContext.Provider>
  );
}

type TitleProps = {
  children?: React.ReactNode;
  className?: string;
};

function Title({ children = '댓글', className }: TitleProps) {
  const { textAreaId } = useCommentContext();
  return (
    <label htmlFor={textAreaId} className={cn('font-lg-bold text-gray-700', className)}>
      {children}
    </label>
  );
}

type FieldProps = {
  className?: string; // relative wrapper 커스텀용
  textareaClassName?: string; // TextArea padding 보정용
  children?: React.ReactNode;
};
function Field({ className, textareaClassName, children }: FieldProps) {
  const { value, onChange, placeholder, textAreaId } = useCommentContext();
  return (
    <fieldset className={cn('relative flex flex-col border-0 p-0', className)}>
      <legend className='sr-only'>댓글 입력</legend>
      <TextArea
        id={textAreaId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn('pr-20 pb-12', textareaClassName)}
      />
      {children}
    </fieldset>
  );
}

type SubmitProps = {
  children?: React.ReactNode;
  className?: string;
};
function Submit({ children = '입력', className }: SubmitProps) {
  const { disabled } = useCommentContext();
  return (
    <Button
      theme='primary'
      size='sm'
      type='submit'
      disabled={disabled}
      className={cn('absolute right-3 bottom-3', className)}>
      {children}
    </Button>
  );
}

// Compound export
const Comment = {
  Root,
  Title,
  Field,
  Submit,
};

export default Comment;

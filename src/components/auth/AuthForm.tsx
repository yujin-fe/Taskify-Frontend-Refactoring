interface AuthFormProps {
  onSubmit: () => void;
  children: React.ReactNode;
}

export default function AuthForm({ onSubmit, children }: AuthFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      className='mb-[24px] flex w-full flex-col gap-[8px] sm:gap-[16px]'
      onSubmit={handleSubmit}
      noValidate>
      {children}
    </form>
  );
}

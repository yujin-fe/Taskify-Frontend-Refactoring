export default function FormModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className={'flex w-full max-w-[520px] gap-[7px] sm:w-[520px] sm:gap-2'}>{children}</div>
  );
}

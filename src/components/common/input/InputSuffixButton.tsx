interface InputSuffixButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}

export default function InputSuffixButton({
  children,
  onClick,
  ariaLabel,
}: InputSuffixButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      type='button'
      onClick={onClick}
      className='absolute top-[50%] right-[12px] translate-y-[-50%] cursor-pointer text-gray-400'>
      {children}
    </button>
  );
}

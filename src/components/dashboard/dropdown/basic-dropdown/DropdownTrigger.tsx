import { useBasicDropdownContext } from '@/hooks/useDropdownContext';
import { cn } from '@/utils/cn';

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export default function DropdownMenuTrigger({
  children,
  ariaLabel,
  className,
}: DropdownMenuTriggerProps) {
  const { setIsOpen, isOpen } = useBasicDropdownContext();

  return (
    <button
      className={cn('flex cursor-pointer', className)}
      type='button'
      onClick={() => setIsOpen(!isOpen)}
      aria-label={ariaLabel}>
      {children}
    </button>
  );
}

import Label, { type LabelProps } from '@/components/common/Label';
import useInputContext from '@/hooks/useInputContext';

export default function InputLabel({
  children,
  className,
  required = false,
  ...props
}: LabelProps) {
  const { id } = useInputContext();

  return (
    <Label htmlFor={id} className={className} required={required} {...props}>
      {children}
    </Label>
  );
}

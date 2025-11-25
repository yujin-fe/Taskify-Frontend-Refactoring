import React, { useId } from 'react';
import InputLabel from '@/components/common/input/InputLabel';
import { cn } from '@/utils/cn';

interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: string;
  error?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  hideLabel?: boolean; // Comment 내부에서 label 숨김용
}

export default function TextArea({
  id,
  label,
  error,
  required,
  className,
  value,
  onChange,
  hideLabel = false,
  ...props
}: TextAreaProps) {
  const autoId = useId();
  const textAreaId = id ?? autoId;

  return (
    <div className='flex max-w-[520px] flex-col gap-1'>
      {label && !hideLabel && (
        <InputLabel
          htmlFor={textAreaId}
          required={required}
          className='font-lg-medium text-gray-700'>
          {label}
        </InputLabel>
      )}

      <textarea
        id={textAreaId}
        className={cn(
          'bg-white min-h-[126px] w-full resize-none rounded-lg border border-gray-700 px-4 py-3',
          'focus:border-primary focus:outline-none',
          'text-gray-900 placeholder:font-lg-regular placeholder:text-gray-400',
          error && 'border-red-500',
          className
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />

      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
}

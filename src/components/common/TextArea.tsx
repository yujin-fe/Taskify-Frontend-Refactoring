import React from 'react';
import { cn } from '@/utils/cn';

interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: string;
  error?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export default function TextArea({
  label,
  error,
  required,
  className,
  value,
  onChange,
  ...props
}: TextAreaProps) {
  return (
    <div className='flex max-w-[520px] flex-col gap-1'>
      {label && (
        <label className='required font-lg-medium text-gray-700'>
          {label}
          {required && <span className='ml-1 text-primary'>*</span>}
        </label>
      )}

      <textarea
        className={cn(
          'bg-white min-h-[160px] w-full rounded-lg border border-gray-700 px-4 py-3',
          'focus:border-primary focus:outline-none',
          'text-gray-400 placeholder:font-lg-regular',
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

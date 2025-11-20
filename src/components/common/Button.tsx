import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps {
  children: ReactNode;
  theme: 'primary' | 'secondary' | 'outlined' | 'icon';
  size: 'lg' | 'md' | 'sm' | 'icon';
  disabled: boolean;
  className?: string;
}

const ButtonStyle = cva(
  `bg-gray-0 rounded-lg flex items-center justify-center border-[1px] border-solid border-gray-300 
  cursor-pointer disabled:bg-gray-400 disabled:border-none`,
  {
    variants: {
      theme: {
        primary: 'bg-primary text-gray-0 border-none',
        secondary: 'text-primary',
        outlined: 'text-gray-500',
        icon: 'text-gray-500',
      },
      size: {
        lg: 'h-[54px] py-[14px] rounded-lg grow font-lg-medium',
        md: 'h-[50px] py-[14px] rounded-lg grow font-2lg-medium',
        sm: 'h-[32px] py-[7px] px-[29px] rounded-sm font-md-medium',
        icon: 'h-[40px] px-[16px] pt-[11px] pb-[10px] gap-[8px]',
      },
    },
    defaultVariants: {
      theme: 'primary',
      size: 'lg',
    },
  }
);
export default function Button({ children, theme, size, disabled, className }: ButtonProps) {
  return (
    <>
      <button className={cn(ButtonStyle({ theme, size }), className)} disabled={disabled}>
        {children}
      </button>
    </>
  );
}

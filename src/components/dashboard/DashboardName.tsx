import { cva, type VariantProps } from 'class-variance-authority';
import { Link } from 'react-router';
import Icons from '@/assets/icons';
import { cn } from '@/utils/cn';
const DashboardColor = cva('w-2 h-2 rounded-full', {
  variants: {
    color: {
      orange: 'bg-orange-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      pink: 'bg-pink-500',
      purple: 'bg-purple-500',
    },
  },
  defaultVariants: {
    color: 'orange',
  },
});
const DashboardNameStyle = cva('flex items-center justify-items-start gap-4 bg-base p-3', {
  variants: {
    isCurrent: {
      true: 'bg-purple-500/8 rounded-sm',
    },
  },
});
interface DashboardNameProps extends VariantProps<typeof DashboardColor> {
  isCurrent?: boolean;
  children: string;
  createdByMe: boolean;
  dashboardid: string;
}

export default function DashboardName({
  color,
  children,
  createdByMe = false,
  dashboardid,
  isCurrent,
}: DashboardNameProps) {
  return (
    <li className={cn(DashboardNameStyle({ isCurrent }))}>
      <div className={cn(DashboardColor({ color }))} />
      <div className='flex items-center gap-1.5'>
        <Link to={`/dashboard/${dashboardid}`}>{children}</Link>
        {createdByMe && <Icons.Crown className='text-crown' />}
      </div>
    </li>
  );
}

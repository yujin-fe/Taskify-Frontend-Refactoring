import { cva, type VariantProps } from 'class-variance-authority';
import { Link, useParams } from 'react-router';
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

interface DashboardNameProps extends VariantProps<typeof DashboardColor> {
  children: string;
  createdByMe: boolean;
  dashboardid: string;
}

export default function DashboardName({
  color,
  children,
  createdByMe = false,
  dashboardid,
}: DashboardNameProps) {
  const params = useParams();
  const isCurrent = params.id === dashboardid;
  return (
    <li
      className={cn(
        'flex items-center justify-items-start gap-4 bg-base p-3',
        isCurrent && 'rounded-sm bg-purple-500/8'
      )}>
      <div className={cn(DashboardColor({ color }))} />
      <div className='flex items-center gap-1.5'>
        <Link to={`/dashboard/${dashboardid}`}>{children}</Link>
        {createdByMe && <Icons.Crown className='text-crown' />}
      </div>
    </li>
  );
}

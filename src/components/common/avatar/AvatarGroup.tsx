import Avatar from '@/components/common/avatar/Avatar';
import { useResponsiveValue } from '@/hooks/useResponsiveValue';
import type { UserMe } from '@/types/userMe';
import { cn } from '@/utils/cn';

const AVATAR_MAX = {
  mobile: 2,
  desktop: 3,
};

interface AvatarGroupProps {
  users: UserMe[];
  size?: 's' | 'm';
  className?: string;
}

export default function AvatarGroup({ users, size = 'm', className }: AvatarGroupProps) {
  const maxToShow = useResponsiveValue({
    mobile: AVATAR_MAX.mobile,
    desktop: AVATAR_MAX.desktop,
  });

  const visibleUsers = users.slice(0, maxToShow);
  const rest = users.length - visibleUsers.length;

  return (
    <div
      className={cn('flex items-center', size === 's' ? '-space-x-1.5' : '-space-x-2', className)}>
      {visibleUsers.map((user) => (
        <Avatar key={user.id} size={size} user={user}>
          <Avatar.Img />
          <Avatar.Fallback />
        </Avatar>
      ))}

      {rest > 0 && (
        <div
          className={cn(
            'flex items-center justify-center rounded-full font-lg-medium',
            'border-2 border-gray-0 bg-profile-pink-100 text-pink-500',
            size === 'm' ? 'h-[38px] w-[38px] font-lg-medium' : 'h-[38px] w-[38px]'
          )}>
          +{rest}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import Avatar from '@/components/common/avatar/Avatar';
import type { UserMe } from '@/types/userMe';
import { cn } from '@/utils/cn';

interface AvatarGroupProps {
  users: UserMe[];
  size?: 's' | 'm';
  max?: number; // 데스크탑 기본값
  className?: string;
}

export default function AvatarGroup({ users, size = 'm', max = 3, className }: AvatarGroupProps) {
  const [dynamicMax, setDynamicMax] = useState(max);

  /** 모바일 여부 체크 (640px 이하 기준) */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setDynamicMax(2); // 모바일 일 때 max = 2
      } else {
        setDynamicMax(max); // 데스크탑/태블릿 일 때 기본 max 사용
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [max]);

  const visibleUsers = users.slice(0, dynamicMax);
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
            size === 's' ? 'h-[24px] w-[24px] text-xs' : 'h-[38px] w-[38px] text-sm'
          )}>
          +{rest}
        </div>
      )}
    </div>
  );
}

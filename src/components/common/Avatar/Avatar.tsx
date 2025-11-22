import React from 'react';
import AvatarFallback from '@/components/common/Avatar/AvatarFallback';
import AvatarImg from '@/components/common/Avatar/AvatarImg';
import { cn } from '@/utils/cn';

interface AvatarProps {
  children: React.ReactNode;
  size: 's' | 'm';
  profileImgUrl: string | null;
}

/**
 * @example
 * <Avatar size="s" profileImgUrl={user.profileImgUrl}>
 *  <AvatarImg profileImgUrl={user.profileImgUrl} nickname={user.nickname}/>
 *  <AvatarFallback nickname={user.nickname} id={user.id}/>
 * </Avatar>
 */

export default function Avatar({ children, size, profileImgUrl }: AvatarProps) {
  const AvatarStyle = cn('rounded-full overflow-hidden', {
    'w-[24px] h-[24px] ': size === 's',
    'w-[38px] h-[38px] border-2 border-gray-0': size === 'm',
  });
  //children 중 AvatarImg 태그
  const img = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === AvatarImg
  );
  //children 중 AvatarFallback 태그
  const fallback = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === AvatarFallback
  );
  return <div className={AvatarStyle}>{profileImgUrl ? img : fallback}</div>;
}

Avatar.AvatarImg = AvatarImg;

Avatar.AvatarFallback = AvatarFallback;

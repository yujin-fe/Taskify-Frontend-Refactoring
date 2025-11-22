interface AvatarImgProps {
  profileImgUrl: string;
  nickname: string;
}

export default function AvatarImg({ profileImgUrl, nickname }: AvatarImgProps) {
  return (
    <img
      className='h-full w-full object-cover'
      src={profileImgUrl}
      alt={`${nickname}님의 프로필`}
    />
  );
}

import clsx from 'clsx';

interface ProfileImgProps {
  profileImgUrl: string | null;
  userName: string;
  size: 's' | 'm';
}

export default function ProfileImg({ profileImgUrl, userName, size }: ProfileImgProps) {
  const profileImageStyle = clsx({
    'w-[24px] h-[24px] rounded-full': size === 's',
    'w-[38px] h-[38px] border-2 rounded-full border-gray-0': size === 'm',
  });
  return (
    <div>
      {profileImgUrl ? (
        <img
          className={clsx(profileImageStyle)}
          src={profileImgUrl}
          alt={`${userName}님의 프로필`}
        />
      ) : (
        <div>defaultProfile</div>
      )}
    </div>
  );
}

//TODO: 프로필 이미지가 없을 경우의 프로필 컴포넌트 구현 필요 (defaultProfile)

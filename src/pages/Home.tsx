import DashboardItem from '@/components/dashboard/table/DashboardMembersItem';

interface UserMe {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const users: UserMe[] = [
    {
      id: 101,
      nickname: '김00',
      profileImageUrl: null,
      email: 'alice@example.com',
      createdAt: '2023-01-01',
      updatedAt: '2023-11-26',
    },
    {
      id: 102,
      nickname: '정00',
      profileImageUrl: 'http://example.com/bob.jpg',
      email: 'bob@example.com',
      createdAt: '2023-01-05',
      updatedAt: '2023-11-26',
    },
  ];

  const handleDelete = (userId: number) => {
    const deletedUser = users.find((u) => u.id === userId);

    alert(`사용자 ID ${userId} (${deletedUser?.nickname} 님)를 삭제하시겠습니까?`);
  };

  return (
    <div className='space-y-2 p-4'>
      {users.map((user) => (
        <DashboardItem
          key={user.id}
          user={user}
          onDelete={handleDelete}
          className='border-b pb-2'
        />
      ))}
    </div>
  );
}

import Icons from '@/assets/icons';
import Avatar from '@/components/common/avatar/Avatar';
import Tag from '@/components/dashboard/Tag';
import type { CardDetailResponse } from '@/types/card';
import { getProfileColorForId } from '@/utils/avatar';

interface DashboardCardProps {
  cardData: CardDetailResponse;
}

export default function DashboardCard({ cardData }: DashboardCardProps) {
  const { imageUrl, tags, title, dueDate, assignee } = cardData;

  return (
    <div className='flex flex-row overflow-hidden rounded-[6px] border border-gray-300 bg-gray-0 px-[20px] py-[16px] select-none sm:items-center md:max-w-[314px] md:flex-col md:items-start'>
      {imageUrl && (
        <div className='aspect-[17/10] sm:h-[53px] md:mb-[15px] md:h-[160px] md:w-[274px]'>
          <img
            src={imageUrl}
            alt={title + ' 이미지'}
            className='pointer-events-none h-full w-full rounded-[6px] object-cover'
          />
        </div>
      )}
      <div className='w-full'>
        <span className='mb-[10px] block w-full truncate'>{title}</span>
        <div className='flex w-full items-center gap-[16px] md:flex-col md:items-start md:gap-[8px]'>
          <div className='flex shrink-0 flex-wrap gap-[6px]'>
            {tags.map((t, idx) => (
              <Tag key={t + idx} color={getProfileColorForId(idx)}>
                {t}
              </Tag>
            ))}
          </div>
          <div className='flex w-full justify-between'>
            <div className='flex items-center gap-[6px] text-gray-500'>
              <Icons.Calendar width={18} height={18} />
              <span className='font-xs-medium'>{dueDate ?? '마감일을 정해주세요.'}</span>
            </div>
            <Avatar user={assignee} size='s'>
              <Avatar.Img />
              <Avatar.Fallback />
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ActionWrapper, ContentWrapper } from '@/components/dashboard/items/ItemWrappers';
import { DashboardItemRoot } from '@/components/dashboard/table/DashboardItem';

/**
 * * @example
 * <DashboardItem type='MembersItem' user={...} onDelete={handleDelete}>
 * <DashboardItem.Content />
 * <DashboardItem.Action />
 * </DashboardItem>
 */

// 💡 DashboardItemRoot의 props 타입(DashboardItemProps)을 상속받아 정확한 타입을 정의합니다.
const DashboardItem = DashboardItemRoot as typeof DashboardItemRoot & {
  Content: typeof ContentWrapper;
  Action: typeof ActionWrapper;
};

/**
 * 항목의 내용을 렌더링하는 컴포넌트입니다.
 * type에 따라 멤버(닉네임/아바타) 또는 초대(이메일) 내용을 보여줍니다.
 * * @example
 * <DashboardItem.Content />
 */
DashboardItem.Content = ContentWrapper;

/**
 * 항목의 액션 버튼을 렌더링하는 컴포넌트입니다.
 * type에 따라 삭제 또는 취소 버튼을 보여줍니다.
 * * @example
 * <DashboardItem.Action />
 */
DashboardItem.Action = ActionWrapper;

export default DashboardItem;

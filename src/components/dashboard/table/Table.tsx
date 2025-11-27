import { ContentWrapper, ActionWrapper } from '@/components/dashboard/items/ItemWrappers';
import { DashboardItemRoot } from '@/components/dashboard/table/DashboardItem';

/**
 * * @example
 * <DashboardItem type='MembersItem' user={...} onDelete={handleDelete}>
 * <DashboardItem.Content />
 * <DashboardItem.Action />
 * </DashboardItem>
 */

const DashboardItem = DashboardItemRoot as typeof DashboardItemRoot & {
  Content: typeof ContentWrapper;
  Action: typeof ActionWrapper;
};

/**
 * 항목의 내용을 렌더링하는 컴포넌트입니다.
 * type에 따라 멤버(닉네임/아바타) 또는 초대(이메일) 내용을 보여줍니다.
 *
 * ContentWrapper는 부모 DashboardItem에 전달된 props를 받아와
 * type에 따라 InvitesItemContent 또는 MembersItemContent를 렌더링합니다.
 * * @example
 * <DashboardItem.Content />
 */
DashboardItem.Content = ContentWrapper;

/**
 * 항목의 액션 버튼을 렌더링하는 컴포넌트입니다.
 * type에 따라 삭제 또는 취소 버튼을 보여줍니다.
 *
 * ActionWrapper는 부모 DashboardItem에 전달된 props를 받아와
 * type에 따라 InvitesItemAction 또는 MembersItemAction를 렌더링합니다.
 * * @example
 * <DashboardItem.Action />
 */
DashboardItem.Action = ActionWrapper;

export default DashboardItem;

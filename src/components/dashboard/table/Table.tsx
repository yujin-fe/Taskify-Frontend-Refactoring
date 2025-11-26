import { DashboardItemRoot, ContentWrapper, ActionWrapper } from './DashboardItem';

/**
 * DashboardItem 컴포넌트는 목록의 개별 항목(<li>)을 렌더링하는 루트 컨테이너입니다.
 * * 내부에서 Context를 통해 데이터와 액션을 하위 컴포넌트에 전달합니다.
 * * @example
 * <DashboardItem type='MembersItem' member={...} onDelete={handleDelete}>
 * <DashboardItem.Content type='MembersItem' />
 * <DashboardItem.Action type='MembersItem' />
 * </DashboardItem>
 */
const DashboardItem = DashboardItemRoot as typeof DashboardItemRoot & {
  Content: typeof ContentWrapper;
  Action: typeof ActionWrapper;
};

/**
 * 항목의 내용을 렌더링하는 컴포넌트입니다.
 * type에 따라 멤버(닉네임/아바타) 또는 초대(이메일) 내용을 보여줍니다.
 * * @example
 * <DashboardItem.Content type='MembersItem' />
 */
DashboardItem.Content = ContentWrapper;

/**
 * 항목의 액션 버튼을 렌더링하는 컴포넌트입니다.
 * type에 따라 삭제 또는 취소 버튼을 보여줍니다.
 * * @example
 * <DashboardItem.Action type='MembersItem' />
 */
DashboardItem.Action = ActionWrapper;

export default DashboardItem;

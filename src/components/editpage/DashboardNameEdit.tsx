import { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import Button from '@/components/common/Button';
import Input from '@/components/common/input/Input';
import FormModal from '@/components/common/modal/FormModal';
import Title from '@/components/common/Title';
import ColorPicker from '@/components/dashboard/ColorPicker';
import DashboardCreateModal from '@/components/dashboard/modal/DashboardCreateModal';
import DashboardContainer from '@/components/dashboard/table/DashboardContainer';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
import { DEFAULT_COLOR, type ColorHex } from '@/constants/color';
import useMutation from '@/hooks/useMutation';
import { changeDashboard, type ChangeDashboardParams } from '@/lib/apis/dashboards';
import type { Dashboard } from '@/types/dashboardsData';

export default function DashboardNameEdit() {
  const { dashboardId } = useParams<{ dashboardId: string }>();

  const numericDashboardId = useMemo(() => {
    return dashboardId ? Number(dashboardId) : null;
  }, [dashboardId]);

  const [selectedColor, setSelectedColor] = useState<ColorHex>(DEFAULT_COLOR);
  const [dashboardName, setDashboardName] = useState('비브리지');

  const disabled = dashboardName.trim() === '';

  const updateDashboardMutation = useMutation<Dashboard, ChangeDashboardParams>({
    mutationFn: (data) => {
      if (!numericDashboardId) {
        throw new Error('Dashboard ID가 없습니다.');
      }

      return changeDashboard(numericDashboardId, data);
    },

    onSuccess: (updatedDashboard) => {
      alert(`대시보드 "${updatedDashboard!.title}"의 정보가 성공적으로 변경되었습니다.`);
    },
  });

  const handleSubmit = async () => {
    if (!numericDashboardId) {
      alert('유효하지 않은 대시보드 ID입니다.');
      return;
    }

    updateDashboardMutation.mutate({
      title: dashboardName,
      color: selectedColor,
    });
  };

  if (!dashboardId || numericDashboardId === null) {
    return <div>유효하지 않은 대시보드 ID입니다.</div>;
  }

  return (
    <DashboardContainer type='EditDashboardName'>
      <DashboardCreateModal />
      <DashboardHeader>
        <Title as='h2' size='xl' weight='bold' className='pb-[24px]'>
          {dashboardName}
        </Title>
      </DashboardHeader>

      <FormModal.Form onSubmit={handleSubmit}>
        <FormModal.Body>
          <div className='flex flex-col gap-[16px]'>
            <Input value={dashboardName} onChange={(value) => setDashboardName(value)}>
              <Input.Label className='label-style'>대시보드 이름</Input.Label>
              <Input.Group>
                <Input.Field
                  name='dashboardName'
                  type='text'
                  placeholder='대시보드 이름을 입력해 주세요'
                />
              </Input.Group>
            </Input>
            <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
          </div>
        </FormModal.Body>
        <FormModal.Footer className='pt-[32px] sm:pt-[40px]'>
          <Button
            theme={'primary'}
            type='submit'
            size='lg'
            className='sm: px-[56px] py-[12px] sm:px-[46px]'
            disabled={disabled || updateDashboardMutation.isLoading}>
            {updateDashboardMutation.isLoading ? '변경 중...' : '변경'}
          </Button>
        </FormModal.Footer>
      </FormModal.Form>
    </DashboardContainer>
  );
}

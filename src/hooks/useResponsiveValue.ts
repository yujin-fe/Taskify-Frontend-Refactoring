import { useEffect, useState } from 'react';

type UseResponsiveValueParams<T> = {
  mobile: T;
  desktop: T;
  breakpoint?: number; // 기본 640 (tailwind sm 기준)
  throttleMs?: number; // 리사이즈 시 최소 간격
};

/**
 * 화면 너비에 따라 서로 다른 값을 반환하는 훅
 *
 * 예)
 * const maxToShow = useResponsiveValue({ mobile: 2, desktop: 3 });
 */
export function useResponsiveValue<T>({
  mobile,
  desktop,
  breakpoint = 639,
  throttleMs = 100,
}: UseResponsiveValueParams<T>) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return desktop;
    }
    return window.innerWidth <= breakpoint ? mobile : desktop;
  });
  useEffect(() => {
    const calcValue = () => {
      if (window.innerWidth < breakpoint) {
        setValue(mobile);
      } else {
        setValue(desktop);
      }
    };

    // 스로틀된 핸들러 생성
    let timeoutId: number | null = null;

    const handleResize = () => {
      // 이미 예약된 실행이 있으면 무시
      if (timeoutId !== null) {
        return;
      }

      timeoutId = window.setTimeout(() => {
        calcValue();
        timeoutId = null;
      }, throttleMs);
    };

    // 처음 마운트 시 한 번 계산
    calcValue();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [mobile, desktop, breakpoint, throttleMs]);

  return value;
}

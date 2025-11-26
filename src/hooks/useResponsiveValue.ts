import { useEffect, useState, useCallback } from 'react';

const BREAKPOINT = {
  mobile: 640,
  tablet: 768,
};

type UseResponsiveValueParams<T> = {
  mobile: T;
  tablet: T;
  desktop: T;
  mobileMax?: number;
  tabletMax?: number;
  throttleMs?: number;
};

export function useResponsiveValue<T>({
  mobile,
  tablet,
  desktop,
  mobileMax = BREAKPOINT.mobile,
  tabletMax = BREAKPOINT.tablet,
  throttleMs = 100,
}: UseResponsiveValueParams<T>) {
  // ⭐ getValue를 useCallback으로 감싸기
  const getValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return desktop;
    }

    const width = window.innerWidth;

    if (width < mobileMax) {
      return mobile;
    }
    if (width < tabletMax) {
      return tablet;
    }
    return desktop;
  }, [mobile, tablet, desktop, mobileMax, tabletMax]);

  // 초기값
  const [value, setValue] = useState<T>(getValue);

  useEffect(() => {
    const calcValue = () => {
      setValue(getValue());
    };

    let timeoutId: number | null = null;

    const handleResize = () => {
      if (timeoutId !== null) {
        return;
      }

      timeoutId = window.setTimeout(() => {
        calcValue();
        timeoutId = null;
      }, throttleMs);
    };

    calcValue();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [getValue, throttleMs]);

  return value;
}

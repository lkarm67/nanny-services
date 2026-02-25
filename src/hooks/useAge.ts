// hooks/useAge.ts
import { useMemo } from 'react';
import dayjs from 'dayjs';

export function useAge(birthday: string): number {
  return useMemo(() => {
    return dayjs().diff(dayjs(birthday), 'year');
  }, [birthday]);
}
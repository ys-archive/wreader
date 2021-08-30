import { useState , useCallback } from 'react';

export const useForceUpdate = () => {
  const [v, s] = useState(false);
  const u = useCallback(() => s(p => !p), []);
  return [v, u];
};

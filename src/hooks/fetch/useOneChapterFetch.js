import { useStoreState } from 'easy-peasy';
import React, { useEffect } from 'react';
import { selAuth, selSwiper } from '../../store/selectors';

const initStates = () => {
  const userId = useStoreState(selAuth.userId);
  const coords = useStoreState(selSwiper.coords);

  return {
    userId,
    coords,
  };
};

const useOneChapterFetch = () => {
  const { userId, coords } = initStates();
  const { d0, d1 } = coords;

  useEffect(() => {
      
  }, [userId]);
};

export default useOneChapterFetch;

import React, { useCallback } from 'react';

import { useStoreActions, useStoreState } from 'easy-peasy';
import { selSwiper } from '../../store/selectors';
import { actData } from '../../store/actions';
import { DEPTH_NAME } from '../../store/reducers/swiper.depth';

const initStates = () => {
  const depth = useStoreState(selSwiper.depth);

  const sortUserChapters = useStoreActions(actData.sortUserChapters);
  const sortNext = useStoreActions(actData.sortNext);

  return {
    depth,
    sortUserChapters,
    sortNext,
  };
};

export const useCardSorter = () => {
  const { depth, sortUserChapters, sortNext } = initStates();

  return useCallback(() => {
    switch (depth) {
      case DEPTH_NAME.USER_CHAPTER:
        sortUserChapters();
        break;

      case DEPTH_NAME.NEXT:
        sortNext();
        break;

      default:
        console.log("You can't sort due to the depth!");
        break;
    }
  }, [depth]);
};

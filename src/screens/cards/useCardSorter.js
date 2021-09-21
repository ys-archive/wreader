import React, { useCallback, useEffect, useState } from 'react';

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
  const [isSorterOpen, setSorter] = useState(false);
  const { depth, sortUserChapters, sortNext } = initStates();

  const openSorterForSecs = useCallback((duration = 2) => {
    setSorter(true);
    setTimeout(() => {
      setSorter(false);
    }, duration * 1000);
  }, []);

  return {
    callback: useCallback(() => {
      switch (depth) {
        case DEPTH_NAME.USER_CHAPTER:
          sortUserChapters();
          openSorterForSecs(2);
          break;

        case DEPTH_NAME.NEXT:
          sortNext();
          openSorterForSecs(2);
          break;

        default:
          console.log("You can't sort due to the depth!");
          break;
      }
    }, [depth]),
    isSorterOpen,
  };
};

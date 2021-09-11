import React from 'react';
import { asyncForEach } from '../utils';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selData, selAuth, selSwiper } from '../store/selectors';
import { actData, actSwiper } from '../store/actions';

const initStates = () => {
  // selectors
  const categories = useStoreState(selData.categories);
  const isLoaded = useStoreState(selData.isLoaded);
  const hasLike = useStoreState(selData.hasLike);

  // actions
  // - data
  const addChapter = useStoreActions(actData.addChapter);
  const finishLoading = useStoreActions(actData.finishLoading);

  // - swiper
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

  return {
    categories,
    isLoaded,
    hasLike,

    addChapter,
    finishLoading,

    setMaxCoords,
  };
};

export const useChaptersFetch = () => {
  // state 가져오기

  const { categories } = initStates();

  React.useEffect(() => {
    async function fetch() {
      reset();

      // 챕터 데이터 정제 및 저장
      const chapters = Object.values(categories)
        .map(i => i.chapter)
        .filter(i => i.length > 0);

      if (!chapters || chapters.length === 0) return;

      // group_index 0 부터 저장
      await asyncForEach(chapters, async deck => {
        if (deck.length === 0) return;

        addChapter({ deck });
      });

      // ------------------- d1 --------------------------------------

      // 로딩 끝
      finishLoading('d0');
    }

    fetch();
  }, []);

  React.useEffect(() => {
    if (!isLoaded) return;

    setMaxCoords({ d1: chapters });
    // setMaxCoords({ d2: chapters });
    // setMaxCoords({ d3: chapters });
  }, [isLoaded]);
};

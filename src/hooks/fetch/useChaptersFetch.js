import React from 'react';
import { asyncForEach } from '../../utils';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selData, selAuth, selSwiper } from '../../store/selectors';
import { actData, actSwiper } from '../../store/actions';

const initStates = () => {
  // selectors
  const categories = useStoreState(selData.categories);
  const isLoaded = useStoreState(selData.isLoaded);
  const hasLike = useStoreState(selData.hasLike);
  const hasNew = useStoreState(selData.hasNew);

  // actions
  // - data
  const addChapter = useStoreActions(actData.addChapter);
  const finishLoading = useStoreActions(actData.finishLoading);

  // - swiper
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

  return {
    categories,
    isLoaded,
    hasNew,
    hasLike,

    addChapter,
    finishLoading,

    setMaxCoords,
  };
};

let chapters = undefined;

export const useChaptersFetch = () => {
  const {
    categories,
    isLoaded,
    addChapter,
    finishLoading,
    hasNew,
    hasLike,
    setMaxCoords,
  } = initStates();

  React.useEffect(() => {
    (async function fetchChapters() {
      // 카테고리가 먼저 로드 되었어야 함
      if (!isLoaded.d0) return;
      if (!categories || categories.length === 0) return;
      console.log('fetching CHAPTERS');

      // 챕터 데이터 정제 및 저장
      chapters = Object.values(categories)
        .map(i => i.chapter)
        .filter(i => i.length > 0);
      // console.log('refined chapters --> ', chapters);

      if (!chapters || chapters.length === 0) return;

      // group_index 0 부터 저장
      await asyncForEach(chapters, async deck => {
        if (deck.length === 0) return;

        addChapter({ deck });
      });

      finishLoading('d1');
    })();
  }, [hasNew.d1, hasLike.d1, isLoaded.d0]);
  
  React.useEffect(() => {
    if (!isLoaded.d1) return;

    setMaxCoords({ d1: chapters });
  }, [isLoaded.d1]);
};

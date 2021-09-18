import React from 'react';
import { asyncForEach, delay } from '../../utils';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selData, selAuth, selSwiper } from '../../store/selectors';
import { actData, actSwiper } from '../../store/actions';

const initStates = () => {
  // selectors
  const categories = useStoreState(selData.categories);
  const isLoaded = useStoreState(selData.isLoaded);
  const hasNew = useStoreState(selData.hasNew);

  // actions
  // - data
  const resetChapter = useStoreActions(actData.resetChapter);
  const addChapter = useStoreActions(actData.addChapter);

  const startLoading = useStoreActions(actData.startLoading);
  const finishLoading = useStoreActions(actData.finishLoading);

  const updateHasNew = useStoreActions(actData.updateHasNew);

  // - swiper
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

  return {
    categories,
    isLoaded,
    hasNew,

    resetChapter,
    addChapter,

    startLoading,
    finishLoading,

    updateHasNew,

    setMaxCoords,
  };
};

let chapters = undefined;

export const useChaptersFetch = () => {
  const {
    categories,
    isLoaded,
    hasNew,
    resetChapter,
    addChapter,
    startLoading,
    finishLoading,
    updateHasNew,
    setMaxCoords,
  } = initStates();

  React.useEffect(() => {
    (async function fetchChapters() {
      // 카테고리가 먼저 로드 되었어야 함
      if (!isLoaded.d0) return;
      if (!hasNew.d1) return;
      if (!categories || categories.length === 0) return;

      console.log('fetching CHAPTERS');

      await delay(0.5);
      
      startLoading('d1');

      // resetChapter();

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
  }, [hasNew.d1, isLoaded.d0]);

  React.useEffect(() => {
    if (!isLoaded.d1) return;

    updateHasNew({ d1: false });
    setMaxCoords({ d1: chapters });
  }, [isLoaded.d1, chapters]);
};

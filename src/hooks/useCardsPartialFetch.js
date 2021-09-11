import React from 'react';
import { asyncForEach } from '../utils';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selData, selAuth, selSwiper } from '../store/selectors';
import { actData, actSwiper } from '../store/actions';

import ChapterService from '../services/ChapterService';

import { useWriteNewCard, useLikeUpdate } from '../contexts/chapterDataContext';

const initStates = () => {
  // selectors
  const userId = useStoreState(selAuth.userId);

  const chapters = useStoreState(selData.chapters);
  const isLoaded = useStoreState(selData.isLoaded);
  const maxCoords = useStoreState(selSwiper.maxCoords);

  // actions
  // - data
  const addChapterChild = useStoreActions(actData.addChapterChild);
  const finishLoading = useStoreActions(actData.finishLoading);

  // - swiper
  //   const initCoords = useStoreActions(actSwiper.initCoords);
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

  return {
    userId,
    chapters,
    isLoaded,
    maxCoords,

    addChapterChild,
    finishLoading,

    // initCoords,
    setMaxCoords,
  };
};

export const useCardsInitialFetch = () => {
  // state 가져오기
  const [isNewNextWritten] = useWriteNewCard();
  const [isLikeUpdated] = useLikeUpdate();
  const states = initStates();

  React.useEffect(() => {
    async function fetch() {
      if (!states.chapters || states.chapters.length === 0) return;

      // group_index 0 부터 저장
      await asyncForEach(states.chapters, async deck => {
        if (deck.length === 0) return;

        // 이후의 chapterId 로 재귀적으로 fetch
        await fetchRecursively(deck, states.userId, states.addChapterChild);
      });

      // 로딩 끝
      states.finishLoading(true);
    }

    fetch();
  }, [isNewNextWritten, isLikeUpdated]);

  React.useEffect(() => {
    if (!states.isLoaded) return;

    // states.setMaxCoords({ d1: states.chapters });
    // states.setMaxCoords({ d2: states.chapters });
    // states.setMaxCoords({ d3: states.chapters });
  }, [states.isLoaded]);
};

const fetchRecursively = async (arr, userId, addChapterChild) => {
  await asyncForEach(arr, async item => {
    const { data } = await ChapterService.GET_getChapter(+item.id, +userId);

    switch (data.item.length) {
      case 0:
        return;

      case 1:
        addChapterChild({ deck: data.item[0] });
        break;

      default:
        // >= 2
        data.item.forEach(data => {
          addChapterChild({ deck: data });
        });
        break;
    }

    await fetchRecursively(data.item, userId, addChapterChild);
  });
};

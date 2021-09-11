import React from 'react';
import { asyncForEach, delay, delayFinally } from '../../utils';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selData, selAuth, selSwiper } from '../../store/selectors';
import { actData, actSwiper } from '../../store/actions';

import ChapterService from '../../services/ChapterService';

const initStates = () => {
  // selectors
  const userId = useStoreState(selAuth.userId);

  const chapters = useStoreState(selData.chapters);
  const isLoaded = useStoreState(selData.isLoaded);
  const hasLike = useStoreState(selData.hasLike);
  const hasNew = useStoreState(selData.hasNew);

  // actions
  // - data
  const addChapterChild = useStoreActions(actData.addChapterChild);
  const finishLoading = useStoreActions(actData.finishLoading);

  // - swiper
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

  return {
    userId,

    chapters,
    isLoaded,
    hasNew,
    hasLike,

    addChapterChild,
    finishLoading,

    setMaxCoords,
  };
};

export const useUserChaptersFetch = () => {
  const {
    userId,

    chapters,
    isLoaded,
    hasNew,
    hasLike,

    addChapterChild,
    finishLoading,
    setMaxCoords,
  } = initStates();

  React.useEffect(() => {
    (async function fetchUserChapters() {
      if (!isLoaded.d1) return;
      if (!hasNew.d2) return;
      if (!chapters || chapters.length === 0) return;
      console.log('fetching USER CHAPTERS');

      await asyncForEach(chapters, async chapter => {
        if (!chapter || chapter.length === 0) return;
        // console.log('deck -> ', chapter);

        // chapters 기반으로 child 인 user chapter fetch
        await fetchUserChapter(chapter, userId, addChapterChild);
      });

      // 로딩 끝
      finishLoading('d2');
    })();
  }, [hasLike.d2, hasNew.d2, isLoaded.d1]);

  React.useEffect(() => {
    if (!isLoaded.d2) return;

    // console.log('UPDATE MAX WITH -->', chapters);
    setMaxCoords({ d2: chapters });
  }, [isLoaded.d2]);
};

const fetchUserChapter = async (arr, userId, addChapterChild) => {
  await asyncForEach(arr, async item => {
    const { data } = await ChapterService.GET_getChapter(
      +item.deck.id,
      +userId,
    );

    if (data.item.length === 1) {
      addChapterChild({ deck: data.item[0] });
    } else if (data.item.length >= 2) {
      data.item.forEach(data => {
        addChapterChild({ deck: data });
      });
    }
  });
};

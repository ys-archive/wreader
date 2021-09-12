import React from 'react';
import { asyncForEach } from '../../utils';

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
  const updateHasNew = useStoreActions(actData.updateHasNew);

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
    updateHasNew,

    setMaxCoords,
  };
};

export const useOneFetch = chapterId => {
  if (depth === 0) return;

  const {
    userId,

    chapters,
    isLoaded,
    hasNew,
    hasLike,

    addChapterChild,
    finishLoading,
    updateHasNew,

    setMaxCoords,
  } = initStates();



  React.useEffect(() => {}, []);
};


const fetchD1 = () => {

};

const fetchD2 = () => {

}

const fetchD3 = () => {
    
}

const fetchRecursively = async (arr, userId, addChapterChild) => {
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

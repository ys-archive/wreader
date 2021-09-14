import React from 'react';
import { delay } from '../../utils';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selAuth, selData } from '../../store/selectors';
import { actData, actSwiper } from '../../store/actions';

import ChapterService from '../../services/ChapterService';
import { isLoaded } from 'expo-font';

const initStates = () => {
  // actions
  const userId = useStoreState(selAuth.userId);
  const hasNew = useStoreState(selData.hasNew);

  const isLoaded = useStoreState(selData.isLoaded);

  // - data
  const resetCategory = useStoreActions(actData.resetCategory);
  const addCategory = useStoreActions(actData.addCategory);
  const startLoading = useStoreActions(actData.startLoading);
  const finishLoading = useStoreActions(actData.finishLoading);
  const updateHasNew = useStoreActions(actData.updateHasNew);

  // - swiper
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

  return {
    isLoaded,

    userId,
    hasNew,

    resetCategory,

    addCategory,
    startLoading,
    finishLoading,
    updateHasNew,

    setMaxCoords,
  };
};

let categories = undefined;

export const useCategoriesFetch = () => {
  const {
    isLoaded,
    userId,
    hasNew,
    setMaxCoords,
    resetCategory,
    addCategory,
    startLoading,
    updateHasNew,
    finishLoading,
  } = initStates();

  React.useEffect(() => {
    (async function fetchCategories() {
      if (!hasNew.d0) return;

      await delay(1);

      console.log('start fetching CATEGORY');
      startLoading('d0');

      resetCategory();

      const { data } = await ChapterService.GET_getCategory(userId);

      if (!data || !data.item || data.item.length === 0) return;

      // 카테고리 데이터 정제 및 저장
      categories = Object.values(data.item);
      // .map(item => {
      // delete item.chapter;
      //   return item;
      // });

      // 카테고리 값 업데이트 - d0
      categories.forEach(category => addCategory(category));

      finishLoading('d0');
    })();
  }, [userId, hasNew.d0]);

  React.useEffect(() => {
    if (!isLoaded.d0) return;

    updateHasNew({ d0: false });
    setMaxCoords({ d0: categories });
    // updateHasNew({ d1: true });
  }, [isLoaded.d0, categories]);
};

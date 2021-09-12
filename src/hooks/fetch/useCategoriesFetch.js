import React from 'react';
import { delay } from '../../utils';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selAuth, selData } from '../../store/selectors';
import { actData, actSwiper } from '../../store/actions';

import ChapterService from '../../services/ChapterService';

const initStates = () => {
  // actions
  const userId = useStoreState(selAuth.userId);
  const hasNew = useStoreState(selData.hasNew);

  // - data
  const resetCategory = useStoreActions(actData.resetCategory);
  const addCategory = useStoreActions(actData.addCategory);
  const startLoading = useStoreActions(actData.startLoading);
  const finishLoading = useStoreActions(actData.finishLoading);
  const updateHasNew = useStoreActions(actData.updateHasNew);

  // - swiper
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

  return {
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

export const useCategoriesFetch = () => {
  const {
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
      const categories = Object.values(data.item);
      // .map(item => {
      // delete item.chapter;
      //   return item;
      // });

      // 카테고리 값 업데이트 - d0
      categories.forEach(category => addCategory(category));

      updateHasNew({ d0: false });
      setMaxCoords({ d0: categories });
      finishLoading('d0');
      updateHasNew({ d1: true });
    })();
  }, [userId, hasNew.d0]);
};

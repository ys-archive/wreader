import React from 'react';
import { asyncForEach } from '../utils';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selData, selAuth, selSwiper } from '../store/selectors';
import { actData, actSwiper } from '../store/actions';

import ChapterService from '../services/ChapterService';

import { useWriteNewCard, useLikeUpdate } from '../contexts/chapterDataContext';

const initStates = () => {
  // actions
  // - data
  const reset = useStoreActions(actData.reset);
  const addCategory = useStoreActions(actData.addCategory);
  const finishLoading = useStoreActions(actData.finishLoading);

  // - swiper
  // const initCoords = useStoreActions(actSwiper.initCoords);
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

  return {
    reset,
    addCategory,
    finishLoading,
    setMaxCoords,
  };
};

export const useCardsInitialFetch = () => {
  const { reset, setMaxCoords, addCategory, finishLoading } = initStates();

  React.useEffect(() => {
    async function fetchCategories() {
      reset();

      const { data } = await ChapterService.GET_getCategory();

      if (!data.item.length) return;

      // 카테고리 데이터 정제 및 저장
      const categories = Object.values(
        JSON.parse(JSON.stringify(data.item)),
      ).map(item => {
        delete item.chapter;
        return item;
      });

      // 카테고리 값 업데이트 - d0
      setMaxCoords({ d0: categories });
      categories.forEach(category => addCategory(category));

      finishLoading('d0');
    }

    fetchCategories();
  }, []);
};

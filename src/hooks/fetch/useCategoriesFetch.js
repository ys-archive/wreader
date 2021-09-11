import React from 'react';

import { useStoreActions } from 'easy-peasy';
import { actData, actSwiper } from '../../store/actions';

import ChapterService from '../../services/ChapterService';

const initStates = () => {
  // actions
  // - data
  const addCategory = useStoreActions(actData.addCategory);
  const finishLoading = useStoreActions(actData.finishLoading);

  // - swiper
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

  return {
    addCategory,
    finishLoading,
    setMaxCoords,
  };
};

export const useCategoriesFetch = () => {
  const { setMaxCoords, addCategory, finishLoading } = initStates();

  React.useEffect(() => {
    (async function fetchCategories() {
      console.log('start fetching CATEGORY');
      const { data } = await ChapterService.GET_getCategory();

      if (!data || !data.item || data.item.length === 0) return;

      // 카테고리 데이터 정제 및 저장
      const categories = Object.values(JSON.parse(JSON.stringify(data.item)));

      // 카테고리 값 업데이트 - d0
      categories.forEach(category => addCategory(category));

      finishLoading('d0');
      setMaxCoords({ d0: categories });
    })();
  }, []);
};

import React from 'react';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selData, selAuth } from '../store/selectors';
import { actData, actSwiper } from '../store/actions';

import ChapterService from '../services/ChapterService';

const initStates = () => {
  // selectors
  const userId = useStoreState(selAuth.userId);

  const chapters = useStoreState(selData.chapters);

  // actions
  // - data
  const addCategory = useStoreActions(actData.addCategory);
  const addChapter = useStoreActions(actData.addChapter);
  const addChapterChild = useStoreActions(actData.addChapterChild);
  const setLoaded = useStoreActions(actData.setLoaded);

  // - swiper
  const initCoords = useStoreActions(actSwiper.initCoords);
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

  return {
    userId,
    chapters,

    addCategory,
    addChapter,
    addChapterChild,
    setLoaded,

    initCoords,
    setMaxCoords,
  };
};

async function asyncForEach(arr, callback) {
  const len = arr.length;
  for (let i = 0; i < len; ++i) {
    await callback(arr[i], i, arr);
  }
}

export const useCardsFetch = () => {
  // state 가져오기
  const states = initStates();

  React.useEffect(() => {
    async function fetch() {
      const { data } = await ChapterService.GET_getCategory();

      if (!data.item.length) return;

      // 카테고리 데이터 정제 및 저장
      const categories = Object.values(
        JSON.parse(JSON.stringify(data.item)),
      ).map(item => {
        delete item.chapter;
        return item;
      });

      // 카테고리 값 업데이트
      categories.forEach(category => states.addCategory(category));

      // 챕터 데이터 정제 및 저장
      const chapters = Object.values(data.item)
        .map(i => i.chapter)
        .filter(i => i.length > 0);

      if (!chapters || chapters.length === 0) return;

      // group_index 0 부터 저장
      await asyncForEach(chapters, async deck => {
        if (deck.length === 0) return;

        // temp.push({ deck });
        states.addChapter({ deck });
        // 이후의 chapterId 로 재귀적으로 fetch
        await fetchRecursively(deck, states.userId, states.addChapterChild);
      });

      states.initCoords(categories, chapters);

      states.setMaxCoords('d0');
      states.setMaxCoords('d1');
      states.setMaxCoords('d2');
      states.setMaxCoords('d3');

      states.setLoaded(true);
    }

    fetch();
  }, []);
};

const fetchRecursively = async (arr, userId, addChapterChild) => {
  await asyncForEach(arr, async item => {
    const { data } = await ChapterService.GET_getChapter(+item.id, userId);

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
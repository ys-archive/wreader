import React from 'react';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selAuth } from '../store/selectors';
import { actData } from '../store/actions';

import ChapterService from '../services/ChapterService';

const initStates = () => {
  const addCategory = useStoreActions(actData.actAddCategory);
  const addChapter = useStoreActions(actData.actAddChapter);
  const userId = useStoreState(selAuth.selUserId);

  return {
    addCategory,
    addChapter,
    userId,
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
  const { addCategory, addChapter, userId } = initStates();

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
      categories.forEach(category => addCategory(category));

      // 챕터 데이터 정제 및 저장
      const chapters = Object.values(data.item)
        .map(i => i.chapter)
        .filter(i => i.length > 0);

      console.log('length: ', chapters.length);

      // group_index 0 부터 저장
      const temp = [];
      await asyncForEach(chapters, async deck => {
        if (deck.length === 0) return;

        // temp.push({ deck });
        addChapter({ deck });
        // 이후의 chapterId 로 재귀적으로 fetch
        await fetchRecursively(deck, userId, addChapter, temp);
        // addChapter(temp);
      });
    }

    fetch();
  }, []);
};

const fetchRecursively = async (arr, userId, addChapter, temp) => {
  await asyncForEach(arr, async item => {
    const { data } = await ChapterService.GET_getChapter(+item.id, userId);

    if (data.item.length === 0) return;

    addChapter({ deck: data.item });
    // temp.push({ deck: data.item });
    await fetchRecursively(data.item, userId, addChapter, temp);
  });
};

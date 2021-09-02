import { useEffect, useState } from 'react';
// import { useGetSWR } from './useGetSWR';
import * as _ from 'lodash';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selAuth, selData } from '../store/selectors';
import { actData } from '../store/actions';

import ChapterService from '../services/ChapterService';

const initStates = () => {
  const addCategory = useStoreActions(actData.actAddCategory);
  const addChapter = useStoreActions(actData.actAddChapter);
  const chapters = useStoreState(selData.selChapters);
  const populateChapter = useStoreActions(actData.actPopulateChapter);
  const userId = useStoreState(selAuth.selUserId);

  return {
    addCategory,
    addChapter,
    chapters,
    populateChapter,
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
  const {
    addCategory,
    addChapter,
    chapters: g,
    populateChapter,
    userId,
  } = initStates();

  //   const [chapter, setChapter] = useState([]);

  //   const addChapter = newChapter =>
  //     setChapter(prv => {
  //       if (!prv) return [newChapter];

  //       const hasFound = prv?.findIndex(ch => _.isEqual(ch.deck, payload.deck));

  //       if (hasFound === -1) {
  //         return [...prv, newChapter];
  //       }
  //     });

  useEffect(() => {
    async function fetch() {
      const { data } = await ChapterService.GET_getCategory();

      if (!data || !data.item || !data.item.length) return;

      const categories = Object.values(
        JSON.parse(JSON.stringify(data.item)),
      ).map(item => {
        delete item.chapter;
        return item;
      });
      categories.forEach(category => addCategory(category));

      const chapters = Object.values(data.item)
        .map(i => i.chapter)
        .filter(i => i.length > 0);

      console.log('length: ', chapters.length);

      await asyncForEach(chapters, async deck => {
        if (deck.length === 0) return;

        addChapter({ deck });
        await fetchRecursively(deck, userId, addChapter);
      });
    }

    fetch();
  }, [addChapter]);
};

const fetchRecursively = async (arr, userId, addChapter) => {
  await asyncForEach(arr, async item => {
    const { data } = await ChapterService.GET_getChapter(+item.id, userId);

    if (data.item.length === 0) return;

    addChapter({ deck: data.item });
    await fetchRecursively(data.item, userId, addChapter);
  });
};

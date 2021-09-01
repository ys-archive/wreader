import { useGetSWR } from './useGetSWR';

import { useStoreActions } from 'easy-peasy';
import { actData } from '../store/actions';

const initStates = () => {
  const addCategory = useStoreActions(actData.actAddCategory);
  const populateChapter = useStoreActions(actData.actPopulateChapter);

  return {
    addCategory,
    addChapter,
    addCandidate,
    populateChapter
  };
};

export const useCardsFetch = () => {
  // state 가져오기
  const { addCategory, populateChapter } = initStates();
  const { data, error } = useGetSWR('category');

  if (error) {
      console.error(error);
      return;
  }

  // 카테고리 데이터 forward
  const categories = data.item;

  if (!categories || categories.length === 0) return;

  categories.foreach(feedCategories);

  const feedCategories = category => {
      // chapters 는 재귀-순회해서 모든 챕터들을 fetch
    const { chapter: chapters, ...rest } = category;

    addCategory(rest);

    if (!chapters || chapters.length === 0)
        continue;

    chapters.foreach(feedChapters);
  };

  const feedChapters = chapter => {
    const { group_index: prvChapterId } = chapter;
    populateChapter(prvChapterId);
  };
};

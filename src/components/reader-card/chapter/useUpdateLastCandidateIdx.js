import { useEffect } from 'react';

import { useStoreActions, useStoreState } from 'easy-peasy';
import {
  selectCurrentCategoryIdx,
  selectCurrentChapterIdx,
  selectIsCategorySelected,
  selectCurrentCandidateIdx,
  selectLastCandidateIdx,
} from '#store/selectors';
import { actionsSetLastCandidateIdx } from '#store/actions';

import { useChapterData } from '../../../contexts/chapterDataContext';

export const useUpdateLastCandidateIdx = chapterIdx => {
  const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  const currentChapterIdx = useStoreState(selectCurrentChapterIdx);
  const isCategorySelected = useStoreState(selectIsCategorySelected);
  const setLastCandidateIdx = useStoreActions(actionsSetLastCandidateIdx);
  const currentCandidateIdx = useStoreState(selectCurrentCandidateIdx);
  const lastCandidateIdx = useStoreState(selectLastCandidateIdx);

  const chapterData = useChapterData();

  useEffect(() => {
    if (!chapterData || !isCategorySelected) {
      return;
    }

    // 현재 렌더하는 챕터가 보고있는 챕터와 동일 할 때,
    // 챕터 최소, 최대 재 설정
    if (currentChapterIdx === chapterIdx + 1) {
      // 현재 get Chapter 의 결과를 filter
      // 카테고리 id 가 현재 선택한 카테고리의 idx 와 같아야 렌더
      const maxLength =
        chapterData?.item.filter(
          chapter => chapter.categoryId - 5 === currentCategoryIdx,
        )?.length + 1;

      console.log(
        `[${chapterIdx}:${currentCategoryIdx}] ${maxLength} / ${chapterData.item.length}`,
      );

      setLastCandidateIdx(maxLength);
    }
  }, [
    chapterData,
    isCategorySelected,
    currentChapterIdx,
    chapterIdx,
    setLastCandidateIdx,
  ]);
};

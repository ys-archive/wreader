import React, { useEffect } from 'react';

import { ChapterService } from '../../../services';

import { useStoreState } from 'easy-peasy';
import { selectCurrentChapterIdx, selectUserId } from '#store/selectors';
import {
  useSetChapterData,
  useIsLikeUpdated,
  useIsNewCandidateWritten,
} from '../../../contexts/chapterDataContext';

export const useFetchChapterData = () => {
  const currentChapterIdx = useStoreState(selectCurrentChapterIdx);
  const userId = useStoreState(selectUserId);

  const setChapterData = useSetChapterData();
  const isLikeUpdated = useIsLikeUpdated();
  const isNewCandidateWritten = useIsNewCandidateWritten();

  useEffect(() => {
    async function fetchChapterData() {
      const { data } = await ChapterService.GET_getChapter(
        currentChapterIdx,
        userId,
      );

      if (data) {
        setChapterData(data);
      }
    }

    fetchChapterData();
  }, [currentChapterIdx, userId, isLikeUpdated, isNewCandidateWritten]);
};

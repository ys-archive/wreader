import { useEffect } from 'react';

import { ChapterService } from '../../../services';

import { useStoreState } from 'easy-peasy';
import { selectCurrentChapterIdx, selectUserId } from '#store/selectors';
import {
  useChapterData,
  useLikeUpdate,
  useWriteNewCard,
} from '../../../contexts/chapterDataContext';

export const useFetchChapterData = () => {
  const currentChapterIdx = useStoreState(selectCurrentChapterIdx);
  const userId = useStoreState(selectUserId);

  const [_, setChapterData] = useChapterData();
  const [isLikeUpdated] = useLikeUpdate();
  const [isNewCandidateWritten] = useWriteNewCard();

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
    // 좋아요/ 안좋아요
    // 새로운 카드 추가 시에 현재 챕터 로드
  }, [currentChapterIdx, userId, isLikeUpdated, isNewCandidateWritten]);
};

import { useState, useCallback } from 'react';
import constate from 'constate';

const useChapterDataContext = () => {
  const [chapterData, setChapterData] = useState(null);

  const [isLikeUpdated, u1] = useState(false);
  const updateLike = useCallback(() => u1(prv => !prv), []);

  const [isNewCandidateWritten, u2] = useState(false);
  const writeNewCard = useCallback(() => u2(prv => !prv), []);

  return {
    chapterData,
    setChapterData,
    isLikeUpdated,
    updateLike,
    isNewCandidateWritten,
    writeNewCard,
  };
};

export const [
  ChapterDataProvider,
  useChapterData,
  useLikeUpdate,
  useWriteNewCard,
] = constate(
  useChapterDataContext,
  v => [v.chapterData, v.setChapterData],
  v => [v.isLikeUpdated, v.updateLike],
  v => [v.isNewCandidateWritten, v.writeNewCard],
);

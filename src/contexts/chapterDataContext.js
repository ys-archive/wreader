import { useState, useCallback } from 'react';
import constate from 'constate';

const useChapterDataContext = () => {
  const [chapterData, setChapterData] = useState(null);
  const [isLikeUpdated, updateLike] = useState(false);
  const [isNewCandidateWritten, update] = useState(false);

  const setNewCandidateWritten = useCallback(() => update(prv => !prv), []);

  return {
    chapterData,
    setChapterData,
    isLikeUpdated,
    updateLike,
    isNewCandidateWritten,
    setNewCandidateWritten,
  };
};

export const [
  ChapterDataProvider,
  useChapterData,
  useSetChapterData,
  useIsLikeUpdated,
  useUpdateLike,
  useIsNewCandidateWritten,
  useSetNewCandidateWritten,
] = constate(
  useChapterDataContext,
  v => v.chapterData,
  v => v.setChapterData,
  v => v.isLikeUpdated,
  v => v.updateLike,
  v => v.isNewCandidateWritten,
  v => v.setNewCandidateWritten,
);

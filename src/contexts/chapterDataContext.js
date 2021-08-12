import { useState } from 'react';
import constate from 'constate';

const useChapterData = () => {
  const [chapterData, setChapterData] = useState(null);
  const [isLikeUpdated, updateLike] = useState(false);
  const [isNewCandidateWritten, setNewCandidateWritten] = useState(false);

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
  useChapterData,
  v => v.chapterData,
  v => v.setChapterData,
  v => v.isLikeUpdated,
  v => v.updateLike,
  v => v.isNewCandidateWritten,
  v => v.setNewCandidateWritten,
);

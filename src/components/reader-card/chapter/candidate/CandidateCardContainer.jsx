import React from 'react';

import { useStoreState } from 'easy-peasy';
import { selectCurrentCategoryIdx } from '#store/selectors';

import { useOpenWriteCard } from './useOpenWriteCard';
import { useChapterData } from '../../../../contexts/chapterDataContext';

import ChapterCard from '../chapter-card/ChapterCard';

const CandidateCardContainer = ({ chapterIdx, categoryTitle }) => {
  const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  const [chapterData] = useChapterData();
  // TODO: update last candidate next idx

  // 새로운 후보 챕터로 시작하는 다음 챕터
  

  // 새로운 후보 챕터
  useOpenWriteCard(categoryTitle, chapterIdx);

  const Candidates = chapterData.item?.map((candidateData, i) => {
    // 현재 후보 챕터가 선택한 카테고리랑 맞는 것만 렌더
    if (currentCategoryIdx !== Math.max(0, candidateData.categoryId - 5))
      return null;

    return (
      <ChapterCard
        key={candidateData.id}
        chapterIdx={chapterIdx}
        data={candidateData}
        candidateIdx={i}
        categoryTitle={categoryTitle}
      />
    );
  });

  return <>{Candidates}</>;
};

export default CandidateCardContainer;

import React, { useMemo, useState, useEffect } from 'react';
import * as _ from 'lodash';
import { Dimensions, View, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet } from '#components';

import { useStoreState } from 'easy-peasy';
import {
  selectCurrentCategoryIdx,
  selectCurrentChapterIdx,
  selectCurrentCandidateIdx,
  selectCurrentCandidateNextIdx,
  selectUserId,
} from '#store/selectors';

import { useOpenWriteCard } from './useOpenWriteCard';
import {
  useChapterData,
  useNextData,
} from '../../../../contexts/chapterDataContext';
// import { useForceUpdate } from '../../../../hooks';

import { useFetchNextData } from '../candidate-next/useFetchNextData';
import { useFetchChapterData } from '../chapter-card-container/useFetchChapterData';

import ChapterCard from '../chapter-card/ChapterCard';
import { ChapterService } from '../../../../services';
import CandidateNextCardContainer from '../candidate-next/CandidateNextCardContainer';
// import CandidateNextCardContainer from '../candidate-next/CandidateNextCardContainer';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CandidateCardContainer = ({ chapterIdx, categoryTitle }) => {
  const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  const currentChapterIdx = useStoreState(selectCurrentChapterIdx);
  const currentCandidateIdx = useStoreState(selectCurrentCandidateIdx);
  const [prvGroupId, setPrvGroupId] = useState(undefined);
  
  const [chapterData] = useChapterData();

  useFetchChapterData();

  // 새로운 후보 챕터
  useOpenWriteCard(categoryTitle, chapterIdx);

  const Candidates =
    currentChapterIdx - 1 === chapterIdx &&
    chapterData.item?.map((candidateData, i) => {
      // 현재 후보 챕터가 선택한 카테고리랑 맞는 것만 렌더
      if (currentCategoryIdx !== Math.max(0, candidateData.categoryId - 5))
        return null;

      const FirstCard = (
        <ChapterCard
          chapterIdx={chapterIdx}
          data={candidateData}
          candidateIdx={i}
          categoryTitle={categoryTitle}
        />
      );

      return (
        <View style={s.root} key={i}>
          {FirstCard}
          {currentCandidateIdx - 1 === i && (
            <CandidateNextCardContainer
              prvChapterIdx={candidateData.id}
              categoryTitle={categoryTitle}
              order={i}
              prvGroupId={prvGroupId}
              setPrvGroupId={setPrvGroupId}
            />
          )}
        </View>
      );
    });

  return <View>{Candidates}</View>;
};

export default CandidateCardContainer;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    // flex: 1,
    // minHeight: '100%',
    // maxHeight: '100%',
    // overflow: 'visible',
  },
});

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from '#components';

import ChapterCard from '../chapter-card/ChapterCard';
import CandidateCardContainer from '../candidate/CandidateCardContainer';

import { useStoreState } from 'easy-peasy';
import {
  selectCurrentCategoryIdx,
  selectCurrentCandidateNextIdx,
  selectIsCategorySelected,
} from '#store/selectors';

import { useFetchChapterData } from './useFetchChapterData';
import { useUpdateLastCandidateIdx } from './useUpdateLastCandidateIdx';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ChapterCardContainer = ({ chapterIdx, categoryData, categoryTitle }) => {
  const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  const currentCandidateNextIdx = useStoreState(selectCurrentCandidateNextIdx);
  const isCategorySelected = useStoreState(selectIsCategorySelected);

  useFetchChapterData();
  useUpdateLastCandidateIdx(chapterIdx);

  if (!isCategorySelected) return null;

  // 현재 카테고리에 맞는 챕터인지 확인
  if (currentCategoryIdx !== Math.max(0, categoryData.categoryId - 5))
    return null;

  const FirstCard = (
    <ChapterCard
      chapterIdx={chapterIdx}
      data={categoryData}
      categoryTitle={categoryTitle}
    />
  );

  return (
    <View style={s.root}>
      {FirstCard}
      <CandidateCardContainer
        chapterIdx={chapterIdx}
        categoryTitle={categoryTitle}
      />
    </View>
  );
};

export default ChapterCardContainer;

const s = StyleSheet.create({
  root: {
    // alignItems: 'flex-start',
    // flex: 1,
    // width: '100%',
    // maxWidth: '100%',
  },
});

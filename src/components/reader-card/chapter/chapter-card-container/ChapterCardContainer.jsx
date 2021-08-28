import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from '#components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import ChapterCard from '../chapter-card/ChapterCard';
import CandidateCardContainer from '../candidate/CandidateCardContainer';

import { useStoreState } from 'easy-peasy';
import {
  selectCurrentCategoryIdx,
  selectCurrentChapterIdx,
  selectIsCategorySelected,
} from '#store/selectors';

import { useFetchChapterData } from './useFetchChapterData';
import { useUpdateLastCandidateIdx } from './useUpdateLastCandidateIdx';

const ChapterCardContainer = ({ chapterIdx, categoryData, categoryTitle }) => {
  const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  const currentChapterIdx = useStoreState(selectCurrentChapterIdx);
  const isCategorySelected = useStoreState(selectIsCategorySelected);

  useFetchChapterData();
  useUpdateLastCandidateIdx(chapterIdx);

  if (!isCategorySelected) return null;

  // 현재 카테고리에 맞는 챕터인지 확인
  if (currentCategoryIdx !== Math.max(0, categoryData.categoryId - 5))
    return null;

  console.log(
    'current chapter idx ',
    currentChapterIdx,
    ', chapter idx: ',
    chapterIdx,
  );

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
      {/* {currentChapterIdx - 1 === chapterIdx && (
        <CandidateCardContainer
          chapterIdx={chapterIdx}
          categoryTitle={categoryTitle}
        />
      )} */}
    </View>
  );
};

export default ChapterCardContainer;

const s = StyleSheet.create({
  root: {
    alignItems: 'flex-start',
    flex: 1,
    width: wp('100%'),
    maxWidth: wp('100%'),
  },
});

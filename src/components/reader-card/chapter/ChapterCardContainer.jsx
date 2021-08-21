import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from '#components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import ChapterCard from './ChapterCard';

import { useStoreState } from 'easy-peasy';
import {
  selectCurrentCategoryIdx,
  selectIsCategorySelected,
} from '#store/selectors';

import { useChapterData } from '../../../contexts/chapterDataContext';

import { useFetchChapterData } from './useFetchChapterData';
import { useUpdateLastCandidateIdx } from './useUpdateLastCandidateIdx';
import { useOpenWriteCard } from './useOpenWriteCard';

const ChapterCardContainer = ({ chapterIdx, categoryData, categoryTitle }) => {
  const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  const isCategorySelected = useStoreState(selectIsCategorySelected);
  const [chapterData] = useChapterData();

  useFetchChapterData();
  useUpdateLastCandidateIdx(chapterIdx);
  useOpenWriteCard(categoryTitle, chapterIdx);

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

  const Candidates = chapterData.item?.map((candidateChapterData, i) => (
    <ChapterCard
      key={candidateChapterData.id}
      chapterIdx={chapterIdx}
      data={candidateChapterData}
      candidateIdx={i}
      categoryTitle={categoryTitle}
    />
  ));
  // 현재 후보 챕터가 선택한 카테고리랑 맞는 것만 렌더
  // if (
  //   currentCategoryIdx !== Math.max(0, candidateChapterData.categoryId - 5)
  // ) {
  //   return null;
  // }

  return (
    <View style={s.root}>
      {FirstCard}
      {Candidates}
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

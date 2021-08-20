import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from '#components';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import { useNavigation } from '@react-navigation/native';
// import * as ScreenNames from '../../navigators/ScreenNames';

import ChapterCard from './ChapterCard';
// import WriteChapterCard from './WriteChapterCard';

import { useStoreState } from 'easy-peasy';
import {
  selectCurrentCategoryIdx,
  selectIsCategorySelected,
} from '#store/selectors';

import { useChapterData } from '../../../contexts/chapterDataContext';

import { useFetchChapterData } from './useFetchChapterData';
import { useUpdateLastCandidateIdx } from './useUpdateLastCandidateIdx';
import { useOpenWriteCard } from './useOpenWriteCard';

const ChapterCardContainer = ({
  chapterIdx,
  categoryData,
  categoryTitle,
  // isVisibleFromCategory,
}) => {
  const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  const isCategorySelected = useStoreState(selectIsCategorySelected);
  const chapterData = useChapterData();

  useFetchChapterData();
  useUpdateLastCandidateIdx(chapterIdx);
  useOpenWriteCard(categoryTitle, chapterIdx);

  if (!isCategorySelected) {
    return null;
  }

  // 현재 카테고리와 보고있는 카드의 카테고리가 같아야 함
  const isRenderingCardSameCategory =
    currentCategoryIdx === Math.max(0, categoryData.categoryId - 5);

  return (
    <View style={s.root}>
      {/* 챕터 카드 먼저 렌더 */}
      {isRenderingCardSameCategory && (
        <ChapterCard
          chapterIdx={chapterIdx}
          data={categoryData}
          categoryTitle={categoryTitle}
          // isVisibleFromCategory={isVisibleFromCategory}
        />
      )}

      {/* 후보 챕터 카드들 렌더 */}
      {isRenderingCardSameCategory &&
        chapterData.item?.map((candidateChapterData, i) => {
          // 현재 후보 챕터가 선택한 카테고리랑 맞는 것만 렌더
          if (
            currentCategoryIdx !==
            Math.max(0, candidateChapterData.categoryId - 5)
          ) {
            return null;
          }

          return (
            <ChapterCard
              key={candidateChapterData.id}
              chapterIdx={chapterIdx}
              data={candidateChapterData}
              candidateIdx={i}
              categoryTitle={categoryTitle}
            />
          );
        })}
    </View>
  );
};

export default ChapterCardContainer;

const s = StyleSheet.create({
  root: {
    // flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    width: wp('100%'),
    maxWidth: wp('100%'),
    // overflow: 'visible',
    // height: '100%',
  },
});

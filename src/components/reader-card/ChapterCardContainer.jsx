import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StyleSheet, Text } from '#components';

import ChapterCard from './ChapterCard';
import WriteChapterCard from './WriteChapterCard';

// import { useGetSWR } from '#hooks';

import { useStoreActions, useStoreState } from 'easy-peasy';
import {
  selectCurrentCategoryIdx,
  selectCurrentChapterIdx,
  selectIsCategorySelected,
  selectUserId,
} from '#store/selectors';
import { actionsSetLastCandidateIdx } from '#store/actions';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ChapterService } from '#services';
import {
  useChapterData,
  useSetChapterData,
  useIsLikeUpdated,
  useIsNewCandidateWritten,
} from '../../contexts/chapterDataContext';

const ChapterCardContainer = ({
  chapterIdx,
  categoryData,
  categoryTitle,
  isVisibleFromCategory,
}) => {
  const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  const currentChapterIdx = useStoreState(selectCurrentChapterIdx);
  const isCategorySelected = useStoreState(selectIsCategorySelected);
  const setLastCandidateIdx = useStoreActions(actionsSetLastCandidateIdx);
  const userId = useStoreState(selectUserId);

  const chapterOrder = chapterIdx + 1;

  const chapterData = useChapterData();
  const setChapterData = useSetChapterData();
  const isLikeUpdated = useIsLikeUpdated();
  const isNewCandidateWritten = useIsNewCandidateWritten();

  useEffect(() => {
    (async function () {
      const { data } = await ChapterService.GET_getChapter(chapterIdx, userId);

      // console.log(data);
      // console.log(data.item.filter(i => i.isLike === 1).length === 1);

      if (data) {
        setChapterData(data);
      }
    })();
  }, [userId, isLikeUpdated, isNewCandidateWritten]);

  useEffect(() => {
    if (!chapterData || !isCategorySelected) {
      return;
    }

    // 현재 렌더하는 챕터가 보고있는 챕터와 동일 할 때,
    // 챕터 최소, 최대 재 설정
    if (currentChapterIdx === chapterOrder) {
      // 현재 get Chapter 의 결과를 filter
      // 카테고리 id 가 현재 선택한 카테고리의 idx 와 같아야 렌더
      const maxLength =
        chapterData?.item.filter(
          chapter => chapter.categoryId - 5 === currentCategoryIdx,
        )?.length + 1;

      console.log(
        `[${chapterIdx}:${currentCategoryIdx}] ${maxLength} / ${chapterData.item.length}`,
      );

      setLastCandidateIdx(maxLength);
    }
  });

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
          isVisibleFromCategory={isVisibleFromCategory}
        />
      )}

      {/* 후보 챕터 카드들 렌더 */}
      {chapterData.item?.map((candidateChapterData, i) => {
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

      {/* 마지막 카드는 항상 유저가 쓰는 카드 */}
      {isRenderingCardSameCategory && (
        <WriteChapterCard
          categoryTitle={categoryTitle}
          chapterIdx={chapterIdx}
        />
      )}
    </View>
  );
};

export default ChapterCardContainer;

const s = StyleSheet.create({
  root: {
    // flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'flex-start',
    // flex: 1,
    minWidth: wp('100%'),
    maxWidth: wp('100%'),

    // height: '100%',
  },
});

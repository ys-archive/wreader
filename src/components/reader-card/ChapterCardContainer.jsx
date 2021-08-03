import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StyleSheet, Text } from '#components';

// import WriteChapterCard from './WriteChapterCard';
import ChapterCard from './ChapterCard';

import { useGetSWR } from '#hooks';

import { useStoreActions, useStoreState } from 'easy-peasy';
import {
  selectCurrentCategoryIdx,
  selectCurrentChapterIdx,
  selectIsCategorySelected,
} from '#store/selectors';
import { actionsSetLastCandidateIdx } from '#store/actions';

const ChapterCardContainer = ({
  chapterOrder,
  categoryData,
  categoryTitle,
}) => {
  const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  const currentChapterIdx = useStoreState(selectCurrentChapterIdx);
  const isCategorySelected = useStoreState(selectIsCategorySelected);
  const setLastCandidateIdx = useStoreActions(actionsSetLastCandidateIdx);

  const {
    data: chapterData,
    isLoading,
    error,
  } = useGetSWR(`chapter/${chapterOrder}`);

  useEffect(() => {
    if (!chapterData) {
      return;
    }

    // 현재 렌더하는 챕터가 보고있는 챕터와 동일 할 때,
    // 챕터 최소, 최대 재 설정
    if (currentChapterIdx === chapterOrder) {
      // 현재 get Chapter 의 결과를 filter
      // 카테고리 id 가 현재 선택한 카테고리의 idx 와 같아야 렌더
      const maxLength = chapterData?.item.filter(
        chapter => chapter.categoryId - 5 === currentCategoryIdx,
      )?.length;
      console.log(
        `[${chapterOrder}:${currentCategoryIdx}] ${maxLength} / ${chapterData.item.length}`,
      );

      setLastCandidateIdx(maxLength);
    }
  });

  if (error) {
    return (
      <View>
        <Text>로드 중 에러!</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 현재 카테고리와 보고있는 카드의 카테고리가 같아야 함
  const isRenderingCardSameCategory =
    currentCategoryIdx === Math.max(0, categoryData.categoryId - 5);

  return (
    <View style={s.root}>
      {/* 챕터 카드 먼저 렌더 */}
      {isRenderingCardSameCategory && (
        <ChapterCard
          chapterOrder={chapterOrder}
          chapterData={categoryData}
          categoryTitle={categoryTitle}
        />
      )}

      {/* 후보 챕터 카드들 렌더 */}
      {isCategorySelected && (
        <View>
          {chapterData.item?.map(candidateChapterData => {
            if (!isRenderingCardSameCategory) {
              return null;
            }

            return (
              <ChapterCard
                key={candidateChapterData.id}
                chapterOrder={chapterOrder}
                chapterData={candidateChapterData}
                categoryTitle={categoryTitle}
              />
            );
          })}
        </View>
      )}

      {/* 마지막 카드는 항상 유저가 쓰는 카드 */}
      {/* <WriteChapterCard /> */}
    </View>
  );
};

export default ChapterCardContainer;

const s = StyleSheet.create({
  root: {
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    // flex: 1,
    width: '100%',
    // height: '100%',
  },
});

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
  currentCategoryId,
  chapterOrder,
  categoryData,
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

    if (currentChapterIdx === chapterOrder) {
      const maxLength = chapterData.item.filter(chapter => {
        return chapter.categoryId - 5 === currentCategoryIdx;
      }).length;
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

  return (
    <View style={s.root}>
      {/* 먼저 챕터 카드 렌더 */}
      {/*  */}

      {currentCategoryIdx === categoryData.categoryId - 5 && (
        <ChapterCard chapterOrder={chapterOrder} data={categoryData} />
      )}

      {/* 현재 챕터의 후보 챕터 카드들 렌더 */}
      {isCategorySelected && (
        <View>
          {chapterData.item.map(candidate => {
            // if (currentChapterIdx !== candidate.group_index) {
            //   return null;
            // }

            if (Math.max(0, candidate.categoryId - 5) !== currentCategoryIdx) {
              return null;
            }

            return (
              <ChapterCard
                key={candidate.id}
                chapterOrder={chapterOrder}
                data={candidate}
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

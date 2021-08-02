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

// chapter example
//   {
//     "id": "43", -> 조회용으로 사용
//     "categoryId": 5, -> prop categoryId 와 비교해서 렌더 결정
//     "userId": 5, -> reply 용으로 사용
//     "updateDt": "2021-07-30 14:45:29",
//     "content": "hi3", -> render
//     "replyCount": 0, -> reply render
//     "like_count": 0, -> like count render
//     "group_index": 0, -> chaining id
//     "userImg": "https://imagePath.com/changed", -> author uri
//     "userNick": "", -> author render
//     "chapterImg": "" -> chapter uri
// }

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
      setLastCandidateIdx(maxLength);
    }

    // if (currentCategoryIdx === chapterOrder - 1) {
    //   // console.log('후보 갯수: ', chapterData.item.length);

    //   // setLastCandidateIdx(chapterData.item.length - 1);
    // }
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
      <ChapterCard
        currentCategoryId={currentCategoryId}
        chapterOrder={chapterOrder}
        data={categoryData}
      />

      {/* 후보 챕터 카드 모두 렌더 */}
      {isCategorySelected && (
        <View>
          {chapterData.item.map((candidate, idx) => {
            // if (currentChapterIdx !== candidate.group_index) {
            //   return null;
            // }

            // if (Math.max(0, candidate.categoryId - 5) !== currentCategoryIdx) {
            //   // console.log('후보 챕터 없음!');
            //   return null;
            // }

            return (
              <ChapterCard
                key={candidate.id}
                currentCategoryId={currentCategoryId}
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
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // flex: 1
    // width: '100%',
    // height: '100%',
  },
});

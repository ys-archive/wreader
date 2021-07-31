import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StyleSheet, Text } from '#components';

import { ChapterService } from '#services';
import WriteChapterCard from './WriteChapterCard';
import sharedStyle from './ShareCardStyle';

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

const ChapterCardContainer = ({ currentCategoryId, chapterOrder, data }) => {
  const {
    item: candidates,
    isLoading,
    error,
  } = ChapterService.useGet_getChapter(chapterOrder);

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

  if (!candidates || !candidates.length) {
    return null;
  }

  return (
    <View style={sharedStyle.root}>
      {/* 먼저 챕터 카드 렌더 */}
      <ChapterCard
        currentCategoryId={currentCategoryId}
        chapterOrder={chapterOrder}
        data={data}
      />
      {/* 후보 챕터 카드 모두 렌더 */}
      {candidates.map((candidate, idx) => {
        if (chapterIdx + 1 !== candidate.group_index) {
          return;
        }

        return (
          <ChapterCard
            currentCategoryId={currentCategoryId}
            chapterOrder={idx}
            data={candidate}
          />
        );
      })}
      {/* 마지막 카드는 항상 유저가 쓰는 카드 */}
      <WriteChapterCard />
    </View>
  );
};

export default ChapterCardContainer;

const styles = StyleSheet.create({});

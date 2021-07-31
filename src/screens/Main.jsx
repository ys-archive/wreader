import React, { useEffect } from 'react';

import { View, ActivityIndicator } from 'react-native';
import { StyleSheet, Text } from '#components';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

import { useStoreActions, useStoreState } from 'easy-peasy';
import {
  actionsSetLastCategoryIdx,
  actionsSetLastChapterIdx,
  actionsLockMovingChapter,
} from '#store/actions';
import {
  selectCurrentCategoryIdx,
  selectCurrentChapterIdx,
} from '#store/selectors';

import EventModal from '#components/modals/EventModal';

import { useGetSWR } from '#hooks';
import CategoryCardContainer from '#components/reader-card/CategoryCardContainer';

import Reader from './reader/Reader';

const Main = () => {
  const setLastCategoryIdx = useStoreActions(actionsSetLastCategoryIdx);
  const setLastChapterIdx = useStoreActions(actionsSetLastChapterIdx);
  const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  // const currentChapterIdx = useStoreState(selectCurrentChapterIdx);

  const lockMovingChapter = useStoreActions(actionsLockMovingChapter);

  const { data, isLoading, error } = useGetSWR(`category`);

  useEffect(() => {
    if (!data) return;
    
    const totalCategoryCount = data.item.length;
    const totalChapterCount = data.item[currentCategoryIdx].chapter.length;
    // console.log('총 카테고리 개수: ', totalCategoryCount);
    // console.log('현재 카테고리 인덱스: ', currentCategoryIdx);
    // console.log('현재 챕터 인덱스: ', currentChapterIdx);
    // console.log('현재 카테고리의 총 챕터 개수: ', totalChapterCount);
    // console.log(
    //   '------------------------------------------------------------------------',
    // );

    lockMovingChapter(totalChapterCount <= 0);

    setLastCategoryIdx(totalCategoryCount);
    setLastChapterIdx(totalChapterCount);
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

  if (!data || !data.item) {
    return (
      <View>
        <Text>get category 의 데이터가 없습니다!</Text>
      </View>
    );
  }

  return (
    <View style={s.root}>
      {/* <EventModal /> */}
      <Reader data={data}>
        <CategoryCardContainer rootData={data.item} />
        {/* <View style={s.cardView}>
        </View> */}
      </Reader>
    </View>
  );
};

export default Main;

const s = StyleSheet.create({
  root: {
    // flex: 1,
    // alignItems: 'flex-start',
  },
  cardView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

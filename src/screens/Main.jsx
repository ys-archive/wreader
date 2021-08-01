import React, { useEffect } from 'react';

import { View, ActivityIndicator, Image, ScrollView } from 'react-native';
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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import EventModal from '#components/modals/EventModal';

import { useGetSWR } from '#hooks';
import CategoryCardContainer from '#components/reader-card/CategoryCardContainer';

import Reader from './reader/Reader';

import { getLogo, getSortIcons } from '#constants/images';

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
      <Image
        style={{
          width: 107.4,
          height: 28.8,
          position: 'absolute',
          left: wp('8.3%'),
          top: hp('3.6%'),
          zIndex: 1000,
        }}
        source={getLogo()}
      />
      <Image
        style={{
          width: 24.7,
          height: 15,
          position: 'absolute',
          right: wp('7%'),
          top: hp('4.7%'),
          zIndex: 1000,
        }}
        source={getSortIcons()}
      />
      <ScrollView scrollEnabled={false}>
        {/* <EventModal /> */}
        <Reader>
          <CategoryCardContainer rootData={data.item} />
        </Reader>
      </ScrollView>
    </View>
  );
};

export default Main;

const s = StyleSheet.create({
  root: {
    width: wp('100%'),
    height: hp('100%'),
  },
  cardView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  logo: {
    width: wp('10%'),
    height: hp('10%'),
    // position: 'absolute',
    // left: 0,
    // top: 0,
  },
});

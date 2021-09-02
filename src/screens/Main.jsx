import React, { useEffect } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { StyleSheet, Text } from '#components';
import { useNavigation } from '@react-navigation/native';

import { useStoreActions, useStoreState } from 'easy-peasy';
import {
  actionsSetLastCategoryIdx,
  actionsSetLastChapterIdx,
  actionsLockMovingChapter,
} from '#store/actions';
import { selectCurrentCategoryIdx } from '#store/selectors';

import { useGetSWR, useAutoLogin } from '../hooks';

import EventModal from '#components/modals/EventModal';
import CategoryCardContainer from '../components/reader-card/category/CategoryCardContainer';
import Reader from './reader/Reader';

import { Logo, Sort, Menu } from '#components/icon';
import { useCardsFetch } from '../hooks/useCardsFetch';

import { selData } from '../store/selectors';
import { actData } from '../store/actions';

const getStates = () => {
  const categories = useStoreState(selData.selCategories);
  const chapters = useStoreState(selData.selChapters);

  return {
    categories,
    chapters,
  };
};

const Main = () => {
  const nav = useNavigation();

  const { categories, chapters } = getStates();

  // console.log(`categories ----> ${categories}`);
  // console.log(`chapters ----> ${chapters}`);

  // const setLastCategoryIdx = useStoreActions(actionsSetLastCategoryIdx);
  // const setLastChapterIdx = useStoreActions(actionsSetLastChapterIdx);
  // const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);

  // const lockMovingChapter = useStoreActions(actionsLockMovingChapter);

  // const { data: rootData, isLoading, error } = useGetSWR(`category`);

  // useAutoLogin();

  // useEffect(() => {
  //   // 카테고리 데이터 없으면 갱신 X
  //   if (!rootData) {
  //     return;
  //   }

  //   // 현재 총 카테고리 갯수
  //   const totalCategoryCount = rootData.item.length;
  //   // 현재 카테고리의 총 챕터 갯수
  //   const totalChapterCount = rootData.item[currentCategoryIdx].chapter.length;

  //   // 현재 챕터가 0 개이면 종 방향 이동 잠금
  //   lockMovingChapter(totalChapterCount <= 0);

  //   // 마지막 카테고리 & 챕터 갯수 갱신
  //   setLastCategoryIdx(totalCategoryCount);
  //   setLastChapterIdx(totalChapterCount);
  // }, [currentCategoryIdx, rootData]);

  useCardsFetch();

  const onPressSortIcon = () => {
    console.log('정렬 아이콘');
    // TODO: 후보 챕터들을 조회수 별로 정렬
  };

  const onPressMenuIcon = () => {
    nav.openDrawer();
  };

  // if (error) {
  //   return (
  //     <View>
  //       <Text>로드 중 에러!</Text>
  //     </View>
  //   );
  // }

  // if (isLoading) {
  //   return (
  //     <View>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  // if (!rootData || !rootData.item) {
  //   return (
  //     <View>
  //       <Text>get category 의 데이터가 없습니다!</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={s.root}>
      <Logo />
      <Sort onPress={onPressSortIcon} />
      <Menu onPress={onPressMenuIcon} />
      {/* <EventModal /> */}
      {/* <Reader> */}
      {/* <CategoryCardContainer rootData={rootData.item} /> */}
      {/* </Reader> */}
      {/* <ScrollView scrollEnabled={false}> */}
      {/* </ScrollView> */}
    </View>
  );
};

export default Main;

const s = StyleSheet.create({
  root: {
    // justifyContent: 'flex-start',
    // flex: 1,
    // overflow: 'visible',
  },
});

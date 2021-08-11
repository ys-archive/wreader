import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { StyleSheet, Text } from '#components';

import CategoryCard from './CategoryCard';
import ChapterCardContainer from './ChapterCardContainer';

import { useStoreState } from 'easy-peasy';
import { selectCurrentChapterIdx } from '#store/selectors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const useForceUpdate = () => useState()[1];

const renderChaptersJSX = (
  chapters,
  categoryTitle,
  forceUpdate,
  isVisibleFromCategory,
) => {
  // 현재 카테고리의 챕터가 없으면 렌더 X
  if (!chapters || !chapters.length) {
    return null;
  }

  return chapters.map((chapter, order) => (
    <View
      key={chapter.id}
      onPress={forceUpdate}
      // style={{ flex: 1, minWidth: SCREEN_WIDTH }}
    >
      <ChapterCardContainer
        chapterIdx={order} // 0 -> category 이므로 1 부터 시작
        categoryData={chapter}
        categoryTitle={categoryTitle || ''}
        isVisibleFromCategory={isVisibleFromCategory}
      />
    </View>
  ));
};

const CategoryCardContainer = ({ rootData }) => {
  const forceUpdate = useForceUpdate();

  const currentChapterIdx = useStoreState(selectCurrentChapterIdx);
  const isVisibleFromCategory = currentChapterIdx === 0;
  // console.log('isVisible from category? ', isVisibleFromCategory);
  if (isVisibleFromCategory) {
    console.log('Visible From Category: ', currentChapterIdx);
  }
  // 현재 카테고리 정보가 없으면 렌더 X
  if (!rootData || !rootData.length) {
    return null;
  }

  const CategoryCards = rootData.map((category, i) => (
    // 현재 카테고리와 이하의 모든 챕터들 은 종 방향 렌더
    <View key={category.id} style={s.root}>
      <CategoryCard category={category} categoryIdx={i} />
      {renderChaptersJSX(
        category.chapter,
        category.title,
        forceUpdate,
        isVisibleFromCategory,
      )}
    </View>
  ));

  return (
    <>
      {CategoryCards}
      <View style={s.copyright}>
        <Text>{'\u00A9'}&nbsp;</Text>
        <Text>2021 W.READER. ALL rights reserved.</Text>
      </View>
    </>
  );
};

export default CategoryCardContainer;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // flex: 1,
    // minHeight: SCREEN_HEIGHT,
    // maxHeight: SCREEN_HEIGHT,
    // minWidth: SCREEN_WIDTH,
    // maxWidth: SCREEN_WIDTH,
  },
  copyright: {
    flexDirection: 'row',
    position: 'absolute',
    left: '20%',
    bottom: '0.7%',
  },
});

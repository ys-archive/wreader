import React from 'react';
import { View, Dimensions } from 'react-native';
import { StyleSheet, Text } from '#components';

import CategoryCard from './CategoryCard';
import ChapterCardContainer from '../chapter/chapter-card-container/ChapterCardContainer';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const renderChapters = (chapters, categoryTitle) => {
  // 현재 카테고리의 챕터가 없으면 렌더 X
  if (!chapters || !chapters.length) return null;

  return chapters.map((chapter, order) => (
    <View key={chapter.id}>
      <ChapterCardContainer
        chapterIdx={order}
        categoryData={chapter}
        categoryTitle={categoryTitle}
      />
    </View>
  ));
};

const CategoryCardContainer = ({ rootData }) => {
  // 현재 카테고리 정보가 없으면 렌더 X
  if (!rootData || !rootData.length) {
    return null;
  }

  const CategoryCards = rootData.map((category, i) => (
    // 현재 카테고리와 이하의 모든 챕터들 은 종 방향 렌더
    <View key={category.id} style={s.root}>
      <CategoryCard category={category} categoryIdx={i} />
      {renderChapters(category.chapter, category.title)}
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
    flex: 1,
    minHeight: SCREEN_HEIGHT,
    maxHeight: SCREEN_HEIGHT,
    // ...Platform.select({
    //   ios: {
    //     minWidth: SCREEN_WIDTH,
    //     maxWidth: SCREEN_WIDTH,
    //   },
    //   android: {},
    // }),
  },
  copyright: {
    flexDirection: 'row',
    position: 'absolute',
    left: '20%',
    bottom: '0.7%',
  },
});

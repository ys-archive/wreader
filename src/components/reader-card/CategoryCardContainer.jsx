import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from '#components';

import CategoryCard from './CategoryCard';
import ChapterCardContainer from './ChapterCardContainer';

const renderChaptersJSX = (chapters, categoryTitle) => {
  // 현재 카테고리의 챕터가 없으면 렌더 X
  if (!chapters || !chapters.length) {
    return null;
  }

  return chapters.map((chapter, order) => (
    <ChapterCardContainer
      key={chapter.id}
      chapterOrder={order + 1} // 0 -> category 이므로 1 부터 시작
      categoryData={chapter}
      categoryTitle={categoryTitle || ''}
    />
  ));
};

const CategoryCardContainer = ({ rootData }) => {
  // 현재 카테고리 정보가 없으면 렌더 X
  if (!rootData || !rootData.length) {
    return null;
  }

  return rootData.map(category => (
    // 현재 카테고리와 이하의 모든 챕터들 은 종 방향 렌더
    <View key={category.id} style={s.root}>
      <CategoryCard {...category} />
      {renderChaptersJSX(category.chapter, category.title)}
    </View>
  ));
};

export default CategoryCardContainer;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flex: 1,
  },
});

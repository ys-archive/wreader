import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from '#components';

import CategoryCard from './CategoryCard';
import ChapterCardContainer from './ChapterCardContainer';

const CategoryCardContainer = ({ rootData }) => {
  if (!rootData || !rootData.length) {
    return null;
  }

  const renderChaptersJSX = (chapters, currentCategoryId) => {
    if (!chapters || !chapters.length) {
      return null;
    }

    return chapters.map((chapter, order) => (
      <ChapterCardContainer
        key={chapter.id}
        currentCategoryId={currentCategoryId}
        chapterOrder={order + 1} // 0 -> category 이므로 1 부터 시작
        categoryData={chapter}
      />
    ));
  };

  const JSX = rootData.map(category => {
    return (
      <View key={category.id} style={s.root}>
        <CategoryCard {...category} />
        {renderChaptersJSX(category.chapter, category.id)}
      </View>
    );
  });

  return JSX;
};

export default CategoryCardContainer;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
});

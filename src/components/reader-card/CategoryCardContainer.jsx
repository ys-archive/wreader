import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from '#components';

import CategoryCard from './CategoryCard';
import ChapterCardContainer from './ChapterCardContainer';

const useForceUpdate = () => useState()[1];

const renderChaptersJSX = (chapters, categoryTitle, forceUpdate) => {
  // 현재 카테고리의 챕터가 없으면 렌더 X
  if (!chapters || !chapters.length) {
    return null;
  }

  return chapters.map((chapter, order) => (
    <View key={chapter.id} onPress={forceUpdate}>
      <ChapterCardContainer
        chapterOrder={order + 1} // 0 -> category 이므로 1 부터 시작
        categoryData={chapter}
        categoryTitle={categoryTitle || ''}
      />
    </View>
  ));
};

const CategoryCardContainer = ({ rootData }) => {
  const forceUpdate = useForceUpdate();
  // 현재 카테고리 정보가 없으면 렌더 X
  if (!rootData || !rootData.length) {
    return null;
  }

  const CategoryCards = rootData.map(category => (
    // 현재 카테고리와 이하의 모든 챕터들 은 종 방향 렌더
    <View key={category.id} style={s.root}>
      <CategoryCard {...category} />
      {renderChaptersJSX(category.chapter, category.title, forceUpdate)}
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
    // flex: 1,
  },
  copyright: {
    flexDirection: 'row',
    position: 'absolute',
    left: '20%',
    bottom: '0.7%',
  },
});

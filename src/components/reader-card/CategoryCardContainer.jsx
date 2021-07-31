import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from '#components';

import CategoryCard from './CategoryCard';
import ChapterCardContainer from './ChapterCardContainer';

// rootCategory example
// {
//   "id": 6, -> GetChapter 순차적으로, categoryId 와 비교
//   "title": "CRIME", -> render
//   "subTitle": "Criminal Story\nmissing, murder...", -> render
//   "chapterLimit": 10,
//   "maxLength": 500,
//   "img": null, -> render as a uri
//   "chapter": [] -> referenced by next chapters
// }

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
        key={chapters.id}
        currentCategoryId={currentCategoryId}
        chapterOrder={order + 1} // 0 -> category 이므로 1 부터 시작
        data={chapter}
      />
    ));
  };

  const JSX = rootData.map(category => (
    <View style={s.root}>
      <CategoryCard {...category} />
      {renderChaptersJSX(category.chapters, category.id)}
    </View>
  ));

  return JSX;
};

export default CategoryCardContainer;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
});

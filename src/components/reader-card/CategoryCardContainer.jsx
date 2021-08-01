import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from '#components';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CategoryCard from './CategoryCard';
import ChapterCardContainer from './ChapterCardContainer';

import { useStoreActions, useStoreState } from 'easy-peasy';
import {
  selectHasCandidateChapter,
  selectCurrentCategoryIdx,
  selectCurrentChapterIdx,
} from '#store/selectors';
import { actionsSetHasCandidateChapter } from '#store/actions';

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
        key={chapter.id}
        currentCategoryId={currentCategoryId}
        chapterOrder={order + 1} // 0 -> category 이므로 1 부터 시작
        categoryData={chapter}
      />
    ));
  };

  const JSX = rootData.map(category => {
    return (
      <View key={category.id} style={s.categoryRoot}>
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
    // flex: 1,
  },
  categoryRoot: {
    // width: wp('100%'),
    // height: '100%',
    flexDirection: 'row',

    // flex: 1,
    justifyContent: 'flex-start',

    // flex: 1,
    // alignItems: 'center',
  },
});

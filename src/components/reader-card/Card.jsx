import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text, StyleSheet, LocalImage } from '#components';
import { FontAwesome } from 'react-native-vector-icons';

import CategoryCard from './CategoryCard';
import ChapterCard from './ChapterCard';

import { useStoreState } from 'easy-peasy';
import { selectCurrentChapterIdx, selectIsLastChapter } from '#store/selectors';

// TODO: change image uri -> fetched (received from the api)
// const image = require('../../../assets/images/dummy-image.jpg');

const Card = props => {
  const { isCategory, chapterLimit } = props;
  const isLastChapter = useStoreState(selectIsLastChapter);

  if (isCategory) {
    return <CategoryCard {...props} />;
  } 

  if (isLastChapter) {
    return <WriteChapterCard {...props} />;
  } else {
    return <ChapterCard {...props} />;
  }
};

export default Card;

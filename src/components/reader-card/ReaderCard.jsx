import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text, StyleSheet, LocalImage } from '#components';
import { FontAwesome } from 'react-native-vector-icons';

import ReaderCategoryCard from './ReaderCategoryCard';
import ReaderChapterCard from './ReaderChapterCard';

import { useStoreState } from 'easy-peasy';
import { selectCurrentChapterIdx, selectIsLastChapter } from '#store/selectors';

// TODO: change image uri -> fetched (received from the api)
const image = require('../../../assets/images/dummy-image.jpg');

const ReaderCard = props => {
  const { isCategory, chapterLimit } = props;
  const isLastChapter = useStoreState(selectIsLastChapter);

  if (isCategory) {
    return <ReaderCategoryCard {...props} />;
  } else {
    if (isLastChapter) {
      return null;
    } else {
      return <ReaderChapterCard {...props} />;
    }
  }
};

export default ReaderCard;

import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Text, StyleSheet } from '#components';
import { colors, StyleDefine } from '#constants';

import { useStoreState } from 'easy-peasy';
import { selSwiper } from '#store/selectors';

import { DEPTH_NAME } from '../../../../store/reducers/swiper.depth';

export const useChapterCard_Labels = order => {
  const depth = useStoreState(selSwiper.depth);
  const maxCoords = useStoreState(selSwiper.maxCoords);

  const TheEndLabelJSX = depth === DEPTH_NAME.CHAPTER &&
    order + 1 === maxCoords.d1 && (
      <Text isBold style={s.theEnd}>
        THE END
      </Text>
    );

  const PreviousJSX = depth === DEPTH_NAME.CHAPTER &&
    order !== 0 &&
    order + 1 <= maxCoords.d1 && (
      <Text isBold style={s.previous}>
        <Icon name="left" size={18} />
        PREVIOUS
      </Text>
    );

  const NextJSX = depth === DEPTH_NAME.CHAPTER && order + 1 < maxCoords.d1 && (
    <Text isBold style={s.next}>
      NEXT
      <Icon name="right" size={18} />
    </Text>
  );

  const FullStoryJSX = depth === DEPTH_NAME.CHAPTER &&
    order + 1 === maxCoords.d1 && (
      <Text isBold style={s.fullStory}>
        FULL&nbsp;STORY
        <Icon name="right" size={18} />
      </Text>
    );

  return {
    TheEndLabelJSX,
    PreviousJSX,
    NextJSX,
    FullStoryJSX,
  };
};

const s = StyleSheet.create({
  theEnd: {
    fontSize: Platform.OS === 'android' ? 18 : 16,
    color: colors.light.ivory3,

    position: 'absolute',
    top: '2%',
    right: '4%',
  },
  previous: {
    fontSize: Platform.OS === 'android' ? 20 : 18,
    color: colors.light.ivory3,

    position: 'absolute',
    bottom: '15%',
    left: Platform.OS === 'android' ? '5%' : '2%',
  },
  next: {
    fontSize: Platform.OS === 'android' ? 20 : 18,
    color: colors.light.ivory3,

    position: 'absolute',
    bottom: '15%',
    right: Platform.OS === 'android' ? '5%' : '2%',
  },
  fullStory: {
    fontSize: Platform.OS === 'android' ? 20 : 18,
    color: colors.light.ivory3,

    position: 'absolute',
    bottom: '15%',
    right: Platform.OS === 'android' ? '5%' : '2%',
  },
});

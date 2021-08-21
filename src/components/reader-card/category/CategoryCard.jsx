import React from 'react';
import { View, ImageBackground } from 'react-native';
import { StyleSheet, Text } from '#components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '#constants';
import { makeCategoryBGImagePath } from '#constants/images';

import { useStoreState } from 'easy-peasy';
import {
  selectCurrentCategoryIdx,
  selectIsFirstCandidate,
  selectCurrentChapterIdx,
} from '#store/selectors';
import { useCategoryCardExposer_Category } from './useCategoryCardExposer_Category';

const CategoryCard = ({ category, categoryIdx }) => {
  const { title, subTitle, imageUri } = category;

  const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  const isFirstCandidate = useStoreState(selectIsFirstCandidate);
  const currentChapterIdx = useStoreState(selectCurrentChapterIdx);

  const { predicatedPosition, predicatedScale } =
    useCategoryCardExposer_Category(
      currentCategoryIdx + 1 === categoryIdx,
      currentCategoryIdx - 1 === categoryIdx,
      isFirstCandidate && currentChapterIdx === 1,
    );

  return (
    <View style={s.root}>
      <ImageBackground
        style={[
          {
            width: wp('83.4%'),
            height: hp('78.2%'),
            borderRadius: 20,
            overflow: 'hidden',
          },
          predicatedPosition,
          predicatedScale,
        ]}
        source={makeCategoryBGImagePath(title)}
        // source={{ uri: bgImgUri }}
        resizeMode="cover"
      >
        <View style={s.cardTitleView}>
          <Text isBold style={s.title}>
            {title}
          </Text>
        </View>

        <View style={s.cardSubTitleView}>
          <Text style={s.subTitle}>{subTitle}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CategoryCard;

const s = StyleSheet.create({
  root: {
    minWidth: wp('100%'),
    minHeight: hp('100%'),
    maxWidth: wp('100%'),
    maxHeight: hp('100%'),
    backgroundColor: colors.light.primaryTransparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitleView: {
    position: 'absolute',
    top: '70%',
    backgroundColor: '#fff',
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    minWidth: 207.7,
    minHeight: 41,
    justifyContent: 'center',
  },
  title: {
    position: 'relative',
    left: '10.6%',
    color: colors.light.ivory4,
    fontSize: 25,
  },
  cardSubTitleView: {
    position: 'absolute',
    top: '80%',
  },
  subTitle: {
    position: 'relative',
    left: '10.6%',
    color: '#fff',
    fontSize: 25,
  },
});

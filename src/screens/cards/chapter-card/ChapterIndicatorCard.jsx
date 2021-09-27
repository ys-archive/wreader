import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { colors, StyleDefine } from '#constants';
import { makeCategoryBGImagePath } from '#constants/images';

import { useStoreState } from 'easy-peasy';
import { selData, selSwiper } from '#store/selectors';

const initStates = () => {
  const categories = useStoreState(selData.categories);
  const coords = useStoreState(selSwiper.coords);

  return {
    categories,
    coords,
  };
};

const ChapterIndicatorCard = ({ pos, order }) => {
  const { categories } = initStates();

  const categoryTitle = categories[order].title;

  return (
    <View style={[s.root, pos]}>
      <ImageBackground
        style={{
          width: wp('83.3%'),
          height: hp('81.2%') * 0.88,
          borderRadius: StyleDefine.borderRadiusOutside,
          overflow: 'hidden',
          alignItems: 'center',
        }}
        source={makeCategoryBGImagePath(categoryTitle)}
      >
        <View style={s.authorSection} />
        <ImageBackground
          style={[
            {
              width: wp('75.6%'),
              height: hp('60.2%'),
              backgroundColor: colors.light.chapterBGInside,
              borderRadius: StyleDefine.borderRadiusInside,
            },
          ]}
        />
      </ImageBackground>
    </View>
  );
};

export default ChapterIndicatorCard;

const s = StyleSheet.create({
  root: {
    minWidth: wp('100%'),
    maxWidth: wp('100%'),
    minHeight: hp('100%'),
    maxHeight: hp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorSection: {
    minHeight: hp('9.5%'),
  },
});

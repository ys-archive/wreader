import React from 'react';
import { View, ImageBackground } from 'react-native';
import { StyleSheet, Text } from '#components';
import AddStory from '../../icon/AddStory';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '#constants';

import { makeCategoryBGImagePath } from '#constants/images';

import { useStoreState } from 'easy-peasy';
import { selData, selSwiper } from '../../../store/selectors';

const initStates = () => {
  const categories = useStoreState(selData.categories);
  const coords = useStoreState(selSwiper.coords);

  return {
    categories,
    coords,
  };
};
const CategoryIndicatorCard = ({ pos }) => {
  const {
    categories,
    coords: { d0 },
  } = initStates();

  const categoryTitle = categories[d0].title;

  return (
    <View style={[s.root, pos]}>
      <ImageBackground
        style={[
          {
            width: wp('83.4%'),
            height: hp('78.2%') * 0.9,
            borderRadius: 20,
            overflow: 'hidden',
          },
        ]}
        source={makeCategoryBGImagePath(categoryTitle)}
        // source={{ uri: bgImgUri }}
        resizeMode="cover"
      >
        <View style={s.cardTitleView}>
          <Text isBold style={s.title}>
            {/* {title} */}
          </Text>
        </View>

        <View style={s.cardSubTitleView}>
          {/* <Text style={s.subTitle}>{subTitle}</Text> */}
        </View>

        {/* <AddStory onPress={goWriteCard} /> */}
      </ImageBackground>
    </View>
  );
};

export default CategoryIndicatorCard;

const s = StyleSheet.create({
  root: {
    minWidth: wp('100%'),
    minHeight: hp('100%'),
    maxWidth: wp('100%'),
    maxHeight: hp('100%'),
    // backgroundColor: colors.light.primaryTransparent,
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

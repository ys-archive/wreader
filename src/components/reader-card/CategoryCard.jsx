import React from 'react';
import { View, ImageBackground } from 'react-native';
import { StyleSheet, Text } from '#components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { colors } from '#constants';

import {
  romanceCategoryBG,
  crimeCategoryBG,
  fantasyCategoryBG,
  thrillerCategoryBG,
  adultCategoryBG,
} from '#constants/images';

const makeBGImagePath = title => {
  const id = title.toLowerCase().trim();
  if (id === 'romance') {
    return romanceCategoryBG;
  }

  if (id === 'crime') {
    return crimeCategoryBG;
  }

  if (id === 'fantasy') {
    return fantasyCategoryBG;
  }

  if (id === 'thriller') {
    return thrillerCategoryBG;
  }

  if (id === 'adult') {
    return adultCategoryBG;
  }

  return fantasyCategoryBG;
};

const CategoryCard = category => {
  const { title, subTitle, imageUri } = category;

  return (
    <View style={s.root}>
      <ImageBackground
        style={{
          width: wp('83.4%'),
          height: hp('78.2%'),
          borderRadius: 20,
          overflow: 'hidden',
        }}
        source={makeBGImagePath(title)}
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
    backgroundColor: colors.light.primary,
    // flex: 1,
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
    color: colors.light.boldText,
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

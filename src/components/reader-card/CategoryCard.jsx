import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { StyleSheet, Text } from '#components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { colors } from '#constants';

import { getImage } from '#constants';

// const rommanceCategoryBG = require('!images/xxxhdpi/romance-category-bg.png');
// const romance = .;
const romance = require('!images/xxxhdpi/romance-category-bg.png');
const crime = require('!images/xxxhdpi/crime-category-bg.png');
const fantasy = require('!images/xxxhdpi/fantasy-category-bg.png');
const thriller = require('!images/xxxhdpi/thriller-category-bg.png');
const adult = require('!images/xxxhdpi/adult-category-bg.png');

// const crime = images.crime;
// const fantasy = images.fantasy;
// const thriller = images.thriller;
// const adult = images.adult;

const CategoryCard = category => {
  const { title, subTitle, imageUri } = category;
  // const [bgImgUri, setBgImgUri] = useState('');

  // useEffect(() => {
  //   if (imageUri) return;

  //   const img = getImage(3, title.toLowerCase().trim());
  //   // console.log('image: ', img);

  //   if (!img) return;

  //   console.log('카테고리 배경이미지: ', img);
  //   setBgImgUri(img);
  // }, [title]);

  // console.log(bgImgUri);

  const makeBGImagePath = () => {
    const id = title.toLowerCase().trim();
    if (id === 'romance') {
      return romance;
    }

    if (id === 'crime') {
      return crime;
    }

    if (id === 'fantasy') {
      return fantasy;
    }

    if (id === 'thriller') {
      return thriller;
    }

    if (id === 'adult') {
      return adult;
    }

    return fantasy;
  };

  return (
    <View style={s.root}>
      <ImageBackground
        style={{
          width: wp('83.7%'),
          height: hp('78.2%'),
          borderRadius: 20,
          overflow: 'hidden',
        }}
        source={makeBGImagePath()}
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
    flex: 1,
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
    // alignItems: 'center',
  },
  title: {
    position: 'relative',
    left: '10.6%',
    color: colors.light.boldText,
    fontSize: 25,
  },
  cardSubTitleView: {
    position: 'absolute',
    // left: '0%',
    top: '80%',
  },
  subTitle: {
    position: 'relative',
    left: '10.6%',
    color: '#fff',
    fontSize: 25,
  },
});

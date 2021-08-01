import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { StyleSheet, Text } from '#components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const dummy = require('!images/dummy-image.jpg');

const CategoryCard = category => {
  const { title, subTitle, imageUri } = category;

  return (
    <View style={s.root}>
      <Image
        style={{
          minWidth: wp('83.7%'),
          minHeight: hp('78.2%'),
          backgroundColor: '#555',
          borderRadius: 50,
        }}
        // source={dummy}
      />
      <View style={s.cardTitleView}></View>
      <Text isBold style={s.title}>
        {title}
      </Text>

      <View style={s.cardSubTitleView}>
        <Text style={s.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default CategoryCard;

const s = StyleSheet.create({
  root: {
    minWidth: wp('100%'),
    minHeight: hp('90%'),
    maxHeight: hp('90%'),
    marginBottom: hp('10%'),
    backgroundColor: '#697',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitleView: {
    position: 'absolute',
    left: '8.3%',
    top: '70%',
    width: 207.7,
    height: 41,
    backgroundColor: '#fff',
  },
  title: {
    position: 'absolute',
    left: '15%',
    top: '70%',
    color: '#d1cab6',
    fontSize: 25,
  },
  cardImageView: {},
  cardSubTitleView: {
    position: 'absolute',
    left: '15%',
    top: '80%',
  },
  subTitle: {
    color: 'white',
  },
});

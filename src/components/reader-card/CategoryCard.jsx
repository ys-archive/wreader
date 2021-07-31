import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import sharedStyle from './ShareCardStyle';

const CategoryCard = ({ title, subTitle, imageUri }) => {
  return (
    <View style={sharedStyle.root}>
      <View style={s.cardTitleView}>
        <Text style={s.title}>{title}</Text>
      </View>
      <View style={s.cardImageView}>
        <LocalImage
          source={imageUri}
          resizeMode="cover"
          style={{ width: width * 0.8, height: height * 0.6 }}
        />
      </View>
      <View style={s.cardSubTitleView}>
        <Text textStyle={s.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default CategoryCard;

const s = StyleSheet.create({
  cardTitleView: {},
  title: {},
  cardImageView: {},
  cardSubTitleView: {},
  subTitle: {},
});

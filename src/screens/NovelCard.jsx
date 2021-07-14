import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Text, StyleSheet } from '#components';

const image = require('../../assets/images/dummy-image.jpg');

const { width, height } = Dimensions.get('window');

const NovelCard = ({ path: uri, title }) => {
  // console.log(uri);
  return (
    <View style={s.root}>
      <View style={s.cardImageView}>
        <Image
          source={image}
          resizeMode="cover"
          style={{ width: width * 0.8, height: height * 0.8 }}
        />
      </View>
      <Text isBold>{title}</Text>
    </View>
  );
};

export default NovelCard;

const s = StyleSheet.create({
  root: {
    width,
    height,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageView: {
    borderWidth: 1,
    borderColor: 'black',
  },
});

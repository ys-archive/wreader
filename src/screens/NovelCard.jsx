import React from 'react';
import { View, Image, Dimensions } from 'react-native';

import { Text, StyleSheet } from '#components';
import { Card, Button } from 'react-native-elements';

// TODO: change image uri -> fetched (received from the api)
const image = require('../../assets/images/dummy-image.jpg');

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const NovelCard = ({ path: uri, title }) => {
  // console.log(uri);
  return (
    <View style={s.root}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'black',
          margin: 10,
          alignSelf: 'center',
        }}
      >
        <Image
          source={image}
          resizeMode="cover"
          style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_HEIGHT * 0.8 }}
        />
      </View>
      <Text isBold>{title}</Text>
    </View>
  );
};

export default NovelCard;

const s = StyleSheet.create({
  root: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    // justifyContent: 'center',
  },
});

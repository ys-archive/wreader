import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Text, StyleSheet } from '#components';

// TODO: change image uri -> fetched (received from the api)
const image = require('../../../assets/images/dummy-image.jpg');

const { width, height } = Dimensions.get('window');

const ReaderCard = ({ path: uri, title, content }) => {
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
      <Text style={s.cardOverlay} textStyle={s.cardOverlayText}>
        {content ?? ''}
      </Text>
      <Text isBold>{title}</Text>
    </View>
  );
};

export default ReaderCard;

const s = StyleSheet.create({
  root: {
    width,
    height,
    alignItems: 'center',
  },
  cardImageView: {
    borderWidth: 1,
    borderColor: 'black',
  },
  cardOverlay: {
    position: 'absolute',
    left: 0,
    top: '10%',
    padding: 55,
    fontSize: 25,
  },
});

import React from 'react';
import { View, Image } from 'react-native';

import { Text, StyleSheet } from '#components';
import { Card, Button } from 'react-native-elements';

const image = require('../../assets/images/dummy-image.jpg');

const NovelCard = ({ path: uri, title }) => {
  // console.log(uri);
  return (
    <Card style={s.root}>
      <Image
        source={image}
        // resizeMode="contain"
        style={{ width: 300, height: 450 }}
      />
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
    </Card>
  );
};

export default NovelCard;

const s = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

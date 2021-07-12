import React from 'react';
import { View, Image } from 'react-native';

import { Text, StyleSheet } from '#components';
import { Card, Button } from 'react-native-elements';

const image = require('../../assets/images/dummy-image.jpg');

const NovelCard = ({ id, path: uri, title }) => {
  // console.log(uri);
  return (
    <Card key={id}>
      <Image
        source={image}
        resizeMode="contain"
        style={{ width: 200, height: 200 }}
      />
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
    </Card>
  );
};

export default NovelCard;

const styles = StyleSheet.create({});

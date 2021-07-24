import React from 'react';
import { View, Image } from 'react-native';
import { StyleSheet, Text } from '../';

// TODO: mdpi, hdpi, xdpi, xxdpi, xxxdpi 키워드 별로 정해줌 (5가지)

export const LocalImage = ({ requiredUri, style = {}, ...rest }) => {
  return <Image source={requiredUri} />;
};

const s = StyleSheet.create({
  root: {},
});

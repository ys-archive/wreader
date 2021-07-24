import React from 'react';
import { Image } from 'react-native';
import { StyleSheet } from './StyleSheet';

export const LocalImage = ({ style = {}, ...rest }) => {
  // TODO: mdpi, hdpi, xdpi, xxdpi, xxxdpi 키워드 별로 정해줌 (5가지)
  return <Image {...rest} style={[style, s.root]} />;
};

const s = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

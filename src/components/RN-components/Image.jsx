import React from 'react';
import { Image } from 'react-native';
import { StyleSheet } from '../';
import { widthPercentageToDP as wp, heightPercentageToDP as dp } from 'react-native-responsive-screen';

// TODO: mdpi, hdpi, xdpi, xxdpi, xxxdpi 키워드 별로 정해줌 (5가지)

const Image = ({ style = {}, ...rest }) => {
  const 
  return <Image style={s.root} {...rest} />;
};

export default Image;

const s = StyleSheet.create({
  root: {
    width: {},
  },
});

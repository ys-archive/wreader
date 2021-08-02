import React from 'react';
import { Image } from 'react-native';
import { sortIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Sort = () => (
  <Image
    style={{
      width: 24.7,
      height: 15,
      position: 'absolute',
      right: wp('7%'),
      top: hp('4.7%'),
      zIndex: 1000,
    }}
    source={sortIcon}
  />
);

export default Sort;

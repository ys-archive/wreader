import React from 'react';
import { Image } from 'react-native';
import { logo } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Logo = () => (
  <Image
    style={{
      width: 107.4,
      height: 28.8,
      position: 'absolute',
      left: wp('8.3%'),
      top: hp('3.6%'),
      zIndex: 1000,
    }}
    source={logo}
  />
);

export default Logo;

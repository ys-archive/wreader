import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { logoIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Logo = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      position: 'absolute',
      left: wp('8.3%'),
      top: hp('4.8%'),
      zIndex: 1000,
    }}
  >
    <Image
      style={{
        width: 107.4,
        height: 28.8,
      }}
      source={logoIcon}
    />
  </TouchableOpacity>
);

export default Logo;

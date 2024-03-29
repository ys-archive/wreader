import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { sortIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Sort = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      position: 'absolute',
      right: wp('16.9%'),
      top: hp('4.7%'),
      zIndex: 1000,
    }}
  >
    <Image
      style={{
        width: 22.5,
        height: 17.2,
      }}
      source={sortIcon}
    />
  </TouchableOpacity>
);

export default Sort;

import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { likeIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Like = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: wp('4.4%'),
      height: hp('2.2%'),
      zIndex: 1000,
    }}
  >
    <Image
      style={{
        width: 16,
        height: 15,

        // zIndex: 1000,
      }}
      source={likeIcon}
    />
  </TouchableOpacity>
);

export default Like;

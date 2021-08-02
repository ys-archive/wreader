import React from 'react';
import { Image } from 'react-native';
import { likeIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Like = () => (
  <Image
    style={{
      width: 16,
      height: 15,
      // width: wp('4.4%'),
      // height: hp('2.2%'),
    }}
    source={likeIcon}
  />
);

export default Like;

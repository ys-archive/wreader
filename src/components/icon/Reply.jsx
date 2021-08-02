import React from 'react';
import { Image } from 'react-native';
import { replyIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Reply = () => (
  <Image
    style={{
      width: 16,
      height: 13.7,
      // width: wp('4.4%'),
      // height: hp('2.1%')
    }}
    source={replyIcon}
  />
);

export default Reply;

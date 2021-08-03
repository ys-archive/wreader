import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { replyIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Reply = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ zIndex: 1000 }}>
    <Image
      style={{
        width: 16,
        height: 13.7,
        // width: wp('4.4%'),
        // height: hp('2.1%')
      }}
      source={replyIcon}
    />
  </TouchableOpacity>
);

export default Reply;

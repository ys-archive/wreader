import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { replyIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Reply = ({ onPress }) => (
  // style={{ zIndex: 1000 }}
  <TouchableOpacity onPress={onPress}>
    <Image
      style={{
        width: 16,
        height: 13.7,
      }}
      source={replyIcon}
    />
  </TouchableOpacity>
);

export default Reply;

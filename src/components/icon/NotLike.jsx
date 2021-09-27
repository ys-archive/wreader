import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { notlikeIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const NotLike = ({ style, iconStyle, onPress, isPressable = true }) =>
  isPressable ? (
    <TouchableOpacity onPress={onPress} style={style}>
      <Image
        style={[
          {
            width: 16,
            height: 15,
          },
          iconStyle,
        ]}
        source={notlikeIcon}
      />
    </TouchableOpacity>
  ) : (
    <Image
      style={[
        {
          width: 16,
          height: 15,
        },
        iconStyle,
      ]}
      source={notlikeIcon}
    />
  );

export default NotLike;

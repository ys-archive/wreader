import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { likeIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Like = ({ style, iconStyle, onPress, isPressable = true }) =>
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
        source={likeIcon}
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
      source={likeIcon}
    />
  );

export default Like;

import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { photoIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Photo = ({ style, iconStyle, onPress, isPressable = true }) =>
  isPressable ? (
    <TouchableOpacity onPress={onPress} style={style}>
      <Image
        style={[
          {
            width: 17.7,
            height: 13.6,
          },
          iconStyle,
        ]}
        source={photoIcon}
      />
    </TouchableOpacity>
  ) : (
    <Image
      style={[
        {
          width: 17.7,
          height: 13.6,
        },
        style,
      ]}
      source={photoIcon}
    />
  );

export default Photo;

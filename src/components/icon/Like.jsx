import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { likeIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Like = ({ style, onPress, isPressable = true }) =>
  isPressable ? (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={[
          {
            width: 16,
            height: 15,
          },
          style,
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
        style,
      ]}
      source={likeIcon}
    />
  );

export default Like;

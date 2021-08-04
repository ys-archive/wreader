import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { likeIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Like = ({ onPress }) => (
  // zIndex: 10,
  <TouchableOpacity onPress={onPress} style={{ zIndex: 100 }}>
    <Image
      style={{
        width: 16,
        height: 15,
      }}
      source={likeIcon}
    />
  </TouchableOpacity>
);

export default Like;

import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { person2Icon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Person2 = ({ style, iconStyle, onPress }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Image
      style={[
        {
          width: 30,
          height: 30,
        },
        iconStyle,
      ]}
      source={person2Icon}
    />
  </TouchableOpacity>
);

export default Person2;

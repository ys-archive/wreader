import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { meIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Me = ({
  style = {},
  iconStyle = {},
  onPress = () => {
    console.log('Pressed!');
  },
}) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Image
      style={[
        {
          width: 40,
          height: 40,
        },
        iconStyle,
      ]}
      source={meIcon}
    />
  </TouchableOpacity>
);

export default Me;

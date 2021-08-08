import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { personIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Person = ({
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
          width: 19,
          height: 19,
        },
        iconStyle,
      ]}
      source={personIcon}
    />
  </TouchableOpacity>
);

export default Person;

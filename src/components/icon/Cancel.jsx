import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { cancelIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Cancel = ({ style = {}, iconStyle = {}, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[{ position: 'absolute', right: 0, top: hp('3.1%') }, style]}
  >
    <Image
      style={[
        {
          width: 21,
          height: 21,
        },
        iconStyle,
      ]}
      source={cancelIcon}
    />
  </TouchableOpacity>
);

export default Cancel;

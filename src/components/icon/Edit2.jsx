import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { edit2Icon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Edit2 = ({ style, iconStyle, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[{ position: 'absolute', right: wp('9%'), top: hp('16%') }, style]}
  >
    <Image
      style={[
        {
          width: 34.4,
          height: 15.2,
        },
        iconStyle,
      ]}
      source={edit2Icon}
    />
  </TouchableOpacity>
);

export default Edit2;

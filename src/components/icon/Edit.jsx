import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { editIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Edit = ({ style, iconStyle, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[{ position: 'absolute', right: 0, top: hp('3.1%') }, style]}
  >
    <Image
      style={[
        {
          width: 34.4,
          height: 15.2,
        },
        iconStyle,
      ]}
      source={editIcon}
    />
  </TouchableOpacity>
);

export default Edit;

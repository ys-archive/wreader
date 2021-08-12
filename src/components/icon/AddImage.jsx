import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { addImageIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AddImage = ({ style = {}, iconStyle = {}, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={style}
    // style={[{ position: 'absolute', right: 0, top: hp('3.1%') }, style]}
  >
    <Image
      style={[
        {
          width: 40.9,
          height: 30.9,
        },
        iconStyle,
      ]}
      source={addImageIcon}
    />
  </TouchableOpacity>
);

export default AddImage;

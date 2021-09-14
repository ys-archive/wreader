import React from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';
import { addStoryIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AddStory = ({ style = {}, iconStyle = {}, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[{ position: 'absolute', right: '5%', bottom: '3%' }, style]}
  >
    <Image
      style={[
        {
          width: Platform.OS === 'android' ? wp('24%') : wp('25%'),
          height: hp('12%'),
        },
        iconStyle,
      ]}
      source={addStoryIcon}
    />
  </TouchableOpacity>
);

export default AddStory;

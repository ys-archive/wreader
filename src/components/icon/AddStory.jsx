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
    style={[{ position: 'absolute', right: '4%', bottom: '5%', zIndex: 15, }, style]}
  >
    <Image
      style={[
        {
          maxWidth: Platform.OS === 'android' ? wp('24%') : wp('25%'),
          maxHeight: hp('11.5%'),
        },
        iconStyle,
      ]}
      source={addStoryIcon}
    />
  </TouchableOpacity>
);

export default AddStory;

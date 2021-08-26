import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { addStoryIcon } from '#constants/images';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

const AddStory = ({ style = {}, iconStyle = {}, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[{ position: 'absolute', right: '5%', bottom: '3%' }, style]}
  >
    <Image
      style={[
        {
          width: 41,
          height: 41,
        },
        iconStyle,
      ]}
      source={addStoryIcon}
    />
  </TouchableOpacity>
);

export default AddStory;

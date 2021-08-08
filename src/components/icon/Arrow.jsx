import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { leftArrow, rightArrow, downArrow } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Arrow = ({ style = {}, iconStyle = {}, onPress, direction = 'left' }) => {
  let source = leftArrow;

  if (direction === 'right') {
    source = rightArrow;
  }

  if (direction === 'down') {
    source = downArrow;
  }

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Image
        style={[
          {
            width: 5,
            height: 10,
          },
          iconStyle,
        ]}
        source={source}
      />
    </TouchableOpacity>
  );
};

export default Arrow;

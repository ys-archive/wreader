import React from 'react';
import { Image } from 'react-native';
import { plusIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Plus = ({ style }) => (
  <Image
    style={[
      {
        width: 10,
        height: 10,
      },
      style,
    ]}
    source={plusIcon}
  />
);

export default Plus;

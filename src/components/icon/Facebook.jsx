import React from 'react';
import { Image } from 'react-native';
import { facebookIcon } from '#constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Facebook = ({ style }) => (
  <Image
    style={[
      {
        width: 15 + 4,
        height: 15 + 4,
        position: 'absolute',
        top: '36%',
        left: '7.8%',
      },
      style,
    ]}
    source={facebookIcon}
  />
);

export default Facebook;
